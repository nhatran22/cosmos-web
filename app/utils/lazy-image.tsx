'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

// Component LazyImage với hỗ trợ cho lazy loading và placeholders
export default function LazyImage({
    src,
    alt,
    className,
    blurDataURL,
    quality = 75,
    priority = false,
    onLoad,
    ...props
}: ImageProps & { onLoad?: () => void }) {
    const [isLoading, setIsLoading] = useState(!priority);
    const [error, setError] = useState(false);

    // Ngăn việc load ảnh nếu không cần thiết
    const [shouldLoad, setShouldLoad] = useState(priority);

    useEffect(() => {
        // Tạo Intersection Observer để kiểm tra khi ảnh nằm trong viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setShouldLoad(true);
                observer.disconnect();
            }
        }, {
            rootMargin: '200px' // Load ảnh trước khi nó xuất hiện 200px
        });

        // Tìm parent element để quan sát
        const element = document.getElementById(`img-wrapper-${alt?.replace(/\s+/g, '-')}`);
        if (element) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, [alt]);

    const handleImageLoad = () => {
        setIsLoading(false);
        if (onLoad) onLoad();
    };

    const handleImageError = () => {
        setIsLoading(false);
        setError(true);
    };

    // Placeholder khi ảnh đang tải
    const renderPlaceholder = () => (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded overflow-hidden"></div>
    );

    // Placeholder khi ảnh bị lỗi
    const renderError = () => (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            Unable to load image
        </div>
    );

    return (
        <div
            id={`img-wrapper-${alt?.replace(/\s+/g, '-')}`}
            className={`relative ${className || ''}`}
            style={{ ...props.style }}
        >
            {isLoading && renderPlaceholder()}
            {error && renderError()}

            {shouldLoad && (
                <Image
                    src={src}
                    alt={alt || "Image"}
                    quality={quality}
                    priority={priority}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className || ''}`}
                    {...props}
                />
            )}
        </div>
    );
} 