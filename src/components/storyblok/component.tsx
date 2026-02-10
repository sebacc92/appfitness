import { component$ } from '@builder.io/qwik';
import type { SbBlokData } from "@storyblok/js";

import Page from "./page";
import Hero from "./hero";
import Methodology from "./methodology";
import Testimonials from "./testimonials-section";
import About from "./about-section";
import FAQ from "./faq-section";

interface Props {
    blok: SbBlokData;
}

const Components: any = {
    'page': Page,
    'hero': Hero,
    'methodology': Methodology,
    'testimonials': Testimonials,
    'about': About,
    'faq': FAQ,
};

export default component$<Props>((props) => {
    const componentName = props.blok.component as string;
    const Component = Components[componentName];

    if (!Component) {
        return (
            <div class="p-4 bg-yellow-100 text-yellow-800 rounded border border-yellow-300">
                <p>⚠️ El componente <strong>{props.blok.component}</strong> ha sido creado en Storyblok pero no en Qwik.</p>
            </div>
        );
    }

    return (
        <Component blok={props.blok} />
    );
});
