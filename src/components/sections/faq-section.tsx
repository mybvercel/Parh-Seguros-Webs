import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPage } from "@/lib/schema";
import type { Faq } from "@/content/types";

/**
 * FAQ desplegable con schema FAQPage. Doc 02 sección D, patrón de Worth:
 * captura cola larga y mata objeciones sin agrandar la parte visible.
 */
export function FaqSection({
  items,
  titulo = "Preguntas frecuentes",
  eyebrow = "¿Tenés dudas?",
}: {
  items: Faq[];
  titulo?: string;
  eyebrow?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="section-parh bg-parh-slate-50">
      <JsonLd data={faqPage(items)} />
      <div className="container-parh max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl">{titulo}</h2>

        <Accordion type="single" collapsible className="mt-8 w-full">
          {items.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger className="text-left text-base font-semibold text-parh-blue-900">
                {f.pregunta}
              </AccordionTrigger>
              <AccordionContent className="text-parh-slate-600">
                {f.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
