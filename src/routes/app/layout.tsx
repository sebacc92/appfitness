import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";

export const useAuthGuard = routeLoader$(({ cookie, redirect }) => {
    const authToken = cookie.get('auth_token');
    if (!authToken) {
        throw redirect(302, '/login');
    }
    return {
        isAuthenticated: true,
        user: {
            name: "Estudiante Demo",
            trialStart: cookie.get('trial_start')?.value
        }
    };
});

export default component$(() => {
    useAuthGuard();

    return (
        <div class="flex min-h-screen flex-col bg-gray-50">
            <header class="bg-white shadow">
                <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 class="text-xl font-bold tracking-tight text-gray-900">
                        <Link href="/app" class="hover:text-indigo-600 transition">
                            Fabián Avendaño - App Alumnos
                        </Link>
                    </h1>
                    <div class="flex items-center gap-4">
                        <span class="text-sm text-gray-500">Modo Estudiante</span>
                        <Link href="/">
                            <Button look="ghost" size="sm">Volver al Sitio</Button>
                        </Link>
                    </div>
                </div>
            </header>
            <main class="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8">
                <Slot />
            </main>
        </div>
    );
});
