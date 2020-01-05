import { useEffect, useState } from 'react';

export default function useFetch<T>(
    apiPath: string,
    initState?: any,
    deps?: any[],
    mapFunction?: Function
) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<T>(initState);
    useEffect(() => {
        fetch(apiPath)
            .then(res => res.json())
            .then(res => (mapFunction ? mapFunction(res) : res))
            .then(setResponseData)
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, deps);
    return {
        isLoading,
        responseData
    };
}
