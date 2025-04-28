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
    buttonType?: 'loadMore' | 'viewDetail';
    onButtonClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isRepresentative = false,
    buttonType = 'loadMore',
    onButtonClick
}) => {
    // Đảm bảo href luôn có giá trị
    const productHref = product.href || '/products';

    // Xử lý sự kiện click trên button
    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onButtonClick) {
            onButtonClick();
        }
    };

    // Placeholder image cho khi ảnh đang tải
    const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJZ5InzgAAAABJRU5ErkJggg==";

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden bg-gray-100">
                <Image
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    fill
                    className="object-contain p-2 md:p-4 w-full h-full"
                    priority={isRepresentative} // Tải ưu tiên cho sản phẩm quan trọng
                    loading="eager" // Tải ngay lập tức thay vì lazy loading
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                />
            </div>

            <div className="p-3 sm:p-4 md:p-5">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800 line-clamp-2">
                    {product.name}
                </h2>

                {buttonType !== 'loadMore' && (product.shortDescription || product.description) && (
                    <p className="text-gray-600 mb-3 md:mb-4 text-xs sm:text-sm line-clamp-2">
                        {product.shortDescription || product.description}
                    </p>
                )}

                <button
                    onClick={handleButtonClick}
                    className={`inline-flex items-center justify-center px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-white rounded-md transition-colors text-xs sm:text-sm font-medium ${buttonType === 'loadMore'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {buttonType === 'loadMore' ? 'Load More' : 'View Detail'}
                    <svg className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductCard; 