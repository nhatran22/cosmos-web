'use client';

import { useEffect } from 'react';
import { optimizePerformance } from './performance';

// Gắn các hàm performance vào window object để Script tag có thể truy cập
if (typeof window !== 'undefined') {
    (window as any).optimizePerformance = optimizePerformance;
}

// Component vô hình để khởi tạo performance monitoring
export default function PerformanceInitializer() {
    useEffect(() => {
        // Khởi tạo các tính năng tối ưu hiệu suất ngay khi client component này được mount
        optimizePerformance();

        // Ghi điểm hiệu suất
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('[Performance]', entry.name, Math.round(entry.startTime), 'ms');
                });
            });
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            observer.observe({ type: 'first-input', buffered: true });
            observer.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            console.warn('Performance observer error:', e);
        }

        // Lazy loading các ảnh ngoài viewport
        const setupLazyImages = () => {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target as HTMLImageElement;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            observer.unobserve(img);
                        }
                    });
                });
                lazyImages.forEach(img => observer.observe(img));
            }
        };

        // Đăng ký cho cả tải trang và sau DOM load
        setupLazyImages();
        document.addEventListener('DOMContentLoaded', setupLazyImages);

        // Cleanup
        return () => {
            document.removeEventListener('DOMContentLoaded', setupLazyImages);
        };
    }, []);

    // Component này không hiển thị gì cả
    return null;
} 