#!/usr/bin/env node
/*
  Inventario de datos inventados.

  El prototipo se armó con datos de relleno porque el cliente todavía no
  entregó los reales. Este script lista todo lo que hay que reemplazar antes
  de publicar, para que nada inventado llegue a producción por olvido.

  Uso: npm run placeholders
  Con --strict falla si queda alguno. Se activa recién en el deploy real.
*/

import { readFileSync } from "node:fs";
import { globSync } from "glob";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STRICT = process.argv.includes("--strict");

const files = globSync("src/content/**/*.ts", { cwd: ROOT, nodir: true });

/** Identificador más cercano por encima de la línea, para nombrar el hallazgo. */
function etiquetaPrevia(lines, i) {
  for (let j = i; j >= 0 && j > i - 40; j--) {
    const m = lines[j].match(/^\s*(?:slug|id|nombre|label):\s*["'`](.+?)["'`]/);
    if (m) return m[1];
  }
  return "(sin identificar)";
}

const hallazgos = [];

for (const rel of files) {
  const lines = readFileSync(path.join(ROOT, rel), "utf8").split(/\r?\n/);

  lines.forEach((line, i) => {
    // Se ignoran los comentarios: los encabezados de cada archivo explican el
    // criterio de `origen` y no son datos.
    const esComentario = /^\s*(\*|\/\/|\/\*)/.test(line);
    if (!esComentario && /origen:\s*["']placeholder["']/.test(line)) {
      hallazgos.push({ file: rel, line: i + 1, que: etiquetaPrevia(lines, i) });
    }
  });
}

const porArchivo = hallazgos.reduce((acc, h) => {
  (acc[h.file] ??= []).push(h);
  return acc;
}, {});

console.log(`\nDatos pendientes de reemplazo: ${hallazgos.length}\n`);

for (const [file, items] of Object.entries(porArchivo)) {
  console.log(`  ${file}  (${items.length})`);
  for (const h of items) console.log(`    linea ${h.line}: ${h.que}`);
  console.log("");
}

if (hallazgos.length > 0) {
  console.log("Insumos que hacen falta: ver directivas/06_ROADMAP.md, seccion final.\n");
}

if (STRICT && hallazgos.length > 0) {
  console.error("Modo strict: no se puede publicar con datos inventados.");
  process.exit(1);
}
