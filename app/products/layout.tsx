'use client';

import { usePathname } from 'next/navigation';
import ProductSidebar from '@/components/product-sidebar';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMainProductPage = pathname === '/products';

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {isMainProductPage && (
            <div className="md:col-span-1">
              <ProductSidebar />
            </div>
          )}
          <main className={isMainProductPage ? "md:col-span-3" : "md:col-span-4"}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}