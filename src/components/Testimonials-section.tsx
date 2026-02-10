import { component$ } from "@builder.io/qwik";
import { LuStar } from "@qwikest/icons/lucide";

import SebaAntesImg from '~/assets/images/seba-antes.jpg?jsx';
import SebaDespuesImg from '~/assets/images/seba-despues.png?jsx';

export const TestimonialsSection = component$(() => {
  return (
    <section id="testimonios" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-['Poppins'] text-center mb-16 text-[#1A1A1A]">
          Historias de Transformación
        </h2>
        <div class="max-w-4xl mx-auto">
          <div class="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200 hover:shadow-2xl transition-shadow">
            {/* Before and After Images */}
            <div class="flex justify-center mb-8">
              <div class="relative max-w-4xl">
                <div class="flex">
                  {/* Before Image */}
                  <div class="relative w-1/2">
                    <SebaAntesImg
                      alt="Sebastian Cardoso - Antes"
                      class="w-full h-96 object-cover rounded-l-lg shadow-md"
                    />
                    <div class="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      ANTES
                    </div>
                  </div>
                  {/* After Image */}
                  <div class="relative w-1/2">
                    <SebaDespuesImg
                      alt="Sebastian Cardoso - Después"
                      class="w-full h-96 object-cover rounded-r-lg shadow-md"
                    />
                    <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      DESPUÉS
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div class="max-w-2xl mx-auto">
              <h3 class="font-bold text-2xl mb-2 text-[#1e3a8a]">Sebastian Cardoso</h3>
              <p class="font-semibold mb-4 text-[#1d4ed8] text-lg">De la inactividad a la fuerza real</p>
              <div class="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <LuStar key={i} class="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p class="text-[#4B4B4B] text-base italic leading-relaxed">"Empecé sin poder hacer una flexión y hoy me siento más fuerte que nunca. El programa no solo cambió mi cuerpo, cambió mi mentalidad."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}); 