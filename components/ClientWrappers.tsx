'use client';

import dynamic from 'next/dynamic';

// Client wrapper cho FloatingIcons để có thể sử dụng ssr: false
const FloatingIconsWrapper = dynamic(() => import('@/components/FloatingIcons'), {
    ssr: false
});

// Client wrapper cho ZaloChat để tránh lỗi hydration
const ZaloChatWrapper = dynamic(() => import('@/components/ZaloChat'), {
    ssr: false
});

export { FloatingIconsWrapper, ZaloChatWrapper }; 