import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { storyblokApi } from "./plugin@storyblok";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import WhatsAppButton from "~/components/WhatsAppButton";
import ScrollToTop from "~/components/scroll-to-top";

export const usePrograms = routeLoader$(async () => {
    if (!storyblokApi) {
        return [];
    }
    try {
        const { data } = await storyblokApi.get('cdn/stories', {
            version: 'published',
            starts_with: 'programs/',
            is_startpage: false,
        });
        return data.stories || [];
    } catch (e) {
        console.error("Error fetching programs:", e);
        return [];
    }
});

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col">
            <Header />
            <main class="flex-1">
                <Slot />
            </main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
        </div>
    );
});
