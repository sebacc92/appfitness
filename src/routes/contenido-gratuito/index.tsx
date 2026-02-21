import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";

export default component$(() => {
  const youtubeVideos = [
    { id: "dQw4w9WgXcQ", title: "Caminata de oso", description: "Ejercicio de locomoción que desarrolla fuerza, estabilidad y coordinación en todo el cuerpo" },
    { id: "dQw4w9WgXcQ", title: "Remo invertido con banda", description: "Ejercicio de tracción horizontal para desarrollar la espalda y mejorar la fuerza de agarre" },
    { id: "dQw4w9WgXcQ", title: "Buenos días con barra", description: "Ejercicio fundamental para fortalecer la cadena posterior, especialmente isquiotibiales y glúteos" },
    { id: "dQw4w9WgXcQ", title: "Hip Thrust", description: "Ejercicio específico para desarrollar glúteos y mejorar la extensión de cadera" },
    { id: "dQw4w9WgXcQ", title: "Caminata de granjero", description: "Ejercicio de carga que mejora la fuerza de agarre, estabilidad del core y resistencia funcional" },
    { id: "dQw4w9WgXcQ", title: "Remo Pendlay", description: "Ejercicio fundamental para desarrollar la espalda y mejorar la fuerza de tracción" },
    { id: "dQw4w9WgXcQ", title: "Halo con disco", description: "Ejercicio de movilidad y estabilidad para hombros y core con disco de peso" },
    { id: "dQw4w9WgXcQ", title: "Monster walk", description: "Ejercicio de movilidad y activación para glúteos y caderas con banda elástica" },
    { id: "dQw4w9WgXcQ", title: "Face-pull-polea", description: "Ejercicio de tracción vertical para fortalecer la espalda alta y mejorar la postura" },
    { id: "dQw4w9WgXcQ", title: "Sentadilla con barra al box", description: "Ejercicio fundamental para desarrollar fuerza en piernas y mejorar la técnica de sentadilla" },
    { id: "dQw4w9WgXcQ", title: "Peso muerto trap", description: "Ejercicio de fuerza que desarrolla la espalda baja, caderas y fortalece la cadena posterior" },
    { id: "dQw4w9WgXcQ", title: "Sentadilla bulgara", description: "Video de entrenamiento gratuito para tu rutina diaria" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div class="absolute inset-0 z-0">
          <img
            src="/images/2.jpeg"
            alt="Entrenamiento con Coach Fabian"
            class="w-full h-full object-cover object-center opacity-70"
            style="object-position: center 25%;"
          />
          <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/80 to-black/40"></div>
        </div>

        <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-20">
          <div class="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-1.5 text-sm font-bold text-cyan-300 backdrop-blur-sm border border-cyan-500/30 mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            CONTENIDO GRATUITO
          </div>
          <h1 class="font-['Orbitron'] text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Entrena <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Conmigo</span>
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Accede a mi biblioteca de videos de entrenamiento, perfecciona tu técnica y potencia tus resultados sin costo.
          </p>

          <a href="#videos" class="inline-block group">
            <Button class="bg-[#00C2FF] hover:bg-[#33d1ff] text-black font-black uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-300 transform group-hover:scale-105 shadow-[0_0_30px_rgba(0,194,255,0.4)] group-hover:shadow-[0_0_50px_rgba(0,194,255,0.6)] flex items-center gap-3">
              Ver los Videos
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </Button>
          </a>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" class="py-20 md:py-32 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 font-['Orbitron'] tracking-tight">
              Biblioteca de Ejercicios
            </h2>
            <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cada ejercicio está diseñado para maximizar tus resultados.
              Asegúrate de enfocarte en la técnica antes de aumentar la intensidad.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {youtubeVideos.map((video, idx) => (
              <div class="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col" key={idx}>
                <div class="aspect-video relative overflow-hidden bg-gray-900">
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullscreen
                  ></iframe>
                </div>
                <div class="p-6 flex-1 flex flex-col">
                  <div class="flex items-start justify-between mb-3 gap-2">
                    <h3 class="text-xl font-bold text-gray-900 leading-tight">
                      {video.title}
                    </h3>
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed flex-1">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div class="mt-16 text-center">
            <p class="text-gray-500 italic mb-6">Nota para el administrador: Reemplaza los IDs de YouTube (`dQw4w9WgXcQ`) dentro de arreglo `youtubeVideos` en el código con los verdaderos IDs de tus videos.</p>
          </div>
        </div>
      </section>

      {/* Community Benefits Section */}
      <section class="py-16 md:py-24 bg-gray-50">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              ¿Por qué unirte a nuestra comunidad?
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              No estás solo en tu transformación. Forma parte de una comunidad que te apoya y motiva cada día.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl">🎥</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Videos Semanales</h3>
              <p class="text-gray-600">Nuevo contenido cada semana con entrenamientos variados y efectivos.</p>
            </div>

            <div class="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl">💡</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Tips y Consejos</h3>
              <p class="text-gray-600">Aprende las mejores técnicas y consejos de entrenamiento.</p>
            </div>

            <div class="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl">🤝</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Comunidad Activa</h3>
              <p class="text-gray-600">Conecta con personas que comparten tus mismos objetivos y motivaciones.</p>
            </div>

            <div class="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl">🏠</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Desde Casa</h3>
              <p class="text-gray-600">Entrena en la comodidad de tu hogar, sin necesidad de equipos costosos.</p>
            </div>

            <div class="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl">⚡</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Rutinas Efectivas</h3>
              <p class="text-gray-600">Entrenamientos diseñados para maximizar resultados en poco tiempo.</p>
            </div>

            <div class="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl">🎯</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Objetivos Claros</h3>
              <p class="text-gray-600">Cada video tiene un propósito específico para tu progreso.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section class="py-16 md:py-24 bg-gray-800">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            ¡No esperes más!
          </h2>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y comienza tu transformación hoy mismo. Contenido 100% gratuito y actualizado semanalmente.
          </p>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ params }) => {
  const locale = params.locale || 'es';
  const baseUrl = "https://coach-fabian-avendano.netlify.app";
  const currentUrl = `${baseUrl}/${locale}/contenido-gratuito`;
  const imageUrl = `${baseUrl}/assets/images/2.jpeg`;

  let title, description, keywords;

  if (locale === 'en') {
    title = "Free Content - Coach Fabian Avendaño";
    description = "Join our community and access free workouts and motivation for your physical transformation.";
    keywords = "free content, free workouts, fitness community, free training, motivation";
  } else {
    title = "Contenido Gratuito - Coach Fabian Avendaño";
    description = "Únete a nuestra comunidad y accede a entrenamientos gratuitos y motivación para tu transformación física.";
    keywords = "contenido gratuito, entrenamientos gratis, comunidad fitness, entrenamiento gratuito, motivación";
  }

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
        content: locale,
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
      {
        rel: "alternate",
        hreflang: "es",
        href: `${baseUrl}/es/contenido-gratuito`,
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: `${baseUrl}/en/contenido-gratuito`,
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `${baseUrl}/es/contenido-gratuito`,
      },
    ],
  };
};
