'use client';

import { usePathname } from 'next/navigation';
import ProductSidebar from '@/components/ProductSidebar';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProductDetailPage = pathname.split('/').length > 2;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:gap-10">
        {/* Sidebar - chỉ hiển thị ở trang danh sách sản phẩm, không hiển thị ở trang chi tiết */}
        {!isProductDetailPage && (
          <div className="w-full md:w-1/4 xl:w-1/5 mb-6 md:mb-0">
            <ProductSidebar />
          </div>
        )}

        {/* Nội dung chính */}
        <div className={isProductDetailPage ? "w-full" : "w-full md:w-3/4 xl:w-4/5"}>
          {children}
        </div>
      </div>
    </div>
  );
}