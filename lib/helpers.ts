export const getYouTubeVideoID = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([^#\&\?]*))/);
    return match ? match[1] : '';
};
