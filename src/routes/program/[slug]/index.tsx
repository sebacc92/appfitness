import { component$ } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { storyblokApi } from "~/routes/plugin@storyblok";
import type { ISbStoryData } from "@storyblok/js";
import { renderRichText } from "@storyblok/js";
import { LuLock, LuDumbbell, LuClock, LuCalendar } from "@qwikest/icons/lucide";

export const usePublicProgramStory = routeLoader$(async ({ params, error }) => {
    const slug = params.slug;

    if (!storyblokApi) {
        throw error(500, "Storyblok API not initialized");
    }

    try {
        const { data } = await storyblokApi.get(`cdn/stories/programs/${slug}`, {
            version: "published", // Use published for public page
        });
        return data.story as ISbStoryData;
    } catch (e) {
        console.error(e);
        throw error(404, "Programa no encontrado");
    }
});

export default component$(() => {
    const story = usePublicProgramStory().value;
    const content = story.content;
    const workouts = content.workouts || [];
    const trialDays = content.trial_days || 7;

    return (
        <div class="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div class="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gray-900">
                {content.cover_image?.filename ? (
                    <>
                        <img
                            src={content.cover_image.filename}
                            alt={content.cover_image.alt || content.title}
                            class="absolute inset-0 h-full w-full object-cover opacity-60"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                    </>
                ) : (
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-900 to-blue-900 opacity-90" />
                )}

                <div class="absolute inset-0 flex items-end pb-16 md:pb-24">
                    <div class="container mx-auto px-4">
                        <div class="max-w-4xl">
                            <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-sm border border-cyan-500/30">
                                <span>PROGRAMA EXCLUSIVO</span>
                            </div>
                            <h1 class="font-['Poppins'] text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl mb-6 drop-shadow-xl">
                                {content.title}
                            </h1>
                            {content.description && (
                                <div class="prose prose-lg prose-invert max-w-2xl text-gray-200 drop-shadow-md hidden md:block">
                                    <div dangerouslySetInnerHTML={typeof content.description === 'string'
                                        ? content.description
                                        : renderRichText(content.description)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto px-4 -mt-10 relative z-10 mb-20">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div class="lg:col-span-2 space-y-8">
                        {/* Mobile Description (visible only on small screens) */}
                        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:hidden">
                            <h2 class="text-xl font-bold text-gray-900 mb-4">Sobre el programa</h2>
                            {content.description && (
                                <div class="prose prose-sm text-gray-600">
                                    <div dangerouslySetInnerHTML={typeof content.description === 'string'
                                        ? content.description
                                        : renderRichText(content.description)} />
                                </div>
                            )}
                        </div>

                        {/* Workouts Showcase */}
                        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <div class="flex items-center justify-between mb-8">
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-900 mb-1">Entrenamientos</h2>
                                    <p class="text-gray-500">Plan de {workouts.length} días diseñado para resultados</p>
                                </div>
                                <div class="h-10 w-10 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600">
                                    <LuCalendar class="w-5 h-5" />
                                </div>
                            </div>

                            <div class="space-y-4">
                                {workouts.length > 0 ? (
                                    workouts.map((workout: any, index: number) => (
                                        <div
                                            key={workout._uid || index}
                                            class="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div class="flex items-center gap-4">
                                                <div class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 group-hover:bg-gray-300 transition-colors">
                                                    <LuLock class="w-5 h-5 text-gray-500" />
                                                </div>
                                                <div>
                                                    <h3 class="font-medium text-gray-900 group-hover:text-gray-700">
                                                        {workout.day_title || `Entrenamiento Día ${index + 1}`}
                                                    </h3>
                                                    {workout.exercises && (
                                                        <p class="text-xs text-gray-400 mt-0.5">
                                                            {workout.exercises.length} {workout.exercises.length === 1 ? 'ejercicio' : 'ejercicios'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div class="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-bold rounded uppercase tracking-wider">
                                                Premium
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div class="text-center py-10 text-gray-400 italic">
                                        No hay entrenamientos visibles en la vista previa.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Sticker */}
                    <div class="lg:col-span-1">
                        <div class="sticky top-24 bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 ring-1 ring-gray-900/5">
                            <div class="text-center mb-6">
                                <p class="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Acceso Completo</p>
                                <div class="flex items-baseline justify-center gap-1">
                                    <span class="text-4xl font-bold text-gray-900">
                                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(Number(content.price || 0))}
                                    </span>
                                    <span class="text-gray-400 font-medium">/ programa</span>
                                </div>
                            </div>

                            <div class="space-y-4 mb-8">
                                <div class="flex items-start gap-3 text-sm text-gray-600">
                                    <LuDumbbell class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                    <span>Acceso ilimitado a {workouts.length} entrenamientos</span>
                                </div>
                                <div class="flex items-start gap-3 text-sm text-gray-600">
                                    <LuClock class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                    <span>A tu propio ritmo, sin horarios</span>
                                </div>
                                <div class="flex items-start gap-3 text-sm text-gray-600">
                                    <LuCalendar class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                                    <span>Prueba gratuita de {trialDays} días incluida</span>
                                </div>
                            </div>

                            <Link
                                href={`/login?action=register&redirect=/app/program/${story.slug}`}
                                class="block w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-center font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                INICIAR PRUEBA DE {trialDays} DÍAS
                            </Link>

                            <p class="text-xs text-center text-gray-400 mt-4">
                                Cancela cuando quieras dentro del periodo de prueba sin costo alguno.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
