import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { MethodologySection } from "~/components/Methodology";

interface MethodologyDayBlok extends SbBlokData {
    title: string;
    description: string; // 'desc' in component
    icon: string;
}

interface MethodologyBlok extends SbBlokData {
    heading: string;
    days?: MethodologyDayBlok[];
}

interface Props {
    blok: MethodologyBlok;
}

export default component$<Props>((props) => {
    return (
        <div {...storyblokEditable(props.blok)}>
            <MethodologySection
                heading={props.blok.heading}
                days={props.blok.days?.map(day => ({
                    title: day.title,
                    desc: day.description,
                    icon: day.icon
                }))}
            />
        </div>
    );
});
