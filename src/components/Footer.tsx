import { component$ } from '@builder.io/qwik';
import { LuInstagram, LuYoutube } from '@qwikest/icons/lucide';

export default component$(() => {
  const navItems = [
    { label: "Programa", href: '#programa' },
    { label: "Testimonios", href: '#testimonios' },
    { label: "Acerca de", href: '#acerca' },
    { label: "Contacto", href: '#contacto' },
  ];
  return (
    <footer id="contacto" class="bg-[#1A1A1A] text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <div class="text-2xl font-bold font-['Poppins'] text-white mb-4">Fabián Avendaño</div>
            <p class="text-gray-300 text-sm">Transformando vidas a través del entrenamiento inteligente y la mentalidad correcta.</p>
          </div>
          {/* Navegación */}
          <div>
            <h3 class="font-bold mb-4 text-white">Navegación</h3>
            <div class="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  class="block text-gray-300 hover:text-white transition-colors text-sm cursor-pointer"
                  onClick$={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.href.replace('#', ''));
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = item.href;
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {/* Social Media */}
          <div>
            <h3 class="font-bold mb-4 text-white">Sígueme</h3>
            <div class="flex space-x-4 mb-2">
              <a
                href="https://www.instagram.com/fabian.avendano1/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-300 transition-colors"
                aria-label="Instagram"
              >
                <LuInstagram class="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@fabianavendanogym"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-300 transition-colors"
                aria-label="TikTok"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@fabianentrenamiento"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-300 transition-colors"
                aria-label="YouTube"
              >
                <LuYoutube class="h-6 w-6" />
              </a>
            </div>
            <div class="flex space-x-2 items-center mt-2">
              <a
                href="https://www.instagram.com/urbanstylemiramar/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-300 transition-colors flex items-center"
                aria-label="Instagram Indumentaria Urbana"
              >
                <LuInstagram class="h-5 w-5 mr-1" />
                <span class="text-xs">Indumentaria urbana</span>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-400 text-sm">© 2025 Fabián Avendaño. Todos los derechos reservados.</p>
        </div>
        <div class="mt-4 text-center">
          <a
            href="http://cleverisma.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-gray-400 hover:text-blue-300 transition-colors underline"
          >
            Desarrollado por Cleverisma
          </a>
        </div>
      </div>
    </footer>
  );
});