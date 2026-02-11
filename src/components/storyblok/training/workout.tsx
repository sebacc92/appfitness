import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "../component";

export interface WorkoutBlok extends SbBlokData {
    day_title: string;
    exercises?: SbBlokData[];
}

interface Props {
    blok: WorkoutBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)} class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {props.blok.day_title}
            </h3>

            <div class="space-y-3">
                {props.blok.exercises?.map((nestedBlok) => (
                    <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
                ))}

                {(!props.blok.exercises || props.blok.exercises.length === 0) && (
                    <p class="text-gray-400 italic text-sm">No hay ejercicios asignados para este día.</p>
                )}
            </div>
        </div>
    );
});
