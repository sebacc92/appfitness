import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import WhatsAppButton from "~/components/WhatsAppButton";
import ScrollToTop from "~/components/scroll-to-top";

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
