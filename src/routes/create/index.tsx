import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$, Link } from "@builder.io/qwik-city";
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
        const id = crypto.randomUUID();
        const now = Date.now(); // Send integer timestamp for SQLITE INTEGER column

        // Guardar usuario
        try {
            await client.execute({
                sql: "INSERT INTO users (email, password) VALUES (?, ?)",
                args: [values.email, hash],
            });
        } catch (e: any) {
            console.error(e);
            return requestEvent.fail(500, {
                message: `Error al crear usuario: ${e.message}`,
            });
        }

        return {
            success: true,
            message: "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
        };
    },
    zod$({
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    })
);

export default component$(() => {
    const action = useCreateUser();

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
