/**
 * Các tiện ích và hàm hỗ trợ để tối ưu hiệu suất trang web
 */

// Đăng ký web worker để xử lý các tác vụ nặng
export const registerWorker = (scriptUrl: string): Promise<Worker> => {
    return new Promise((resolve, reject) => {
        try {
            const worker = new Worker(scriptUrl);
            worker.onmessage = () => {
                console.log('Worker đã sẵn sàng');
                resolve(worker);
            };
            worker.onerror = (err) => {
                console.error('Lỗi khởi tạo worker:', err);
                reject(err);
            };
        } catch (error) {
            console.error('Không thể khởi tạo worker:', error);
            reject(error);
        }
    });
};

// Tiện ích để prefetch trang
export const prefetchPage = (path: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    link.as = 'document';
    document.head.appendChild(link);
};

// Tiện ích để prefetch ảnh
export const prefetchImage = (src: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
};

// Trì hoãn việc tải các tài nguyên không thiết yếu
export const deferNonEssentialAssets = () => {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
        const nonEssentialStyles = document.querySelectorAll('link[data-priority="low"]');
        const nonEssentialScripts = document.querySelectorAll('script[data-priority="low"]');

        nonEssentialStyles.forEach((link) => {
            const el = link as HTMLLinkElement;
            el.media = 'all';
        });

        nonEssentialScripts.forEach((script) => {
            const el = script as HTMLScriptElement;
            el.setAttribute('src', el.getAttribute('data-src') || '');
            el.removeAttribute('data-src');
        });
    }, 2000);
};

// Đo thời gian tải trang
export const measurePageLoadTime = () => {
    if (typeof window === 'undefined' || !performance) return;

    const pageLoadTime = performance.now();
    console.log(`Thời gian tải trang: ${Math.round(pageLoadTime)}ms`);

    return pageLoadTime;
};

// Ghi lại các metrics hiệu suất
export const recordPerformanceMetrics = () => {
    if (typeof window === 'undefined' || !performance || !performance.getEntriesByType) return;

    // Lấy các metrics từ Navigation Timing API
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

    if (navigationEntries.length > 0) {
        const timing = navigationEntries[0];

        // Tính toán các thông số chính
        const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
        const tcpTime = timing.connectEnd - timing.connectStart;
        const ttfb = timing.responseStart - timing.requestStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.fetchStart;
        const fullLoadTime = timing.loadEventEnd - timing.fetchStart;

        console.log({
            DNS: `${Math.round(dnsTime)}ms`,
            TCP: `${Math.round(tcpTime)}ms`,
            TTFB: `${Math.round(ttfb)}ms`,
            DOMContentLoaded: `${Math.round(domContentLoaded)}ms`,
            FullLoadTime: `${Math.round(fullLoadTime)}ms`,
        });
    }
};

// Tính toán thời điểm tải trang cần thiết trước khi trình duyệt sẵn sàng render
export const calculateLCP = () => {
    if (typeof window === 'undefined' || !PerformanceObserver) return;

    try {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`LCP: ${Math.round(lastEntry.startTime)}ms`);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
        console.error('LCP calculation error:', e);
    }
};

// Khởi tạo tất cả các tính năng ghi đo hiệu suất
export const initPerformanceMonitoring = () => {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
        measurePageLoadTime();
        recordPerformanceMetrics();
        calculateLCP();
    });
};

// Đăng ký service worker nếu được hỗ trợ
export const registerServiceWorker = () => {
    if (typeof window === 'undefined' || !navigator.serviceWorker) return;

    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('ServiceWorker đã đăng ký thành công:', registration.scope);
        } catch (error) {
            console.error('Đăng ký ServiceWorker thất bại:', error);
        }
    });
};

// Dùng để kích hoạt tất cả tính năng tối ưu hiệu suất
export const optimizePerformance = () => {
    if (typeof window === 'undefined') return;

    deferNonEssentialAssets();
    initPerformanceMonitoring();
    // registerServiceWorker(); // Uncomment khi có service worker

    // Đăng ký các sự kiện prefetch
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                prefetchPage(href);
            }
        });
    });
}; 