import React from 'react';

interface Size {
    width: number;
    height: number;
}

export default function useWindowResize(): Size {
    const getSize = (): Size => ({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [windowSize, setWindowSize] = React.useState<Size>(getSize);
    React.useLayoutEffect(() => {
        const resizeHandler = () => setWindowSize(getSize());
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);
    return windowSize;
}
