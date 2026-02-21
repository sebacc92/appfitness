import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$, Link, useLocation } from "@builder.io/qwik-city";
import bcrypt from "bcryptjs";
import { tursoClient } from "~/utils/turso";
import { setSession } from "~/utils/auth";

export const useLogin = routeAction$(
    async (values, requestEvent) => {
        const client = tursoClient(requestEvent);

        const result = await client.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [values.email],
        });

        if (result.rows.length === 0) {
            return requestEvent.fail(400, {
                message: "Usuario o contraseña inválidos",
            });
        }

        const user = result.rows[0];
        const passwordHash = user.password as string;

        if (!passwordHash) {
            return requestEvent.fail(400, {
                message: "Este usuario no tiene contraseña configurada (quizás usó Google/GitHub)."
            });
        }

        const isValid = bcrypt.compareSync(values.password, passwordHash);

        if (!isValid) {
            return requestEvent.fail(400, {
                message: "Usuario o contraseña inválidos",
            });
        }

        // Set session cookies using helper
        setSession(requestEvent.cookie, user.id as string);

        const userId = user.id as string;
        const programSlug = values.programSlug;
        if (programSlug) {
            try {
                const checkEnrollment = await client.execute({
                    sql: "SELECT id FROM enrollments WHERE userId = ? AND programSlug = ?",
                    args: [userId, programSlug],
                });
                if (checkEnrollment.rows.length === 0) {
                    await client.execute({
                        sql: "INSERT INTO enrollments (userId, programSlug, status, startDate) VALUES (?, ?, ?, ?)",
                        args: [userId, programSlug, 'trial', Date.now()],
                    });
                }
            } catch (e) {
                console.error("Error al inscribir al usuario existente:", e);
            }
        }

        const redirectUrl = values.programSlug ? `/app/program/${values.programSlug}` : (requestEvent.url.searchParams.get('redirect') || '/app/program/fuerza');
        throw requestEvent.redirect(302, redirectUrl);
    },
    zod$({
        email: z.string().email("Email inválido"),
        password: z.string().min(1, "Ingrese contraseña"),
        programSlug: z.string().optional(),
    })
);

export default component$(() => {
    const action = useLogin();
    const location = useLocation();

    const redirectParam = location.url.searchParams.get('redirect');
    let computedSlug = location.url.searchParams.get('program');

    if (!computedSlug && redirectParam && redirectParam.includes('/app/program/')) {
        const parts = redirectParam.split('/app/program/');
        if (parts.length > 1) {
            computedSlug = parts[1].split('/')[0];
        }
    }

    return (
        <div class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-black text-gray-900 mb-2 font-['Orbitron']">
                        Iniciar Sesión
                    </h1>
                    <p class="text-gray-500">
                        Bienvenido de nuevo.
                    </p>
                </div>

                <Form action={action} class="space-y-6">
                    {computedSlug && <input type="hidden" name="programSlug" value={computedSlug} />}

                    {action.value?.failed && (
                        <div class="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                            {action.value.message}
                        </div>
                    )}

                    <div class="space-y-2">
                        <label class="block text-sm font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            class="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
                        />
                        {action.value?.fieldErrors?.email && (
                            <p class="text-xs text-red-500 mt-1">
                                {action.value.fieldErrors.email}
                            </p>
                        )}
                    </div>

                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <label class="block text-sm font-bold text-gray-700">
                                Contraseña
                            </label>
                            <a href="#" class="text-xs text-cyan-600 hover:underline">¿Olvidaste tu contraseña?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            class="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
                        />
                        {action.value?.fieldErrors?.password && (
                            <p class="text-xs text-red-500 mt-1">
                                {action.value.fieldErrors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        class="w-full rounded-xl bg-cyan-500 p-3 font-black text-white uppercase tracking-wider transition-all hover:bg-cyan-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                        disabled={action.isRunning}
                    >
                        {action.isRunning ? "Entrando..." : "Iniciar Sesión"}
                    </button>
                </Form>

                <div class="mt-6 text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{" "}
                    <Link href="/create" class="font-bold text-cyan-600 hover:text-cyan-700 hover:underline">
                        Regístrate gratis
                    </Link>
                </div>
            </div>
        </div>
    );
});
