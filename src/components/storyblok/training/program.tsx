import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
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
}

type AccessLevel = 'loading' | 'not_started' | 'trial' | 'expired' | 'full';

export default component$<Props>((props) => {
    const accessLevel = useSignal<AccessLevel>('loading');
    const trialDay = useSignal(0);
    const daysRemaining = useSignal(0);

    const trialDays = props.blok.trial_days ?? 7;

    // Read localStorage on client mount
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        // Check subscription first (simulated)
        const isSubscribed = localStorage.getItem('subscription_active') === 'true';
        if (isSubscribed) {
            accessLevel.value = 'full';
            return;
        }

        // Check trial
        const trialStartStr = localStorage.getItem('trial_start_date');

        if (!trialStartStr) {
            accessLevel.value = 'not_started';
            return;
        }

        const trialStart = new Date(trialStartStr);
        const now = new Date();
        const diffMs = now.getTime() - trialStart.getTime();
        const diffDaysCalc = diffMs / (1000 * 60 * 60 * 24);

        if (diffDaysCalc < trialDays) {
            accessLevel.value = 'trial';
            trialDay.value = Math.floor(diffDaysCalc) + 1;
            daysRemaining.value = Math.max(0, Math.ceil(trialDays - diffDaysCalc));
        } else {
            accessLevel.value = 'expired';
        }
    });

    const startTrial = $(() => {
        localStorage.setItem('trial_start_date', new Date().toISOString());
        accessLevel.value = 'trial';
        trialDay.value = 1;
        daysRemaining.value = trialDays;
    });

    return (
        <div {...storyblokEditable(props.blok)}>
            {/* Program Header */}
            <div class="mb-8">
                {props.blok.cover_image?.filename && (
                    <div class="relative overflow-hidden rounded-2xl mb-6">
                        <img
                            src={props.blok.cover_image.filename}
                            alt={props.blok.cover_image.alt || props.blok.title}
                            class="w-full h-64 md:h-80 object-cover"
                            width={1200}
                            height={320}
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                {props.blok.title}
                            </h1>
                            {props.blok.description && (
                                <p class="text-lg text-white/90 drop-shadow">{props.blok.description}</p>
                            )}
                        </div>
                    </div>
                )}

                {!props.blok.cover_image?.filename && (
                    <div class="mb-6">
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {props.blok.title}
                        </h1>
                        {props.blok.description && (
                            <p class="text-lg text-gray-600">{props.blok.description}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Loading State */}
            {accessLevel.value === 'loading' && (
                <div class="flex justify-center py-16">
                    <div class="animate-pulse flex flex-col items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-cyan-100"></div>
                        <div class="h-4 w-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            )}

            {/* Not Started — Big CTA */}
            {accessLevel.value === 'not_started' && (
                <div class="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-dashed border-cyan-200 text-center px-6">
                    <div class="text-6xl mb-6">🚀</div>
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        ¿Listo para empezar?
                    </h2>
                    <p class="text-gray-600 mb-8 max-w-md text-lg">
                        Probá este programa gratis durante <strong>{trialDays} días</strong>. Sin compromiso, sin tarjeta de crédito.
                    </p>
                    <button
                        onClick$={startTrial}
                        class="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        COMENZAR PRUEBA DE {trialDays} DÍAS
                    </button>
                </div>
            )}

            {/* Trial Banner */}
            {accessLevel.value === 'trial' && (
                <>
                    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 flex items-center gap-4 shadow-sm">
                        <span class="text-3xl">⏳</span>
                        <div class="flex-1">
                            <p class="font-bold text-amber-800 text-lg">
                                Día {trialDay.value} de tu prueba gratuita
                            </p>
                            <p class="text-sm text-amber-700">
                                Te quedan <strong>{daysRemaining.value}</strong> días para disfrutar todo el contenido.
                            </p>
                        </div>
                        <div class="hidden sm:flex items-center gap-1">
                            {[...Array(trialDays)].map((_, i) => (
                                <div
                                    key={i}
                                    class={`w-3 h-3 rounded-full transition-all ${i < trialDay.value
                                        ? 'bg-amber-500 scale-110'
                                        : 'bg-amber-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div class="space-y-4">
                        {props.blok.workouts?.map((workoutBlok) => (
                            <StoryblokComponent key={workoutBlok._uid} blok={workoutBlok} />
                        ))}

                        {(!props.blok.workouts || props.blok.workouts.length === 0) && (
                            <p class="text-gray-400 italic text-center py-8">No hay entrenamientos asignados aún.</p>
                        )}
                    </div>
                </>
            )}

            {/* Full Access */}
            {accessLevel.value === 'full' && (
                <div class="space-y-4">
                    {props.blok.workouts?.map((workoutBlok) => (
                        <StoryblokComponent key={workoutBlok._uid} blok={workoutBlok} />
                    ))}

                    {(!props.blok.workouts || props.blok.workouts.length === 0) && (
                        <p class="text-gray-400 italic text-center py-8">No hay entrenamientos asignados aún.</p>
                    )}
                </div>
            )}

            {/* Expired */}
            {accessLevel.value === 'expired' && (
                <LockedContent
                    title={props.blok.title}
                    price={props.blok.price}
                />
            )}
        </div>
    );
});
