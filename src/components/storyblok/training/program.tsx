import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "../component";
import { LockedContent } from "~/components/LockedContent";

export interface ProgramBlok extends SbBlokData {
    title: string;
    description?: string;
    cover_image?: { filename: string; alt?: string };
    price?: number;
    trial_days?: number;
    workouts?: SbBlokData[];
}

interface Props {
    blok: ProgramBlok;
    userState?: {
        subscription_active: boolean;
        trial_start?: string;
    };
}

export default component$<Props>((props) => {
    // Simulated user state — in production this would come from auth/context
    const user = props.userState ?? {
        subscription_active: false,
        trial_start: new Date().toISOString(),
    };

    const trialDays = props.blok.trial_days ?? 0;

    // Calculate access
    let accessLevel: 'full' | 'trial' | 'locked' = 'locked';

    if (user.subscription_active) {
        accessLevel = 'full';
    } else if (trialDays > 0 && user.trial_start) {
        const trialStart = new Date(user.trial_start);
        const now = new Date();
        const diffMs = now.getTime() - trialStart.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (diffDays < trialDays) {
            accessLevel = 'trial';
        }
    }

    const daysRemaining = (() => {
        if (accessLevel !== 'trial' || !user.trial_start) return 0;
        const trialStart = new Date(user.trial_start);
        const now = new Date();
        const diffMs = now.getTime() - trialStart.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return Math.max(0, Math.ceil(trialDays - diffDays));
    })();

    return (
        <div {...storyblokEditable(props.blok)}>
            {/* Program Header */}
            <div class="mb-8">
                {props.blok.cover_image?.filename && (
                    <img
                        src={props.blok.cover_image.filename}
                        alt={props.blok.cover_image.alt || props.blok.title}
                        class="w-full h-64 object-cover rounded-xl mb-6"
                        width={1200}
                        height={256}
                    />
                )}

                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {props.blok.title}
                </h1>

                {props.blok.description && (
                    <p class="text-lg text-gray-600">{props.blok.description}</p>
                )}
            </div>

            {/* Trial Banner */}
            {accessLevel === 'trial' && (
                <div class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
                    <span class="text-2xl">⏳</span>
                    <div>
                        <p class="font-semibold text-amber-800">Modo Prueba</p>
                        <p class="text-sm text-amber-700">
                            Te quedan <strong>{daysRemaining}</strong> días de prueba gratis.
                        </p>
                    </div>
                </div>
            )}

            {/* Content or Lock */}
            {accessLevel === 'locked' ? (
                <LockedContent
                    title={props.blok.title}
                    price={props.blok.price}
                />
            ) : (
                <div class="space-y-2">
                    {props.blok.workouts?.map((workoutBlok) => (
                        <StoryblokComponent key={workoutBlok._uid} blok={workoutBlok} />
                    ))}

                    {(!props.blok.workouts || props.blok.workouts.length === 0) && (
                        <p class="text-gray-400 italic">No hay entrenamientos asignados aún.</p>
                    )}
                </div>
            )}
        </div>
    );
});
