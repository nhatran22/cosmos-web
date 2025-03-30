'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, useEffect } from 'react';

export function QueryClientProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 5 * 60 * 1000, // 5 minutes
                    refetchOnWindowFocus: false,
                },
            },
        });
    });

    useEffect(() => {
        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
        });

        return () => {
            unsubscribe();
        };
    }, [queryClient]);

    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    );
} 