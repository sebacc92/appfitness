import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { Hero } from "~/components/Hero";

interface HeroBlok extends SbBlokData {
    heading: string;
    subheading: string;
    image: {
        filename: string;
        alt?: string;
    };
    link_url?: {
        url: string;
        cached_url?: string;
    };
    link_text?: string;
}

interface Props {
    blok: HeroBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)}>
            <Hero
                heading={props.blok.heading}
                subheading={props.blok.subheading}
                backgroundImage={props.blok.image?.filename}
                buttonText={props.blok.link_text}
                buttonLink={props.blok.link_url?.url || props.blok.link_url?.cached_url || props.blok.link_url as any as string}
            />
        </div>
    );
});
