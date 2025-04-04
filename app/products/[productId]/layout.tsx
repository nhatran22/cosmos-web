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
            '690decb0-8865-4262-a70d-cbebed9ebae7',
            '23d693a0-6d6a-4eb5-a3a7-03ff4286d06f',
            'c7c6cdc7-b8dd-4aa3-9051-612f62b69e8c',
            '3f45dcbb-d574-47e5-8d36-1b99fea015db',
            '2e3bae2e-fd06-42b6-9854-727809131045',
            '79a477d1-dbea-4ffd-b159-374fc2e57c52',
            '3eead92d-c45b-4077-80c6-1a43d155303d',
            'ef6f5173-33b2-4a11-afeb-662ce792cff3',
            '131055bc-e0f3-471c-b379-9f2d92f1814d',
            'f3733c40-a2f7-4c09-ad7f-73e53c2083a3',
            'e3c60e1e-32f7-4ca4-a139-c7c0aaf87453',
            'f64cb2a8-c930-4e67-844e-84d7fb623258',
            'ac8fc775-6d3d-4507-93bb-4244ccd5307f',
            '51439434-a043-4978-b7a2-d404db15d27d',
            '0d096565-a1a2-4920-9a6b-68789b0e8bd2',
            'a4aee5e4-c8b4-4cbb-8fc7-57ef2d0e39b2',
            '9c8380b9-1b49-4277-baea-f3006d24b4f7',
            'a697ee30-717f-42f7-8407-466dd2e98104',
            '181bf365-57b8-4796-82ae-0bbbc4c4081c',
            'b804140e-a6e9-4218-844e-6e1f5be3f776'
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