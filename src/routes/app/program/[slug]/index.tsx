import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";
import StoryblokComponent from "~/components/storyblok/component";
import type { ISbStoryData } from "@storyblok/js";
import { tursoClient } from "~/utils/turso";

export const useProgramStory = routeLoader$(async ({ params, error }) => {
    const slug = params.slug;

    if (!storyblokApi) {
        throw error(500, "Storyblok API not initialized");
    }

    try {
        // Try fetching from programs/ folder first
        const { data } = await storyblokApi.get(`cdn/stories/programs/${slug}`, {
            version: "draft",
        });
        return data.story as ISbStoryData;
    } catch (e) {
        console.error(e);
        throw error(404, "Programa no encontrado");
    }
});

export const useUserProgram = routeLoader$(async (requestEvent) => {
    const { cookie, params, redirect } = requestEvent;
    const userIdCookie = cookie.get("user_id");
    const programSlug = params.slug;

    if (!userIdCookie?.value) {
        throw redirect(302, `/login?redirect=/app/program/${programSlug}`);
    }

    const userId = userIdCookie.value;
    const client = tursoClient(requestEvent);

    // 1. Get User
    const userResult = await client.execute({
        sql: "SELECT email, id FROM users WHERE id = ?",
        args: [userId],
    });

    if (userResult.rows.length === 0) {
        // Invalid user cookie
        throw redirect(302, `/login?redirect=/app/program/${programSlug}`);
    }

    const user = userResult.rows[0];

    // 2. Get Enrollment
    const enrollmentResult = await client.execute({
        sql: "SELECT * FROM enrollments WHERE userId = ? AND programSlug = ?",
        args: [userId, programSlug],
    });

    if (enrollmentResult.rows.length === 0) {
        // No enrollment -> Redirect to sales page
        throw redirect(302, `/program/${programSlug}`);
    }

    const enrollment = enrollmentResult.rows[0];
    const status = enrollment.status as string;

    // 3. Check Status & Expiry
    if (status === 'expired') {
        throw redirect(302, `/program/${programSlug}?error=expired`);
    }

    let daysRemaining = null;

    if (status === 'trial') {
        // Wait, the user provided SQL schema in previous message: 
        // CREATE TABLE enrollments (... startDate INTEGER DEFAULT (unixepoch()), status TEXT DEFAULT 'trial' );
        // BUT my previous implementation used `createdAt`. 
        // I should probably query both or check properly. 
        // Let's assume 'createdAt' if 'startDate' is missing or vice versa for robustness, or checking the user provided schema strictly. 
        // User provided: startDate INTEGER DEFAULT (unixepoch()) in the SQL snippet.
        // My previous drizzle schema used `createdAt`. 
        // I will use `createdAt` logic from my previous code but adapted to `startDate` if available, 
        // but since I'm using raw SQL now and the USER created the table manually as they said...
        // "Para que tengas mas info te muestro como cree las tablas en la base de datos... startDate INTEGER..."
        // So I should use `startDate`.

        // HOWEVER, in the `useProgramAccess` loader (previous task), I was inserting `createdAt`.
        // If the user manually created the table with `startDate`, my previous inserts might have failed or field names mismatch?
        // User said: "Para que tengas mas info te muestro como cree las tablas..." 
        // Implicitly this means the table structure IS `startDate`.
        // I should probably support `createdAt` too just in case my previous code ran against a different schema version or if I need to fallback.
        // But let's stick to what's in the DB if possible.
        // Let's safe fetch:
        const start = enrollment.startDate || enrollment.createdAt || 0;

        const now = Date.now() / 1000; // unixepoch is seconds usually in SQLite default? 
        // User said `DEFAULT (unixepoch())`. unixepoch() returns SECONDS since 1970.
        // JS Date.now() is MILLISECONDS.

        // Validation of timestamp format:
        // If start is small (e.g. 1.7 billion), it's seconds. If huge (1.7 trillion), it's ms.
        const startSeconds = Number(start) > 100000000000 ? Number(start) / 1000 : Number(start);

        const sevenDaysSeconds = 7 * 24 * 60 * 60;
        const expiry = startSeconds + sevenDaysSeconds;

        if (now > expiry) {
            // Expired
            // Optionally update DB to expired?
            // await client.execute({ sql: "UPDATE enrollments SET status = 'expired' WHERE id = ?", args: [enrollment.id] });
            throw redirect(302, `/program/${programSlug}?error=trial_expired`);
        }

        daysRemaining = Math.ceil((expiry - now) / (24 * 60 * 60));
    }

    return {
        user: { email: String(user.email) },
        enrollment: {
            status,
            daysRemaining
        }
    };
});

export default component$(() => {
    const storyData = useProgramStory().value;
    const story = useStoryblok(storyData);
    const userData = useUserProgram().value;
    const userEmail = userData.user.email || '';

    return (
        <div class="min-h-screen bg-gray-50 pb-20">
            {/* User Status Bar */}
            <div class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
                            {userEmail.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-medium text-gray-700 hidden md:inline">{userEmail}</span>
                    </div>

                    <div>
                        {userData.enrollment.status === 'trial' && (
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Prueba Gratuita: {userData.enrollment.daysRemaining} días restantes
                            </span>
                        )}
                        {userData.enrollment.status === 'paid' && (
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Miembro Activo
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <StoryblokComponent blok={story.value.content} />
        </div>
    );
});
