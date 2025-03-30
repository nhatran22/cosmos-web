'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, useEffect } from 'react';

export function QueryClientProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => {
        console.log('[QueryClientProvider] Creating new QueryClient instance');

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
        console.log('[QueryClientProvider] Mounted');

        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
            console.log('[QueryClient] Cache event:', event.type, {
                queryKey: JSON.stringify(event.query.queryKey),
                state: event.query.state.status,
                time: new Date().toISOString()
            });
        });

        return () => {
            console.log('[QueryClientProvider] Unmounted');
            unsubscribe();
        };
    }, [queryClient]);

    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    );
} 