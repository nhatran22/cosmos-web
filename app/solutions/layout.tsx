'use client';

import SolutionSidebar from '@/components/SolutionSidebar';
import { usePathname } from 'next/navigation';

export default function SolutionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Kiểm tra xem có phải trang chính không - xử lý cả trường hợp có dấu / ở cuối
    const isMainSolutionPage = pathname === '/solutions' || pathname === '/solutions/';

    console.log(pathname);
    // Kiểm tra xem có phải trang chi tiết không (đường dẫn có nhiều hơn 2 phần)
    const isSolutionDetailPage = pathname.split('/').length > 2;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Chỉ hiển thị ở trang solutions chính */}
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