import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { AboutSection } from "~/components/About-section";
import { renderRichText } from "@storyblok/js";

interface AboutBlok extends SbBlokData {
    heading: string;
    subheading: string;
    role: string;
    description: any; // rich text
    image: { filename: string };
}

interface Props {
    blok: AboutBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)}>
            <AboutSection
                heading={props.blok.heading}
                subheading={props.blok.subheading}
                role={props.blok.role}
                image={props.blok.image?.filename}
                text={props.blok.description ? renderRichText(props.blok.description) : undefined}
            />
        </div>
    );
});
