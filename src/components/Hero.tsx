import { component$ } from "@builder.io/qwik";
import { Button } from "./ui/button/button";
import { Link } from "@builder.io/qwik-city";

import HeroBgImg from '~/assets/images/fabian-kettlebell.webp?jsx';

export interface HeroProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const Hero = component$((props: HeroProps) => {
  const heroLink = props.buttonLink || "/program/reto-1-transformacion";
  const { heading, subheading, backgroundImage, buttonText } = props;

  return (
    <section class="relative min-h-screen flex items-center justify-start px-6 pt-20">
      {/* Background image and overlay */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 animate-hero-zoom">
          {backgroundImage ? (
            <img
              src={backgroundImage}
              alt={heading || "Hero background"}
              class="object-cover object-top w-full h-full absolute inset-0"
              style="z-index:0;"
            />
          ) : (
            <HeroBgImg
              loading="eager"
              decoding="sync"
              alt="Fabián Avendaño entrenando intensamente con kettlebells en el gimnasio"
              class="object-cover object-top w-full h-full absolute inset-0"
              style="z-index:0;"
            />
          )}
          <div class="absolute inset-0 bg-black/40"></div>
        </div>
      </div>
      {/* Content */}
      <div class="relative z-10 max-w-7xl mx-auto w-full">
        <div class="text-left text-white">
          <h1 class="text-3xl md:text-6xl lg:text-7xl font-bold font-['Orbitron'] mb-4 md:mb-6 leading-tight max-w-5xl">
            {heading || "Descubrí Tu Mejor Versión"}
          </h1>
          <p class="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed max-w-4xl">
            {subheading || "Entrenamiento personal y online adaptado a tus objetivos: pérdida de peso, ganancia muscular y salud general."}
          </p>

          <Link
            href={heroLink}
            class="inline-block"
          >
            <Button class="bg-white hover:bg-gray-100 text-[#1d4ed8] hover:text-[#2563eb] px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg transition-safe transform hover:scale-105">
              {buttonText || "¡QUIERO MIS 7 DÍAS GRATIS!"}
            </Button>
          </Link>
        </div>
      </div>

    </section>
  );
}); 
