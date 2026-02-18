import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$, Link, useLocation } from "@builder.io/qwik-city";
import bcrypt from "bcryptjs";
import { tursoClient } from "~/utils/turso";

export const useCreateUser = routeAction$(
    async (values, requestEvent) => {
        const client = tursoClient(requestEvent);

        // Verificar si el usuario ya existe
        const exists = await client.execute({
            sql: "SELECT id FROM users WHERE email = ?",
            args: [values.email],
        });

        if (exists.rows.length > 0) {
            return requestEvent.fail(400, {
                message: "El usuario ya existe",
            });
        }

        // Hashear contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(values.password, salt);

        // Guardar usuario
        let userId: string | bigint | undefined;
        try {
            const transaction = await client.transaction("write");

            const insertUserCheck = await transaction.execute({
                sql: "INSERT INTO users (email, password) VALUES (?, ?)",
                args: [values.email, hash],
            });

            userId = insertUserCheck.lastInsertRowid;

            if (values.programSlug && userId) {
                await transaction.execute({
                    sql: "INSERT INTO enrollments (userId, programSlug, status, startDate) VALUES (?, ?, ?, ?)",
                    args: [userId.toString(), values.programSlug, 'trial', Date.now()],
                });
            }

            await transaction.commit();

        } catch (e: any) {
            console.error(e);
            return requestEvent.fail(500, {
                message: `Error al crear usuario: ${e.message}`,
            });
        }

        // Auto-Login: Set cookies
        requestEvent.cookie.set("auth_session", "true", {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 semana
            sameSite: "lax",
        });

        if (userId) {
            requestEvent.cookie.set("user_id", userId.toString(), {
                httpOnly: true,
                secure: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            });
        }

        if (values.programSlug) {
            throw requestEvent.redirect(302, `/app/program/${values.programSlug}`);
        }

        return {
            success: true,
            message: "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
        };
    },
    zod$({
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        programSlug: z.string().optional(),
    })
);

export default component$(() => {
    const action = useCreateUser();
    const location = useLocation();

    // Wait, the previous link was `/create?action=register&redirect=/app/program/${story.slug}`
    // But usage in implementation plan was `programSlug` param.
    // The user's link from Step 319: href={`/create?action=register&redirect=/app/program/${story.slug}`}
    // NOTE: The user's link uses `redirect` param which contains the full path! 
    // And `action=register` is just a flag.
    // BUT the USER REQUEST in Step 320 says: "Asegúrate de que la acción ... pueda recibir un campo programSlug".
    // I should probably support extracting it from the `redirect` param OR a direct `program` param.
    // If I look at the redirection URL: `/app/program/${story.slug}`. I can extract the slug from there.
    // OR I can change the link to send `program=${story.slug}`. 
    // The user also mentioned "puede venir ... de los query params".

    // Let's support `program` query param primarily as per "Recibir el Slug... programSlug".
    // I will assume the previous link might need adjustment or I parse `redirect`.
    // Validating the request: "Recibir el campo programSlug ... input hidden o query params".

    // Let's try to grab it from `program` param. 
    // If usage was `redirect=/app/program/...`, I can parse that too for better UX if the user didn't update the link fully.
    // But let's stick to a clean `program` param if possible, or expect the user to send it.

    // Actually, looking at the previous user edit (Step 319), they changed the link to `/create?action=register&redirect=...`.
    // They didn't add `program=...`.
    // So I should probably parse the `redirect` param to extract the slug if `program` is missing?
    // User request: "Recibir el Slug ... input hidden". 
    // I'll add logic to parse it from `redirect` query param if `program` param is missing.

    const redirectParam = location.url.searchParams.get('redirect');
    let computedSlug = location.url.searchParams.get('program');

    if (!computedSlug && redirectParam && redirectParam.includes('/app/program/')) {
        const parts = redirectParam.split('/app/program/');
        if (parts.length > 1) {
            computedSlug = parts[1].split('/')[0]; // simple extraction
        }
    }

    return (
        <div class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-black text-gray-900 mb-2 font-['Orbitron']">
                        Crear Cuenta
                    </h1>
                    <p class="text-gray-500">
                        Regístrate para comenzar tu entrenamiento.
                    </p>
                </div>

                <Form action={action} class="space-y-6">
                    {/* Hidden input for programSlug */}
                    {computedSlug && <input type="hidden" name="programSlug" value={computedSlug} />}

                    {action.value?.success && (
                        <div class="rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200">
                            {action.value.message}
                            <Link href="/login" class="ml-2 font-bold underline hover:text-green-800">
                                Ir al Login
                            </Link>
                        </div>
                    )}

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
                        <label class="block text-sm font-bold text-gray-700">
                            Contraseña
                        </label>
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
                        {action.isRunning ? "Creando cuenta..." : "Registrarse"}
                    </button>
                </Form>

                <div class="mt-6 text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" class="font-bold text-cyan-600 hover:text-cyan-700 hover:underline">
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
});
