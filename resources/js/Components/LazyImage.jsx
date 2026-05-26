import { useState, useRef, useEffect } from 'react';

/**
 * LazyImage — Progressive lazy-loading image component.
 * 
 * Uses IntersectionObserver to load images only when they enter the viewport.
 * Shows a smooth blur-up fade-in animation when the image loads.
 * Falls back to native loading="lazy" for browsers without IO support.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes for the img element
 * @param {object} style - Inline styles for the img element
 * @param {string} wrapperClassName - CSS classes for the wrapper div
 * @param {object} wrapperStyle - Inline styles for the wrapper div
 * @param {number} rootMargin - px before viewport to start loading (default: 200)
 * @param {React.ReactNode} placeholder - Custom placeholder content
 */
export default function LazyImage({
    src,
    alt = '',
    className = '',
    style = {},
    wrapperClassName = '',
    wrapperStyle = {},
    rootMargin = 200,
    placeholder = null,
    ...rest
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!imgRef.current) return;

        // Check if IntersectionObserver is available
        if (!('IntersectionObserver' in window)) {
            setIsInView(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    // Stop observing once in view
                    if (observerRef.current && imgRef.current) {
                        observerRef.current.unobserve(imgRef.current);
                    }
                }
            },
            {
                rootMargin: `${rootMargin}px 0px`,
                threshold: 0.01,
            }
        );

        observerRef.current.observe(imgRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [rootMargin]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div
            ref={imgRef}
            className={wrapperClassName}
            style={{
                position: 'relative',
                overflow: 'hidden',
                ...wrapperStyle,
            }}
        >
            {/* Skeleton placeholder */}
            {!isLoaded && !hasError && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, #f5ecf2 0%, #ede4eb 50%, #f5ecf2 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'lazyimg-shimmer 1.8s ease-in-out infinite',
                    }}
                >
                    {placeholder}
                </div>
            )}

            {/* Actual image — only set src when in viewport */}
            {isInView && !hasError && (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    style={{
                        ...style,
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.4s ease-out',
                        willChange: 'opacity',
                    }}
                    loading="lazy"
                    decoding="async"
                    onLoad={handleLoad}
                    onError={handleError}
                    {...rest}
                />
            )}

            {/* Error fallback */}
            {hasError && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f5ecf2',
                    }}
                >
                    <svg className="w-8 h-8 text-purple-300 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
                        <path d="M21 15l-5-5L5 21" strokeWidth="1.5"/>
                    </svg>
                </div>
            )}

            {/* Shimmer animation */}
            <style>{`
                @keyframes lazyimg-shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}
