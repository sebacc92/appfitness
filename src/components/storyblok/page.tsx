import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "./component";

interface PageBlok extends SbBlokData {
    body?: SbBlokData[];
}

interface Props {
    blok: PageBlok;
}

export default component$<Props>((props) => {
    return (
        <main {...storyblokEditable(props.blok)}>
            {props.blok.body?.map((blok) => (
                <StoryblokComponent key={blok._uid} blok={blok} />
            ))}
        </main>
    );
});
