import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { USER_ID_COOKIE_NAME, USER_SESSION_COOKIE_NAME, clearSession } from "~/utils/auth";
import { tursoClient } from "~/utils/turso";

export const useAuthUser = routeLoader$(async (requestEvent) => {
    const { cookie, redirect, url } = requestEvent;
    const userIdCookie = cookie.get(USER_ID_COOKIE_NAME);
    const sessionCookie = cookie.get(USER_SESSION_COOKIE_NAME);

    // Basic cookie check
    if (!userIdCookie?.value || !sessionCookie?.value) {
        // Construct redirect URL to return here after login
        const from = url.pathname + url.search;

        // If trying to access specific program, redirect to public program page as requested
        if (url.pathname.startsWith('/app/program/')) {
            const slug = url.pathname.split('/')[3]; // /app/program/[slug]
            if (slug) {
                throw redirect(302, `/program/${slug}`);
            }
        }

        throw redirect(302, `/login?redirect=${encodeURIComponent(from)}`);
    }

    // Server-side validation against DB
    const client = tursoClient(requestEvent);
    try {
        const result = await client.execute({
            sql: "SELECT id, email, name FROM users WHERE id = ?",
            args: [userIdCookie.value],
        });

        if (result.rows.length === 0) {
            // User not found in DB (deleted?) -> Clear session and redirect
            clearSession(cookie);
            throw redirect(302, '/login');
        }

        const user = result.rows[0];

        return {
            id: user.id as string,
            email: user.email as string,
            name: user.name as string,
        };

    } catch (e) {
        console.error("Auth validation error:", e);
        // If DB fails, safe to fail open? No, fail closed for auth.
        // But if it's just a connection error, maybe we shouldn't logout user?
        // For strict security, we deny access if we can't validate.
        if (e instanceof Response) throw e; // Re-throw redirects

        throw redirect(302, `/login?error=auth_error`);
    }
});

export default component$(() => {
    const user = useAuthUser();

    return (
        <div class="flex min-h-screen flex-col bg-gray-50">
            <header class="bg-white shadow sticky top-0 z-10">
                <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 class="text-xl font-bold tracking-tight text-gray-900">
                        <Link href="/app" class="hover:text-indigo-600 transition flex items-center gap-2">
                            <span class="text-cyan-600">FA</span> App
                        </Link>
                    </h1>
                    <div class="flex items-center gap-4">
                        <div class="hidden md:flex flex-col items-end mr-2">
                            <span class="text-sm font-medium text-gray-900">{user.value.name || user.value.email}</span>
                            <span class="text-xs text-gray-500">Estudiante</span>
                        </div>
                        <Link href="/logout">
                            <Button look="ghost" size="sm" class="text-gray-500 hover:text-red-600">
                                Salir
                            </Button>
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
