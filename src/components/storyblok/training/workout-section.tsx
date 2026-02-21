import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "../component";

export interface WorkoutSectionBlok extends SbBlokData {
    section_title?: string;
    instructions?: string;
    exercises?: SbBlokData[];
}

interface Props {
    blok: WorkoutSectionBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)} class="mb-6 last:mb-0">
            {props.blok.section_title && (
                <h4 class="text-blue-400 font-bold text-md uppercase tracking-wide mb-2 border-b border-gray-700 pb-1">
                    {props.blok.section_title}
                </h4>
            )}
            {props.blok.instructions && (
                <p class="text-gray-400 text-sm mb-4 italic">
                    {props.blok.instructions}
                </p>
            )}
            <div class="space-y-4">
                {props.blok.exercises?.map((exercise) => (
                    <StoryblokComponent key={exercise._uid} blok={exercise} />
                ))}
                {(!props.blok.exercises || props.blok.exercises.length === 0) && (
                    <p class="text-gray-500 text-sm italic">No hay ejercicios en esta sección.</p>
                )}
            </div>
        </div>
    );
});
