import { useState, useEffect, useRef } from 'react';

/**
 * A custom hook to observe when an element enters the viewport.
 * @param {object} options - Intersection Observer options (root, rootMargin, threshold).
 * @returns {[React.MutableRefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's intersecting.
 */
export const useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state only when intersecting and not already visible
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Stop observing once it's visible to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            },
            {
                ...options,
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return [elementRef, isIntersecting];
};