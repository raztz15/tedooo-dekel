import { useCallback, useState } from 'react';
import { FetchResult } from '../interfaces';

function useFetch<T>(url: string, options?: RequestInit): FetchResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | Error | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`)
            }
            const jsonData = await response.json()
            setData(jsonData.data)
            setHasMore(jsonData.hasMore || false)
        }
        catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false)
        }

    }, [url, options])

    return { data, loading, error, hasMore, fetchData };
};

export default useFetch;