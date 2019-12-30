import { useState, useCallback } from 'react';

function useFetchData<Data extends object>(fetchFn: () => Promise<Data>) {
    const [error, setErr] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data>();

    const queryData = useCallback((filterFn?: (data: Data) => Data) => {
        setLoading(true);
        fetchFn()
            .then(res => {
                console.log(res);
                const result = filterFn ? filterFn(res) : res;
                setData(result);
            })
            .finally(() => {
                setLoading(false);
            })
            .catch(e => setErr(e));
    }, []);
    return {
        fetchResult: {
            error,
            data,
            loading
        },
        queryData
    };
}

export default useFetchData;
