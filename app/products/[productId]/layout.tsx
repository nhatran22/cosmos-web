// Server Component

import { ProductAPI } from '@/app/services/api';

// Thiết lập cấu hình dynamic cho route này
export const dynamicParams = false;
export const dynamic = 'auto';

// Hàm này sẽ được sử dụng khi output là 'export'
export async function generateStaticParams() {
    try {
        // Hardcode các ID sản phẩm cụ thể cần thiết
        const staticProductIds = [
            '6c6acd4a-e7a3-4aad-a98e-bc18a2439c4f',
        ];

        return staticProductIds.map(id => ({
            productId: id
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [
            { productId: '6c6acd4a-e7a3-4aad-a98e-bc18a2439c4f' }
        ];
    }
}

export function generateMetadata() {
    return {
        title: 'Product Detail | Cosmos',
        description: 'Product details',
    };
}

export default function ProductDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="product-detail-layout">
            {children}
        </div>
    );
} 