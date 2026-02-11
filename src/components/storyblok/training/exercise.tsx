import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";

export interface ExerciseBlok extends SbBlokData {
    name: string;
    video_url?: string;
    video?: { filename: string };
    sets?: string;
    reps?: string;
    rest?: string;
}

interface Props {
    blok: ExerciseBlok;
}

/**
 * Detect if a URL is a YouTube link and extract the embed ID.
 */
const getYouTubeEmbedUrl = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
    }
    return null;
};

/**
 * Check if a URL points to an MP4 / video file.
 */
const isVideoFile = (url: string): boolean => {
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
};

export default component$<Props>((props) => {
    // Determine video source: could be a link (video_url) or an asset (video.filename)
    const videoSrc = props.blok.video_url || props.blok.video?.filename || '';
    const youtubeEmbed = videoSrc ? getYouTubeEmbedUrl(videoSrc) : null;
    const isMP4 = videoSrc ? isVideoFile(videoSrc) : false;

    return (
        <div {...storyblokEditable(props.blok)} class="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
            {/* Video Section */}
            {youtubeEmbed && (
                <div class="relative w-full" style="padding-bottom: 56.25%;">
                    <iframe
                        src={youtubeEmbed}
                        title={props.blok.name}
                        class="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullscreen
                        loading="lazy"
                    />
                </div>
            )}

            {isMP4 && !youtubeEmbed && (
                <div class="w-full bg-black">
                    <video
                        src={videoSrc}
                        controls
                        preload="metadata"
                        class="w-full max-h-[400px]"
                    >
                        Tu navegador no soporta este formato de video.
                    </video>
                </div>
            )}

            {/* Content Section */}
            <div class="p-4">
                <h4 class="font-bold text-gray-900 text-lg mb-3">{props.blok.name}</h4>

                {/* Badges Row */}
                <div class="flex flex-wrap gap-2">
                    {props.blok.sets && (
                        <span class="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200 px-3 py-1 rounded-full text-sm font-medium">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M2 12h20" stroke-linecap="round" />
                            </svg>
                            {props.blok.sets} Series
                        </span>
                    )}
                    {props.blok.reps && (
                        <span class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-sm font-medium">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12h16M12 4l8 8-8 8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {props.blok.reps} Reps
                        </span>
                    )}
                    {props.blok.rest && (
                        <span class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-sm font-medium">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" stroke-linecap="round" />
                            </svg>
                            {props.blok.rest} Descanso
                        </span>
                    )}
                </div>

                {/* Video link fallback if no embed */}
                {videoSrc && !youtubeEmbed && !isMP4 && (
                    <a
                        href={videoSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 mt-3 text-cyan-600 hover:text-cyan-800 transition-colors text-sm font-medium"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                        </svg>
                        Ver Video
                    </a>
                )}
            </div>
        </div>
    );
});
