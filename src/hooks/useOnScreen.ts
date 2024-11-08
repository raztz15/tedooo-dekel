import React, { useEffect, useState } from 'react'

export const useOnScreen = (ref: React.RefObject<Element>, rootMargin = "0px") => {

    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            { rootMargin })

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current)
            }
        }

    }, [ref, rootMargin])

    return isIntersecting

}
