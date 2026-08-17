/*
  Verificación del motor del diagnóstico. Es la única parte del contenido con
  lógica, así que el typecheck no alcanza: hay que probar los predicados.

  Uso: npm run check-diagnostico
*/

import assert from "node:assert/strict";
import {
  calcularPuntosCiegos,
  pasosVisibles,
  resumenParaWhatsapp,
  PASOS,
  type Respuestas,
} from "../src/content/diagnostico.ts";

let ok = 0;
function prueba(nombre: string, fn: () => void) {
  fn();
  ok++;
  console.log(`  ok  ${nombre}`);
}

prueba("sin seguro salta el paso de compañía y el de vencimiento", () => {
  const r: Respuestas = { objeto: "auto-moto", tiene: "no-tengo" };
  const ids = pasosVisibles(r).map((p) => p.id);
  assert.ok(!ids.includes("compania"));
  assert.ok(!ids.includes("vencimiento"));
  assert.equal(ids.length, PASOS.length - 2);
});

prueba("con seguro se muestran los 6 pasos", () => {
  const r: Respuestas = { objeto: "hogar", tiene: "hace-anios" };
  assert.equal(pasosVisibles(r).length, PASOS.length);
});

prueba("sin seguro detecta la falta de cobertura", () => {
  const r: Respuestas = { objeto: "auto-moto", tiene: "no-tengo" };
  const ids = calcularPuntosCiegos(r).map((p) => p.id);
  assert.ok(ids.includes("sin-cobertura"));
});

prueba("hogar con póliza vieja detecta la suma desactualizada", () => {
  const r: Respuestas = { objeto: "hogar", tiene: "hace-anios" };
  const ids = calcularPuntosCiegos(r).map((p) => p.id);
  assert.ok(ids.includes("suma-desactualizada"));
  assert.ok(ids.includes("hogar-robo-calle"));
  // La regla genérica de póliza sin revisar excluye hogar, para no duplicar.
  assert.ok(!ids.includes("poliza-sin-revisar"));
});

prueba("comercio detecta el punto ciego de responsabilidad civil", () => {
  const r: Respuestas = { objeto: "comercio", tiene: "hace-anios" };
  const ids = calcularPuntosCiegos(r).map((p) => p.id);
  assert.ok(ids.includes("comercio-rc"));
  assert.ok(ids.includes("comercio-mercaderia"));
});

prueba("profesional detecta RC Profesional y la falta de ART", () => {
  const r: Respuestas = { objeto: "profesion", tiene: "no-tengo" };
  const ids = calcularPuntosCiegos(r).map((p) => p.id);
  assert.ok(ids.includes("rc-profesional"));
  assert.ok(ids.includes("profesional-sin-art"));
});

prueba("el vencimiento de este mes siempre aparece", () => {
  const r: Respuestas = {
    objeto: "auto-moto",
    tiene: "hace-poco",
    vencimiento: "este-mes",
  };
  const ids = calcularPuntosCiegos(r).map((p) => p.id);
  assert.ok(ids.includes("vence-ya"));
});

prueba("nunca devuelve más de 5 hallazgos", () => {
  const r: Respuestas = {
    objeto: "comercio",
    tiene: "hace-anios",
    vencimiento: "no-se",
    preocupacion: "aumentos",
  };
  assert.ok(calcularPuntosCiegos(r).length <= 5);
});

prueba("toda respuesta produce al menos un hallazgo", () => {
  const objetos = ["auto-moto", "hogar", "comercio", "familia", "profesion"] as const;
  const tiene = ["hace-anios", "hace-poco", "no-tengo"] as const;
  for (const o of objetos) {
    for (const t of tiene) {
      const res = calcularPuntosCiegos({ objeto: o, tiene: t });
      assert.ok(res.length > 0, `sin hallazgos para ${o} / ${t}`);
    }
  }
});

prueba("el resumen de WhatsApp arma el mensaje esperado", () => {
  const r: Respuestas = {
    objeto: "comercio",
    tiene: "no-tengo",
    nombre: "Diego",
  };
  const txt = resumenParaWhatsapp(r);
  assert.ok(txt.includes("comercio o empresa"));
  assert.ok(txt.includes("Hoy no tengo seguro."));
  assert.ok(txt.includes("Diego"));
});

prueba("los ids de puntos ciegos son únicos", () => {
  const r: Respuestas = { objeto: "comercio", tiene: "hace-anios" };
  const ids = calcularPuntosCiegos(r, 99).map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

console.log(`\ncheck-diagnostico: ${ok} pruebas pasaron.\n`);
