import { component$ } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { storyblokApi } from "~/routes/plugin@storyblok";
import type { ISbStoryData } from "@storyblok/js";
import { StoryblokImage } from "~/components/ui/storyblok-image";
import { LuLock, LuDumbbell, LuClock, LuCalendar } from "@qwikest/icons/lucide";
import { RichTextRenderer } from "~/components/storyblok/rich-text-renderer";

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
            <div class="relative min-h-[60vh] md:min-h-[85vh] w-full bg-gray-900 group">
                {content.cover_image?.filename ? (
                    <>
                        <StoryblokImage
                            src={content.cover_image.filename}
                            alt={content.cover_image.alt || content.title}
                            // width={1920}
                            // height={1080}
                            layout="fullWidth"
                            class="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
                            style={{ objectPosition: 'top center', height: '100%' }}
                            priority={true}
                        />
                        {/* Gradient Overlay for text readability */}
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-black/50 z-10 pointer-events-none" />
                    </>
                ) : (
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-900 to-blue-900 z-0" />
                )}

                <div class="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center pb-20 md:pb-32 pt-32 md:pt-48 min-h-[60vh] md:min-h-[85vh]">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left Column: Badge & Title */}
                        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-1.5 text-sm font-bold text-cyan-300 backdrop-blur-sm border border-cyan-500/30">
                                <span>PROGRAMA EXCLUSIVO</span>
                            </div>
                            <h1 class="font-['Orbitron'] text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-2xl">
                                {content.title}
                            </h1>
                            {/* Subtitle / Short Description from hero if available, or just a tagline */}
                            <p class="text-lg md:text-xl text-gray-200 font-medium max-w-lg">
                                {content.subtitle || "Entrena como un profesional, donde sea."}
                            </p>
                        </div>

                        {/* Right Column: CTA */}
                        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <Link
                                href={`/create?action=register&redirect=/app/program/${story.slug}`}
                                class="inline-block bg-[#00C2FF] hover:bg-[#33d1ff] text-black text-xl font-black uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(0,194,255,0.5)] hover:shadow-[0_0_50px_rgba(0,194,255,0.8)]"
                            >
                                EMPEZAR AHORA
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div class="container mx-auto px-4 py-12 md:py-16 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div class="lg:col-span-2 space-y-12">
                        {/* Description Section */}
                        <div class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Sobre el programa</h2>
                            {content.description && (
                                <div class="rich-text-content">
                                    <RichTextRenderer content={content.description} />
                                </div>
                            )}
                        </div>

                        {/* Workouts Showcase */}
                        <div id="workouts" class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
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
                                href={`/create?action=register&redirect=/app/program/${story.slug}`}
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
