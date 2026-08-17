<?php
/**
 * Endpoint de recepción de leads. Doc 05 sección 5.
 *
 * Se sube junto al build estático a la carpeta actual del sitio en
 * CloudPanel. El servidor ya corre PHP, así que no hace falta un backend
 * Node aparte para esta única pieza dinámica del sitio.
 *
 * Responsabilidades, en orden:
 *   1. Validar método y origen
 *   2. Descartar bots (honeypot) en silencio
 *   3. Limitar la tasa de envíos por IP
 *   4. Validar y sanear los campos
 *   5. Mandar el mail a PARH
 *   6. Guardar un respaldo en CSV, si hay dónde (fuera del webroot)
 *   7. Responder JSON
 *
 * Endurecido contra header injection: ningún dato de entrada se interpola
 * en los headers del mail. Los headers son fijos o pasan por sanitizeLine(),
 * que corta cualquier salto de línea antes de tocar el mensaje.
 */

declare(strict_types=1);

// --- Config -----------------------------------------------------------
// lead.config.php no viaja en el repo (ver .gitignore). Sin él, se usan
// estos valores por defecto y el respaldo en CSV queda deshabilitado.
if (!defined('LEAD_MAIL_TO')) {
    @include __DIR__ . '/lead.config.php';
}
if (!defined('LEAD_MAIL_TO')) {
    define('LEAD_MAIL_TO', 'info@parh.com.ar');
}
if (!defined('LEAD_MAIL_FROM')) {
    define('LEAD_MAIL_FROM', 'no-responder@parh.com.ar');
}

const DOMINIOS_PERMITIDOS = ['parh.com.ar', 'www.parh.com.ar', 'localhost', '127.0.0.1'];
const LIMITE_ENVIOS = 5;          // por IP
const VENTANA_LIMITE_SEG = 600;   // 10 minutos

const FORMULARIOS_VALIDOS = ['lead_corto', 'contacto', 'cotizador_previo', 'diagnostico'];

// --- Utilidades ---------------------------------------------------------

function responder(int $codigoHttp, array $cuerpo): never {
    http_response_code($codigoHttp);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($cuerpo);
    exit;
}

/** Corta saltos de línea. Defensa en profundidad contra header injection. */
function sanearLinea(string $s): string {
    return trim(str_replace(["\r", "\n"], '', $s));
}

function sanearTexto(string $s, int $maxLargo = 1000): string {
    $s = trim(strip_tags($s));
    return mb_substr($s, 0, $maxLargo);
}

function ipDelCliente(): string {
    // CloudPanel/Nginx suele reenviar la IP real en X-Forwarded-For.
    $candidatas = [
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null,
        $_SERVER['REMOTE_ADDR'] ?? null,
    ];
    foreach ($candidatas as $c) {
        if ($c) {
            $primera = trim(explode(',', $c)[0]);
            if (filter_var($primera, FILTER_VALIDATE_IP)) return $primera;
        }
    }
    return '0.0.0.0';
}

// --- 1. Método y origen ---------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Método no permitido']);
}

$origen = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$host = parse_url($origen, PHP_URL_HOST) ?? '';
if ($origen !== '' && !in_array($host, DOMINIOS_PERMITIDOS, true)) {
    responder(403, ['ok' => false, 'error' => 'Origen no permitido']);
}

$crudo = file_get_contents('php://input');
$datos = json_decode($crudo ?: '', true);
if (!is_array($datos)) {
    responder(400, ['ok' => false, 'error' => 'JSON inválido']);
}

// --- 2. Honeypot ----------------------------------------------------------
// Si el campo trampa viene con contenido, es un bot. Se responde éxito
// igual, para no delatarle al bot que fue detectado, y no se procesa nada.
if (!empty($datos['honeypot'])) {
    responder(200, ['ok' => true]);
}

// --- 3. Rate limit por IP --------------------------------------------------

$ip = ipDelCliente();
$archivoLimite = sys_get_temp_dir() . '/parh_lead_' . hash('sha256', $ip) . '.json';

$intentos = [];
$manija = @fopen($archivoLimite, 'c+');
if ($manija) {
    flock($manija, LOCK_EX);
    $contenido = stream_get_contents($manija);
    $previos = json_decode($contenido ?: '[]', true);
    if (is_array($previos)) $intentos = $previos;

    $ahora = time();
    $intentos = array_values(array_filter(
        $intentos,
        fn($t) => is_int($t) && ($ahora - $t) < VENTANA_LIMITE_SEG
    ));

    if (count($intentos) >= LIMITE_ENVIOS) {
        flock($manija, LOCK_UN);
        fclose($manija);
        responder(429, ['ok' => false, 'error' => 'Demasiados envíos. Probá de nuevo en un rato.']);
    }

    $intentos[] = $ahora;
    ftruncate($manija, 0);
    rewind($manija);
    fwrite($manija, json_encode($intentos));
    flock($manija, LOCK_UN);
    fclose($manija);
}
// Si el filesystem no permite escribir el archivo de control, se sigue sin
// rate limit antes que romper el formulario para usuarios legítimos.

