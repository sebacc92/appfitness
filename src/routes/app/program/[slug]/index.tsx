import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";
import StoryblokComponent from "~/components/storyblok/component";
import type { ISbStoryData } from "@storyblok/js";

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

export default component$(() => {
    const storyData = useProgramStory().value;
    const story = useStoryblok(storyData);

    return (
        <div>
            <StoryblokComponent blok={story.value.content} />
        </div>
    );
});
