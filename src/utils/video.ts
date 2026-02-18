
/**
 * Extracts the video ID from a YouTube URL and returns the embed URL.
 * Supports standard watch URLs, short URLs, and existing embed URLs.
 * 
 * @param url The YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
 * @returns The embed URL (e.g., https://www.youtube.com/embed/dQw4w9WgXcQ) or null if invalid
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    try {
        // Handle already embedded URLs
        if (url.includes('/embed/')) {
            return url;
        }

        let videoId = '';

        // Handle standard watch URLs
        const urlObj = new URL(url);
        if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
            videoId = urlObj.searchParams.get('v') || '';
        }
        // Handle short URLs (youtu.be)
        else if (urlObj.hostname.includes('youtu.be')) {
            videoId = urlObj.pathname.substring(1);
        }
        // Handle YouTube Shorts
        else if (urlObj.pathname.includes('/shorts/')) {
            videoId = urlObj.pathname.split('/shorts/')[1].split('?')[0]; // Handle cases like /shorts/ID?feature=share
        }
        // Handle other formats if necessary, but these are the main ones

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
    } catch {
        console.warn('Invalid YouTube URL:', url);
    }

    return null;
};
