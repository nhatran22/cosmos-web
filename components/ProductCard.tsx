import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        href?: string;
        image?: string;
        subcategoryName?: string;
        shortDescription?: string;
        description?: string;
    };
    isRepresentative?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isRepresentative = false }) => {
    // Đảm bảo href luôn có giá trị
    const productHref = product.href || '/products';

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                {/* Sử dụng div thay vì Image vì chúng ta đang mock image */}
                <div
                    className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400"
                    style={{ backgroundImage: `url(${product.image || '/images/placeholder.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <span>{!product.image && 'Hình ảnh sản phẩm'}</span>
                </div>
            </div>

            <div className="p-5">
                {isRepresentative && product.subcategoryName && (
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                        {product.subcategoryName}
                    </h3>
                )}

                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {product.name}
                </h2>

                {(product.shortDescription || product.description) && (
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {product.shortDescription || product.description}
                    </p>
                )}

                <Link
                    href={productHref}
                    className="inline-flex items-center justify-center px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                >
                    Xem chi tiết
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard; 