// --- 4. Validar y sanear ----------------------------------------------------

$formulario = sanearLinea((string)($datos['formulario'] ?? ''));
if (!in_array($formulario, FORMULARIOS_VALIDOS, true)) {
    responder(400, ['ok' => false, 'error' => 'Formulario inválido']);
}

$nombre = sanearTexto((string)($datos['nombre'] ?? ''), 80);
if (mb_strlen($nombre) < 2) {
    responder(400, ['ok' => false, 'error' => 'Falta el nombre']);
}

$whatsapp = sanearTexto((string)($datos['whatsapp'] ?? ''), 20);
if (mb_strlen($whatsapp) < 8) {
    responder(400, ['ok' => false, 'error' => 'Falta un WhatsApp válido']);
}

$emailCrudo = trim((string)($datos['email'] ?? ''));
$email = $emailCrudo !== '' ? filter_var($emailCrudo, FILTER_VALIDATE_EMAIL) : null;
if ($emailCrudo !== '' && $email === false) {
    responder(400, ['ok' => false, 'error' => 'El email no es válido']);
}

// Resto de campos: texto libre saneado, sin exigir formato. Cubre
// `mensaje`, `producto`, `compania`, `localidad` y las respuestas del
// diagnóstico (objeto, tiene, vencimiento, preocupacion, etc.).
$camposFijos = ['formulario', 'nombre', 'whatsapp', 'email', 'honeypot'];
$extra = [];
foreach ($datos as $clave => $valor) {
    if (in_array($clave, $camposFijos, true)) continue;
    if (is_string($valor) || is_numeric($valor)) {
        $extra[sanearLinea((string)$clave)] = sanearTexto((string)$valor, 500);
    }
}

// --- 5. Mail ----------------------------------------------------------------

$asunto = 'Nueva consulta desde la web: ' . $formulario;

$cuerpo = "Nueva consulta desde parh.com.ar\n\n";
$cuerpo .= "Formulario: {$formulario}\n";
$cuerpo .= "Nombre: {$nombre}\n";
$cuerpo .= "WhatsApp: {$whatsapp}\n";
if ($email) $cuerpo .= "Email: {$email}\n";
foreach ($extra as $clave => $valor) {
    $cuerpo .= "{$clave}: {$valor}\n";
}
$cuerpo .= "\nIP: {$ip}\n";
$cuerpo .= 'Fecha: ' . date('Y-m-d H:i:s') . "\n";

// Headers fijos. El Reply-To es el único dato de usuario que entra acá, y
// pasa por sanearLinea() antes: no hay forma de inyectar un header extra.
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: PARH Web <' . LEAD_MAIL_FROM . '>';
if ($email) {
    $headers[] = 'Reply-To: ' . sanearLinea($nombre) . ' <' . $email . '>';
}

$enviado = @mail(LEAD_MAIL_TO, $asunto, $cuerpo, implode("\r\n", $headers));

// --- 6. Respaldo en CSV, fuera del webroot ----------------------------------

$respaldoGuardado = false;

if (defined('LEAD_BACKUP_DIR') && is_dir(LEAD_BACKUP_DIR) && is_writable(LEAD_BACKUP_DIR)) {
    $archivoCsv = rtrim(LEAD_BACKUP_DIR, '/') . '/leads.csv';
    $esNuevo = !file_exists($archivoCsv);
    $f = @fopen($archivoCsv, 'a');
    if ($f) {
        flock($f, LOCK_EX);
        if ($esNuevo) {
            fputcsv($f, ['fecha', 'formulario', 'nombre', 'whatsapp', 'email', 'extra', 'ip']);
        }
        $filaEscrita = fputcsv($f, [
            date('Y-m-d H:i:s'),
            $formulario,
            $nombre,
            $whatsapp,
            $email ?? '',
            json_encode($extra, JSON_UNESCAPED_UNICODE),
            $ip,
        ]);
        flock($f, LOCK_UN);
        fclose($f);
        $respaldoGuardado = $filaEscrita !== false;
    }
}

// --- 7. Responder -------------------------------------------------------

// Si el mail falló pero el dato ya quedó guardado en el CSV, igual
// respondemos éxito: nada se perdió y no tiene sentido que el usuario
// reintente sin necesidad. Solo es un error real si ninguno de los dos
// caminos guardó el dato.
if (!$enviado && !$respaldoGuardado) {
    responder(500, ['ok' => false, 'error' => 'No pudimos enviar tu consulta']);
}

responder(200, ['ok' => true]);
