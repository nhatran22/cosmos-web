'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

export function QueryClientProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                refetchOnWindowFocus: false,
            },
        },
    }));

    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    );
} 