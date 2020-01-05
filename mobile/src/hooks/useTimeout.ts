import { useEffect, useRef, useCallback } from 'react';

export type UseTimeoutReturn = [() => void];

export default function useTimeout(
    callback: () => void,
    ms = 5000,
    deps: any = []
): UseTimeoutReturn {
    const savedCallback = useRef();
    const timeout = useRef<any>(-1);

    const cancel = useCallback(() => {
        if (timeout.current > 0) {
            clearTimeout(timeout.current);
            timeout.current = -1;
        }
        if (process.env.NODE_ENV === 'development') {
            console.log('cancel');
        }
    }, []);

    useEffect(() => {
        (savedCallback.current as any) = callback;
    }, [callback]);

    useEffect(() => {
        timeout.current = setTimeout(() => {
            (savedCallback.current as any)();
            if (process.env.NODE_ENV === 'development') {
                console.log('timeout');
            }
        }, ms);
        return cancel;
    }, deps);

    return [cancel];
}
