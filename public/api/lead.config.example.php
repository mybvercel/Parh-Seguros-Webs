<?php
/**
 * Configuración de lead.php. Copiar a lead.config.php en el servidor
 * (NUNCA en el repositorio: contiene datos operativos, no secretos de
 * verdad, pero igual conviene mantenerlo fuera de git) y completar.
 *
 * lead.php lee este archivo con @include y sigue funcionando si no existe,
 * usando los valores por defecto documentados abajo.
 */

// Adónde llega el mail de cada consulta.
define('LEAD_MAIL_TO', 'info@parh.com.ar');

// Remitente técnico. No hace falta que exista como casilla real, pero sí
// que sea del mismo dominio para no quedar marcado como spam.
define('LEAD_MAIL_FROM', 'no-responder@parh.com.ar');

/**
 * Carpeta del respaldo en CSV, FUERA de la carpeta pública del sitio.
 *
 * En CloudPanel el sitio suele vivir en algo como
 * /home/<usuario>/htdocs/parh.com.ar/ (la carpeta que se sube por SFTP).
 * Un directorio como el de abajo, un nivel arriba de esa carpeta, queda
 * fuera del webroot y nadie puede pedirlo por HTTP.
 *
 * Si esta constante no está definida (por ejemplo, en desarrollo local, o
 * si todavía no se creó la carpeta en el servidor), lead.php simplemente
 * no guarda el respaldo en CSV: el mail sigue siendo el registro principal
 * y nada se pierde, no se cae ni se cae el formulario.
 */
define('LEAD_BACKUP_DIR', '/home/parh/leads-backup');
