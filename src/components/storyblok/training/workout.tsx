import { component$, useSignal } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "../component";
import { LuChevronDown, LuDumbbell } from "@qwikest/icons/lucide";

export interface WorkoutBlok extends SbBlokData {
    day_title: string;
    exercises?: SbBlokData[];
}

interface Props {
    blok: WorkoutBlok;
}

export default component$<Props>((props) => {
    const isOpen = useSignal(false);
    const exerciseCount = props.blok.exercises?.length ?? 0;

    return (
        <div {...storyblokEditable(props.blok)} class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
            {/* Accordion Header */}
            <button
                onClick$={() => (isOpen.value = !isOpen.value)}
                class="w-full flex items-center justify-between px-5 py-4 cursor-pointer group transition-colors hover:bg-gray-50"
            >
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center shrink-0">
                        <LuDumbbell class="w-5 h-5 text-white" />
                    </div>
                    <div class="text-left">
                        <h3 class="font-bold text-gray-900 text-lg group-hover:text-cyan-700 transition-colors">
                            {props.blok.day_title}
                        </h3>
                        <p class="text-sm text-gray-500">
                            {exerciseCount} {exerciseCount === 1 ? 'ejercicio' : 'ejercicios'}
                        </p>
                    </div>
                </div>
                <LuChevronDown
                    class={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen.value ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Accordion Content */}
            {isOpen.value && (
                <div class="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                    <div class="space-y-3">
                        {props.blok.exercises?.map((nestedBlok) => (
                            <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
                        ))}

                        {exerciseCount === 0 && (
                            <p class="text-gray-400 italic text-sm text-center py-4">
                                No hay ejercicios asignados para este día.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});
