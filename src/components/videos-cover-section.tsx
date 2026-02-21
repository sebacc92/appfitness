import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import VideosImg from '~/assets/images/2.jpeg?jsx';

export default component$(() => {
    return (
        <section class="relative py-16 md:py-24 bg-linear-to-br from-blue-50 to-blue-100">
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
                            <Link href="/contenido-gratuito#videos">
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
        </section>
    );
});
