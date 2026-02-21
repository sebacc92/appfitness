import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";
import StoryblokComponent from "~/components/storyblok/component";
import type { ISbStoryData } from "@storyblok/js";
import type { DocumentHead } from "@builder.io/qwik-city";
import FaqSection from "~/components/faq-section";
import VideosCoverSection from "~/components/videos-cover-section";

export const useStory = routeLoader$(async ({ error }) => {
  if (!storyblokApi) {
    throw error(500, "Storyblok API not initialized");
  }
  try {
    const { data } = await storyblokApi.get("cdn/stories/home", {
      version: "draft",
    });
    return data.story as ISbStoryData;
  } catch (e) {
    console.error(e);
    throw error(404, "Home Page not found");
  }
});

export default component$(() => {
  const storyData = useStory().value;
  const story = useStoryblok(storyData);

  return <>
    <StoryblokComponent blok={story.value.content} />
    <FaqSection />
    <VideosCoverSection />
  </>;
});

export const head: DocumentHead = () => {
  // Ideally this should also come from Storyblok, but keeping static for now or can use `story.value.content` content if SEO fields exist
  const baseUrl = "https://fa.cleverisma.com";
  const currentUrl = `${baseUrl}/`;
  const imageUrl = `${baseUrl}/assets/images/fabian-kettlebell.jpg`;

  const title = "Coach Fabian Avendaño - Programas de Entrenamiento Personalizado | Transformación Física y Mental";
  const description = "Descubre programas de entrenamiento personalizado con Coach Fabian Avendaño. Retos de transformación, HIIT, fuerza base y más. Transforma tu cuerpo y mente con metodología probada.";
  const keywords = "entrenamiento personal, coach personal, transformación física, retos fitness, HIIT, fuerza base, entrenamiento en casa, fitness online";

  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        name: "keywords",
        content: keywords,
      },
      {
        name: "author",
        content: "Fabián Avendaño",
      },
      // Open Graph
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:image",
        content: imageUrl,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: currentUrl,
      },
      {
        property: "og:site_name",
        content: "Coach Fabián Avendaño",
      },
      {
        property: "og:locale",
        content: "es",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: imageUrl,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: currentUrl,
      },
    ],
  };
};
