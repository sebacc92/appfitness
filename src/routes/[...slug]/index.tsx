import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";
import StoryblokComponent from "~/components/storyblok/component";
import type { ISbStoryData } from "@storyblok/js";

export const useStory = routeLoader$(async ({ params, error }) => {
    const slug = params.slug.replace(/\/$/, ""); // Remove trailing slash

    if (!storyblokApi) {
        throw error(500, "Storyblok API not initialized");
    }

    try {
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
            version: "draft",
        });
        return data.story as ISbStoryData;
    } catch (e) {
        console.error(e);
        throw error(404, "Page not found");
    }
});

export default component$(() => {
    const storyData = useStory().value;
    const story = useStoryblok(storyData);

    return <StoryblokComponent blok={story.value.content} />;
});
