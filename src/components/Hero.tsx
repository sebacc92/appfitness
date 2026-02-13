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
    <section class="relative min-h-screen flex items-center justify-center px-6 pt-20">
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
      <div class="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        <div class="text-center text-white flex flex-col items-center">
          {heading && (
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black font-['Orbitron'] mb-6 md:mb-8 leading-tight max-w-5xl drop-shadow-2xl">
              {heading}
            </h1>
          )}
          {subheading && (
            <p class="text-lg md:text-2xl lg:text-3xl mb-10 md:mb-12 leading-relaxed max-w-4xl text-gray-100 drop-shadow-md">
              {subheading}
            </p>
          )}

          {buttonText && (
            <Link
              href={heroLink}
              class="inline-block"
            >
              <Button class="bg-[#00C2FF] hover:bg-[#33d1ff] text-black text-xl font-black uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-[0_0_30px_rgba(0,194,255,0.5)] hover:shadow-[0_0_50px_rgba(0,194,255,0.8)] border-none">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}); 
