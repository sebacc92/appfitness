import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Hero } from "~/components/Hero";
import { MethodologySection } from "~/components/Methodology";
// import { ProgramsSection } from "~/components/programs-section";
import { TestimonialsSection } from "~/components/Testimonials-section";
import { FAQSection } from "~/components/FAQ-section";
import { AboutSection } from "~/components/About-section";

// import VideosImg from '~/assets/images/2.jpeg?jsx';


export default component$(() => {
  // const videosPath = `/contenido-gratuito#videos`;

  return (
    <>
      <Hero />
      <MethodologySection />
      {/* <ProgramsSection programs={programs.value} /> */}
      {/* Videos Cover Section */}
      {/* <section class="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div class="mx-auto max-w-7xl px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                ¡Entrena conmigo!
              </h2>
              <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                Únete a nuestra comunidad y accede a videos de entrenamiento gratuitos,
                y la motivación que necesitas para tu transformación.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <Link href={videosPath}>
                  <button class="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105">
                    Ver Videos Gratuitos
                  </button>
                </Link>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="mr-2">📅</span>
                  Contenido actualizado semanalmente
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="aspect-video relative rounded-2xl shadow-2xl overflow-hidden">
                <VideosImg
                  alt="Videos de entrenamiento"
                  class="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div class="text-center text-white">
                    <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p class="text-lg font-semibold">Videos de Entrenamiento</p>
                    <p class="text-sm opacity-90">Gratuitos para toda la comunidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <TestimonialsSection />
      <FAQSection />
      <AboutSection />

      {/* CTA Section */}
      {/* <section class="py-16 md:py-24 bg-[#1e3a8a]">
        <div class="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-left flex-1">
            Únete a nuestro entrenamiento y comienza tu viaje hacia el bienestar físico hoy mismo
          </h2>
          <Link href={`/contenido-gratuito`} class="flex-shrink-0">
            <button class="bg-white hover:bg-gray-100 text-[#1e3a8a] px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105">
              Únete hoy
            </button>
          </Link>
        </div>
      </section> */}
    </>
  );
});

export const head: DocumentHead = () => {
  const baseUrl = "https://coach-fabian-avendano.netlify.app";
  const currentUrl = `${baseUrl}/`;
  const imageUrl = `${baseUrl}/assets/images/fabian-kettlebell.jpg`;

  const title = "Coach Fabian Avendaño - Programas de Entrenamiento Personalizado | Transformación Física y Mental";
  const description = "Descubre programas de entrenamiento personalizado con Coach Fabian Avendaño. Retos de transformación, HIIT, fuerza base y más. Transforma tu cuerpo y mente con metodología probada.";
  const keywords = "entrenamiento personal, coach personal, transformación física, retos fitness, HIIT, fuerza base, entrenamiento en casa, fitness online";

  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        name: "keywords",
        content: keywords,
      },
      {
        name: "author",
        content: "Fabián Avendaño",
      },
      // Open Graph
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:image",
        content: imageUrl,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: currentUrl,
      },
      {
        property: "og:site_name",
        content: "Coach Fabián Avendaño",
      },
      {
        property: "og:locale",
        content: "es",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: imageUrl,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: currentUrl,
      },
    ],
  };
};
