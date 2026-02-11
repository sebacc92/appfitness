import { component$ } from '@builder.io/qwik';
import { Button } from '~/components/ui/button/button';
import { LuLock } from "@qwikest/icons/lucide";

interface LockedContentProps {
    title?: string;
    price?: number | string;
}

export const LockedContent = component$((props: LockedContentProps) => {
    return (
        <div class="flex flex-col items-center justify-center py-20 bg-gray-100 rounded-xl border border-gray-200 text-center px-4">
            <div class="bg-gray-200 p-4 rounded-full mb-6">
                <LuLock class="w-8 h-8 text-gray-500" />
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {props.title || "Contenido Exclusivo"}
            </h3>

            <p class="text-gray-600 mb-8 max-w-md">
                Este programa es parte de la suscripción premium. Desbloquea todo el contenido y lleva tu entrenamiento al siguiente nivel.
            </p>

            <div class="space-y-4">
                {props.price && (
                    <div class="text-3xl font-bold text-gray-900 mb-4">
                        US$ {props.price}
                    </div>
                )}

                <Button class="w-full md:w-auto px-8 py-3 text-lg">
                    Desbloquear Ahora
                </Button>

                <p class="text-xs text-gray-500 mt-4">
                    ¿Ya tienes acceso? <a href="/login" class="underline hover:text-gray-900">Inicia sesión</a>
                </p>
            </div>
        </div>
    );
});
