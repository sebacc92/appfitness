import { component$, useSignal } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "../component";
import { LuChevronDown, LuChevronUp, LuDumbbell } from "@qwikest/icons/lucide";
import { getYouTubeEmbedUrl } from "~/utils/video";

export interface WorkoutBlok extends SbBlokData {
    day_title: string;
    description?: string;
    video?: { filename: string } | string;
    video_url?: string;
    exercises?: SbBlokData[];
    objective?: string;
    estimated_duration?: string;
    level?: string;
    sections?: SbBlokData[];
}

interface Props {
    blok: WorkoutBlok;
}

export default component$<Props>((props) => {
    const isOpen = useSignal(false);

    // Determine video source
    const videoField = props.blok.video;
    let videoUrl = '';

    if (typeof videoField === 'string') {
        videoUrl = videoField;
    } else if (videoField) {
        // Storyblok asset (image/video) usually has 'filename'
        // Storyblok multilink (url) usually has 'url' or 'cached_url'
        // Type assertion as 'any' to handle the flexible structure of Storyblok fields
        const v = videoField as any;
        videoUrl = v.url || v.cached_url || v.filename || '';
    }

    // Fallback to legacy video_url field if needed
    if (!videoUrl) {
        videoUrl = props.blok.video_url || '';
    }

    const embedUrl = getYouTubeEmbedUrl(videoUrl);

    return (
        <div {...storyblokEditable(props.blok)} class="mb-4 border border-gray-800 rounded-xl overflow-hidden bg-gray-900 shadow-md">
            {/* Header del Acordeón */}
            <button
                onClick$={() => isOpen.value = !isOpen.value}
                class="w-full flex items-center justify-between p-5 bg-gray-800 hover:bg-gray-750 transition-colors text-left"
            >
                <div class="flex items-center gap-4">
                    <div class="bg-blue-900/50 p-3 rounded-lg text-blue-400">
                        <LuDumbbell class="w-6 h-6" />
                    </div>
                    <div>
                        {/* Título del Día */}
                        <h3 class="font-bold text-white text-lg">{props.blok.day_title || "Entrenamiento del día"}</h3>
                        {/* Descripción corta (preview) si está cerrado */}
                        {!isOpen.value && props.blok.description && (
                            <p class="text-xs text-gray-400 mt-1 line-clamp-1">{props.blok.description}</p>
                        )}
                    </div>
                </div>
                {isOpen.value ? <LuChevronUp class="text-gray-400" /> : <LuChevronDown class="text-gray-400" />}
            </button>

            {/* Contenido Desplegable */}
            {isOpen.value && (
                <div class="p-5 border-t border-gray-700 animate-fadeIn">

                    {/* Video del Workout */}
                    {embedUrl && (
                        <div class="mb-6 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                            <iframe
                                src={embedUrl}
                                title={props.blok.day_title}
                                class="w-full aspect-video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullscreen
                            />
                        </div>
                    )}

                    {/* Descripción Completa */}
                    {props.blok.description && (
                        <div class="mb-8 text-gray-300 text-sm bg-gray-800/50 p-4 rounded-lg border border-gray-700 leading-relaxed">
                            {props.blok.description}
                        </div>
                    )}

                    {/* Metadata del Día */}
                    {(props.blok.objective || props.blok.estimated_duration || props.blok.level) && (
                        <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-800/80 p-4 rounded-lg border border-gray-700 text-sm">
                            {props.blok.level && (
                                <div><span class="text-gray-500 block text-xs uppercase">Nivel</span><span class="text-white font-medium">{props.blok.level}</span></div>
                            )}
                            {props.blok.estimated_duration && (
                                <div><span class="text-gray-500 block text-xs uppercase">Duración</span><span class="text-white font-medium">{props.blok.estimated_duration}</span></div>
                            )}
                            {props.blok.objective && (
                                <div class="md:col-span-3 mt-2 md:mt-0"><span class="text-gray-500 block text-xs uppercase">Objetivo</span><span class="text-gray-300 italic">{props.blok.objective}</span></div>
                            )}
                        </div>
                    )}

                    {/* Renderizado de Secciones o Ejercicios (Compatibilidad) */}
                    <div class="space-y-2">
                        {props.blok.sections && props.blok.sections.length > 0 ? (
                            // Nueva estructura: Renderiza las secciones
                            props.blok.sections.map((section) => (
                                <StoryblokComponent key={section._uid} blok={section} />
                            ))
                        ) : props.blok.exercises && props.blok.exercises.length > 0 ? (
                            // Vieja estructura: Renderiza los ejercicios directos
                            props.blok.exercises.map((exercise) => (
                                <StoryblokComponent key={exercise._uid} blok={exercise} />
                            ))
                        ) : (
                            <p class="text-center text-gray-500 italic py-4">No hay contenido asignado para este día.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});
