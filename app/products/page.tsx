import { Suspense } from 'react';
import { ProductProvider } from './contexts/ProductContext';
import ProductList from './components/ProductList';
import { QueryClientProvider } from './providers/QueryClientProvider';

export const metadata = {
    title: 'Products | Cosmos',
    description: 'Browse our selection of products',
};

export default function ProductsPage() {
    return (
        <QueryClientProvider>
            <ProductProvider>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex !w-full">
                        <Suspense fallback={
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {Array(3).fill(0).map((_, i) => (
                                        <div key={i} className="bg-gray-100 rounded-lg p-4 h-80">
                                            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                                            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                                            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }>
                            <ProductList />
                        </Suspense>
                    </div>
                </div>
            </ProductProvider>
        </QueryClientProvider>
    );
}

// Thay đổi cấu hình để hoạt động với static export
export const dynamic = 'auto';  // Thay vì 'error'
export const dynamicParams = false; // Không xử lý params động ở server
export const generateStaticParams = () => []; // Static params trống
export const revalidate = false; 