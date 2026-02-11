import { component$, useSignal } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "../component";
import { LuChevronDown, LuChevronUp, LuDumbbell } from "@qwikest/icons/lucide";

export interface WorkoutBlok extends SbBlokData {
    day_title: string;
    description?: string;
    exercises?: SbBlokData[];
}

interface Props {
    blok: WorkoutBlok;
}

export default component$<Props>((props) => {
    const isOpen = useSignal(false);

    return (
        <div {...storyblokEditable(props.blok)} class="mb-4 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Header del Acordeón */}
            <button
                onClick$={() => isOpen.value = !isOpen.value}
                class="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <div class="flex items-center gap-3">
                    <div class="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <LuDumbbell />
                    </div>
                    <div>
                        {/* Título del Día */}
                        <h3 class="font-bold text-gray-900 text-lg">{props.blok.day_title || "Entrenamiento del día"}</h3>
                        {/* Descripción corta (preview) si está cerrado */}
                        {!isOpen.value && props.blok.description && (
                            <p class="text-xs text-gray-500 mt-1 line-clamp-1">{props.blok.description}</p>
                        )}
                    </div>
                </div>
                {isOpen.value ? <LuChevronUp class="text-gray-400" /> : <LuChevronDown class="text-gray-400" />}
            </button>

            {/* Contenido Desplegable */}
            {isOpen.value && (
                <div class="p-5 border-t border-gray-100 animate-fadeIn">
                    {/* Descripción Completa */}
                    {props.blok.description && (
                        <div class="mb-6 text-gray-600 text-sm bg-blue-50 p-4 rounded-lg border border-blue-100">
                            {props.blok.description}
                        </div>
                    )}

                    {/* Lista de Ejercicios */}
                    <div class="space-y-6">
                        {props.blok.exercises?.map((exercise) => (
                            <StoryblokComponent key={exercise._uid} blok={exercise} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});
