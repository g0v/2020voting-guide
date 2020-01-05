import { useEffect, useState } from 'react';

export default function useYoutubeAPI(): boolean[] {
    const [isYoutubeReady, setYoutubeReady] = useState<boolean>(false);
    useEffect(() => {
        // Youtube api
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag: any = document.getElementsByTagName(
            'script'
        )[0] as any;
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        (window as any).onYouTubeIframeAPIReady = () => {
            if (process.env.NODE_ENV === 'development') {
                console.log('onYouTubeIframeAPIReady');
            }
            setYoutubeReady(true);
            (window as any).onYouTubeIframeAPIReady = null;
            delete (window as any).onYouTubeIframeAPIReady;
        };
    }, []);
    return [isYoutubeReady];
}
