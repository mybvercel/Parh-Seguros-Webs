#!/usr/bin/env node
/*
  Guardarraíl anti IA. Doc 04 sección 8, doc 05 sección 7.
  Falla el build si el copy tiene las marcas típicas del texto generado.
  Se corre en `npm run check-copy` y antes de `npm run build`.
*/

import { readFileSync } from "node:fs";
import { globSync } from "glob";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const TARGETS = [
  "src/content/**/*.{ts,tsx}",
  "src/components/**/*.{ts,tsx}",
  "src/app/**/*.{ts,tsx}",
];

// Archivos donde el guion largo y demás no aplican (comentarios de código, no copy).
const IGNORE = ["src/components/ui/**"];

/** Emoji: pictográficos, símbolos misceláneos, dingbats y banderas. */
const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F0FF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/u;

const RULES = [
  {
    id: "guion-largo",
    test: /[—–]/u,
    message:
      "Guion largo o medio detectado. Doc 04 sección 8.1: tolerancia cero. Usar punto, coma, dos puntos o paréntesis.",
  },
  {
    id: "doble-guion",
    test: /\s--\s/,
    message: "Secuencia ' -- ' detectada. Mismo caso que el guion largo.",
  },
  {
    id: "italic",
    // El lookbehind deja pasar `not-italic`, que justamente quita la cursiva.
    test: /(?<!not-)\b(italic|font-italic)\b|fontStyle:\s*["']italic["']/,
    message:
      "Cursiva detectada. Doc 04 sección 3.3: prohibida como recurso decorativo. Usar peso 600 o color.",
  },
  {
    id: "emoji",
    test: EMOJI,
    message:
      "Emoji detectado. Doc 04 sección 8.1: no corresponde al rubro. Usar un ícono de Lucide.",
  },
];

// Doc 04 sección 8.1. Se evalúan sin distinguir mayúsculas ni tildes.
const BLACKLIST = [
  "en un mundo donde",
  "en la era de",
  "en el mundo de hoy",
  "no es solo",
  "eleva tu",
  "elevá tu",
  "desbloquea",
  "desbloqueá",
  "potencia tu",
  "potenciá tu",
  "transforma tu",
  "transformá tu",
  "revoluciona",
  "revolucioná",
  "descubri el poder",
  "descubrí el poder",
  "la solucion definitiva",
  "la solución definitiva",
  "confianza que perdura",
  "lider del mercado",
  "líder del mercado",
  "numero uno",
  "número uno",
  "rapido, simple y confiable",
  "rápido, simple y confiable",
  "sabias que",
  "sabías que",
];

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

// La lista trae variantes con y sin tilde. Al normalizar colapsan, así que se
// deduplica para no reportar el mismo hallazgo dos veces.
const BLACKLIST_NORM = [...new Set(BLACKLIST.map((t) => normalize(t)))];

const files = TARGETS.flatMap((pattern) =>
  globSync(pattern, { cwd: ROOT, ignore: IGNORE, nodir: true }),
);

const violations = [];

for (const rel of files) {
  const lines = readFileSync(path.join(ROOT, rel), "utf8").split(/\r?\n/);

  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.test.test(line)) {
        violations.push({ file: rel, line: i + 1, rule: rule.id, message: rule.message, text: line.trim() });
      }
    }

    const flat = normalize(line);
    for (const term of BLACKLIST_NORM) {
      if (flat.includes(term)) {
        violations.push({
          file: rel,
          line: i + 1,
          rule: "lista-negra",
          message: `Término prohibido: "${term}". Doc 04 sección 8.1.`,
          text: line.trim(),
        });
      }
    }
  });
}

if (violations.length === 0) {
  console.log(`check-copy: ${files.length} archivos revisados. Sin observaciones.`);
  process.exit(0);
}

console.error(`\ncheck-copy: ${violations.length} problema(s) de copy.\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.rule}]`);
  console.error(`    ${v.message}`);
  console.error(`    > ${v.text.slice(0, 120)}\n`);
}
process.exit(1);
