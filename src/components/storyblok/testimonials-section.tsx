import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { TestimonialsSection } from "~/components/Testimonials-section";

interface TestimonialBlok extends SbBlokData {
    name: string;
    title: string;
    quote: string;
    before_image: { filename: string };
    after_image: { filename: string };
}

interface TestimonialsBlok extends SbBlokData {
    heading: string;
    testimonials?: TestimonialBlok[];
}

interface Props {
    blok: TestimonialsBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)}>
            <TestimonialsSection
                heading={props.blok.heading}
                testimonials={props.blok.testimonials?.map(t => ({
                    name: t.name,
                    title: t.title,
                    quote: t.quote,
                    beforeImage: t.before_image?.filename,
                    afterImage: t.after_image?.filename,
                    rating: 5 // Default or add to Storyblok
                }))}
            />
        </div>
    );
});
