import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { getYouTubeEmbedUrl } from "~/utils/video";

export interface ExerciseBlok extends SbBlokData {
    name: string;
    video_url?: string;
    video?: { filename: string } | string;
    sets?: string;
    reps?: string;
    rest?: string;
}

interface Props {
    blok: ExerciseBlok;
}

/**
 * Check if a URL points to an MP4 / video file.
 */
const isVideoFile = (url: string): boolean => {
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
};

export default component$<Props>((props) => {
    // Determine video source
    const videoField = props.blok.video;
    let videoUrl = '';

    if (typeof videoField === 'string') {
        videoUrl = videoField;
    } else if (videoField) {
        // Storyblok asset (image/video) usually has 'filename'
        // Storyblok multilink (url) usually has 'url' or 'cached_url'
        const v = videoField as any;
        videoUrl = v.url || v.cached_url || v.filename || '';
    }

    if (!videoUrl) {
        videoUrl = props.blok.video_url || '';
    }

    const videoSrc = videoUrl;
    const youtubeEmbed = getYouTubeEmbedUrl(videoSrc);
    const isMP4 = videoSrc ? isVideoFile(videoSrc) : false;

    return (
        <div {...storyblokEditable(props.blok)} class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">

            <div class="p-4">
                <h4 class="font-bold text-white text-lg mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                    {props.blok.name}
                </h4>

                {/* Video Section - Compacto */}
                {(youtubeEmbed || (isMP4 && !youtubeEmbed)) && (
                    <div class="mb-4 rounded-md overflow-hidden bg-black/20">
                        {youtubeEmbed ? (
                            <div class="relative w-full aspect-video max-w-md mx-auto">
                                <iframe
                                    src={youtubeEmbed}
                                    title={props.blok.name}
                                    class="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullscreen
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <div class="w-full bg-black flex justify-center">
                                <video
                                    src={videoSrc}
                                    controls
                                    preload="metadata"
                                    class="max-w-full max-h-[300px]"
                                >
                                    Tu navegador no soporta este formato de video.
                                </video>
                            </div>
                        )}
                    </div>
                )}

                {/* Metrics Grid */}
                <div class="grid grid-cols-3 gap-3">
                    {/* Sets */}
                    <div class="bg-gray-700/50 rounded-lg p-2 text-center border border-gray-600">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider mb-1">Sets</span>
                        <span class="font-bold text-white text-lg">{props.blok.sets || "-"}</span>
                    </div>

                    {/* Reps */}
                    <div class="bg-gray-700/50 rounded-lg p-2 text-center border border-gray-600">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider mb-1">Reps</span>
                        <span class="font-bold text-white text-lg">{props.blok.reps || "-"}</span>
                    </div>

                    {/* Rest */}
                    <div class="bg-gray-700/50 rounded-lg p-2 text-center border border-gray-600">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider mb-1">Descanso</span>
                        <span class="font-bold text-white text-lg">{props.blok.rest || "-"}</span>
                    </div>
                </div>

                {/* Video link fallback */}
                {videoSrc && !youtubeEmbed && !isMP4 && (
                    <div class="mt-3 text-center">
                        <a
                            href={videoSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                        >
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                            </svg>
                            Ver Video Externo
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
});
