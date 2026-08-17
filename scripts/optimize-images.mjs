#!/usr/bin/env node
/*
  Preoptimización de imágenes. Doc 05 sección 6.
  Con output: 'export' no hay optimizador de Next en runtime, así que las
  imágenes se convierten a WebP en tres anchos antes del build.

  Entrada:  public/img/_source/**  (originales, PNG o JPG, no se publican)
  Salida:   public/img/<misma ruta>/<nombre>-{640,1280,1920}.webp

  Uso: npm run images
*/

import { globSync } from "glob";
import sharp from "sharp";
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "img", "_source");
const OUT = path.join(ROOT, "public", "img");

const WIDTHS = [640, 1280, 1920];
const QUALITY = 80;

if (!existsSync(SRC)) {
  console.log(`optimize-images: no existe ${path.relative(ROOT, SRC)}. Nada que hacer.`);
  process.exit(0);
}

const files = globSync("**/*.{png,jpg,jpeg,PNG,JPG,JPEG}", { cwd: SRC, nodir: true });

if (files.length === 0) {
  console.log("optimize-images: sin originales en public/img/_source. Nada que hacer.");
  process.exit(0);
}

let written = 0;

for (const rel of files) {
  const input = path.join(SRC, rel);
  const dir = path.join(OUT, path.dirname(rel));
  const base = path.basename(rel, path.extname(rel));

  mkdirSync(dir, { recursive: true });

  const meta = await sharp(input).metadata();

  for (const width of WIDTHS) {
    // No agrandar: si el original es más chico, se salta ese ancho.
    if (meta.width && meta.width < width && width !== WIDTHS[0]) continue;

    const target = path.join(dir, `${base}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(target);

    written += 1;
    console.log(`  ${path.relative(ROOT, target)}`);
  }
}

console.log(`optimize-images: ${written} archivo(s) generado(s) desde ${files.length} original(es).`);
