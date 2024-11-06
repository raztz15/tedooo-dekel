import { useEffect, useState } from 'react'

export const useDebouncer = (value: string, timer: number) => {

    const [debouncer, setDebouncer] = useState<string>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncer(value)
        }, timer);

        return () => clearTimeout(timeoutId)

    }, [value, timer])

    return debouncer
}
