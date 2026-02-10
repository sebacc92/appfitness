import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { FAQSection } from "~/components/FAQ-section";

interface FAQItemBlok extends SbBlokData {
    question: string;
    answer: string;
}

interface FAQBlok extends SbBlokData {
    heading: string;
    subheading: string;
    faqs?: FAQItemBlok[];
}

interface Props {
    blok: FAQBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)}>
            <FAQSection
                heading={props.blok.heading}
                subheading={props.blok.subheading}
                faqs={props.blok.faqs?.map(f => ({
                    q: f.question,
                    a: f.answer
                }))}
            />
        </div>
    );
});
