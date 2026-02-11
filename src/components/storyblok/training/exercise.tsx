import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { LuPlayCircle } from "@qwikest/icons/lucide";

export interface ExerciseBlok extends SbBlokData {
    name: string;
    video_url?: string;
    sets?: string;
    reps?: string;
}

interface Props {
    blok: ExerciseBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)} class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex-1">
                <h4 class="font-semibold text-gray-900 text-lg mb-1">{props.blok.name}</h4>
                <div class="flex gap-4 text-sm text-gray-600">
                    {props.blok.sets && (
                        <span class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {props.blok.sets} Series
                        </span>
                    )}
                    {props.blok.reps && (
                        <span class="bg-green-50 text-green-700 px-2 py-0.5 rounded">
                            {props.blok.reps} Reps
                        </span>
                    )}
                </div>
            </div>

            {props.blok.video_url && (
                <a
                    href={props.blok.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
                >
                    <LuPlayCircle class="w-5 h-5" />
                    Ver Video
                </a>
            )}
        </div>
    );
});
