'use client';

import { usePathname } from 'next/navigation';
import SolutionSidebar from '@/components/solution-sidebar';

export default function SolutionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isMainSolutionPage = pathname === '/solutions';

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {isMainSolutionPage && (
                        <div className="md:col-span-1">
                            <SolutionSidebar />
                        </div>
                    )}
                    <main className={isMainSolutionPage ? "md:col-span-3" : "md:col-span-4"}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
} 