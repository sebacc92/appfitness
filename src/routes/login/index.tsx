import { component$ } from '@builder.io/qwik';
import { routeAction$, Form, z, zod$ } from '@builder.io/qwik-city';
import { Button } from '~/components/ui/button/button';

export const useLoginAction = routeAction$(
    (data, { cookie, redirect }) => {
        // Simulate successful login
        cookie.set('auth_token', 'simulated_token', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        // Set a trial start date if not present for testing
        if (!cookie.get('trial_start')) {
            cookie.set('trial_start', new Date().toISOString(), {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 365, // 1 year
            })
        }

        throw redirect(302, '/app');
    },
    zod$({
        username: z.string().min(1, 'Required'),
        password: z.string().min(1, 'Required'),
    })
);

export default component$(() => {
    const action = useLoginAction();

    return (
        <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Iniciar Sesión
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        (Simulación: Usa cualquier credencial)
                    </p>
                </div>
                <Form action={action} class="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div class="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label for="username" class="sr-only">Usuario</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Usuario"
                            />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Ingresar
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
});
