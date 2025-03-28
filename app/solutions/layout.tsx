'use client';

import { usePathname } from 'next/navigation';
import SolutionSidebar from '@/components/SolutionSidebar';

export default function SolutionsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const isDetailPage = pathname.split('/').length > 2;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:gap-10">
                {/* Sidebar - ẩn ở trang chi tiết */}
                {!isDetailPage && (
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <SolutionSidebar />
                    </div>
                )}

                {/* Nội dung chính */}
                <div className={isDetailPage ? "w-full" : "w-full md:w-3/4"}>
                    {children}
                </div>
            </div>
        </div>
    );
} 