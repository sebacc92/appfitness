import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";
import StoryblokComponent from "~/components/storyblok/component";
import type { ISbStoryData } from "@storyblok/js";
import { tursoClient } from "~/utils/turso";
import { useAuthUser } from "../../layout";

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

export const useProgramAccess = routeLoader$(async (requestEvent) => {
    // Auth is already handled by parent layout (useAuthUser)
    // We just need to check ENROLLMENT for this specific program
    const { params, redirect, resolveValue } = requestEvent;
    const programSlug = params.slug;

    // Get user from parent layout
    const user = await resolveValue(useAuthUser);

    const client = tursoClient(requestEvent);

    // 2. Get Enrollment
    const enrollmentResult = await client.execute({
        sql: "SELECT * FROM enrollments WHERE userId = ? AND programSlug = ?",
        args: [user.id, programSlug],
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
        const start = enrollment.startDate || enrollment.createdAt || 0;
        const now = Date.now() / 1000;
        const startSeconds = Number(start) > 100000000000 ? Number(start) / 1000 : Number(start);
        const sevenDaysSeconds = 7 * 24 * 60 * 60;
        const expiry = startSeconds + sevenDaysSeconds;

        if (now > expiry) {
            throw redirect(302, `/program/${programSlug}?error=trial_expired`);
        }

        daysRemaining = Math.ceil((expiry - now) / (24 * 60 * 60));
    }

    return {
        enrollment: {
            status,
            daysRemaining
        }
    };
});

export default component$(() => {
    const storyData = useProgramStory().value;
    const story = useStoryblok(storyData);
    const accessData = useProgramAccess().value;
    const user = useAuthUser().value;
    const userEmail = user.email || '';

    return (
        <div class="min-h-screen bg-gray-50 pb-20">
            {/* User Status Bar */}
            <div class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
                            {userEmail.charAt(0).toUpperCase()}
                        </div>
                        <span class="text-sm font-medium text-gray-700 hidden md:inline">{user.name || userEmail}</span>
                    </div>

                    <div>
                        {accessData.enrollment.status === 'trial' && (
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Prueba Gratuita: {accessData.enrollment.daysRemaining} días restantes
                            </span>
                        )}
                        {accessData.enrollment.status === 'paid' && (
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
