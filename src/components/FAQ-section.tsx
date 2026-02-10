import { component$ } from "@builder.io/qwik";
import { Accordion } from "./ui";

export interface FAQ {
  q: string;
  a: string;
}

export interface FAQProps {
  heading?: string;
  subheading?: string;
  faqs?: FAQ[];
}

export const FAQSection = component$((props: FAQProps) => {
  const defaultFaqs = [
    {
      q: "¿Necesito experiencia previa?",
      a: "No, nuestros programas están diseñados para todos los niveles, desde principiantes hasta avanzados.",
    },
    {
      q: "¿Qué equipo necesito?",
      a: "La mayoría de los ejercicios se pueden realizar con peso corporal o equipo mínimo como mancuernas o bandas elásticas.",
    },
    {
      q: "¿Cómo accedo al contenido?",
      a: "Una vez que te registras, recibirás acceso inmediato a nuestra plataforma donde encontrarás todos los videos y guías.",
    },
    {
      q: "¿Puedo cancelar en cualquier momento?",
      a: "Sí, puedes cancelar tu suscripción en cualquier momento sin cargos adicionales.",
    },
    {
      q: "¿Hay soporte personalizado?",
      a: "Sí, ofrecemos soporte a través de nuestra comunidad y sesiones de preguntas y respuestas.",
    },
    {
      q: "¿Los programas incluyen plan de alimentación?",
      a: "Nuestros programas se enfocan en el entrenamiento, pero incluimos guías generales de nutrición para maximizar tus resultados.",
    },
  ];

  const faqs = props.faqs || defaultFaqs;

  return (
    <section class="py-16 md:py-24 bg-[#F5F7FA]">
      <div class="container max-w-4xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">{props.heading || "Preguntas Frecuentes"}</h2>
          <p class="text-xl text-gray-500">{props.subheading || "Todo lo que necesitas saber para empezar"}</p>
        </div>
        <Accordion.Root behavior="single" collapsible class="w-full">
          {faqs.map((faq, i) => (
            <Accordion.Item id={`faq-${i}`} key={i}>
              <Accordion.Trigger header="h3" class="text-left text-lg font-semibold hover:text-[#1e3a8a]">
                {faq.q}
              </Accordion.Trigger>
              <Accordion.Content>
                <div class="text-gray-600 text-base">{faq.a}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}); 