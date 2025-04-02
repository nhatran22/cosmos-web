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
            '9998574e-ac7d-4c00-915d-b7115e6593f8',
            '5d5853ba-2d81-4950-8947-be50fe6e9cd5',
            '81ea69a7-9f08-40b1-ad5a-9961144866f6',
            'cb628a80-95be-4622-9df6-b76e87bb7ea6',
            '690decb0-8865-4262-a70d-cbebed9ebae7'
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