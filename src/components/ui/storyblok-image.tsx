import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';

interface StoryblokImageProps {
    src: string;
    alt: string;
    class?: string;
    width?: number; // Explicit width for layout stability and resizing
    height?: number; // Explicit height for layout stability and resizing
    // sizes is handled by Unpic default or can be passed if needed to override.
    // Unpic handles 'srcset' generation automatically.
    priority?: boolean;
}

export const StoryblokImage = component$<StoryblokImageProps>((props) => {
    // Unpic uses 'src' and automatically detects Storyblok CDN to generate optimized variants.
    // It also handles layout, which we can set to 'constrained' to respect aspect ratio with valid width/height.

    // Mapping props to Unpic Image props
    const { src, alt, class: className, width, height, priority = false } = props;

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            class={className}
            priority={priority} // Unpic prop for priority loading (eager + fetchPriority high)
            layout="constrained" // Resizes to fit container, maintaining aspect ratio. 
            // If width/height are unknown, 'layout="fullWidth"' or 'layout="fill"' might be better, 
            // but we are enforcing width/height in our usage.
            cdn="storyblok" // Explicitly tell Unpic it's Storyblok (optional usually, but safer)
        />
    );
});
