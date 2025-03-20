'use client';

import dynamic from 'next/dynamic';

// Client wrapper cho FloatingIcons để có thể sử dụng ssr: false
const FloatingIconsWrapper = dynamic(() => import('@/components/floating-icons'), {
    ssr: false
});

export { FloatingIconsWrapper }; 