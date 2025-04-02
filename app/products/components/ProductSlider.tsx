'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IProductListItem } from '@/app/interface/product';

interface ProductSliderProps {
    products: IProductListItem[];
    isParentCategory: boolean;
    onTabClose?: () => void;
}

export default function ProductSlider({ products, isParentCategory, onTabClose }: ProductSliderProps) {
    const [currentProducts, setCurrentProducts] = useState<IProductListItem[]>(products);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const productsPerPage = 3;
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);

    // Reset products khi props.products thay đổi
    useEffect(() => {
        setCurrentProducts(products);
    }, [products]);

    // Xử lý khi tab đóng
    useEffect(() => {
        if (onTabClose) {
            // Đăng ký event listener
            const handleTabClose = () => {
                setCurrentProducts([]);
                onTabClose();
            };

            return () => {
                // Cleanup khi component unmount
                setCurrentProducts([]);
            };
        }
    }, [onTabClose]);

    // Xử lý khi nhấn Load More hoặc View Detail
    const handleButtonClick = (product: IProductListItem) => {
        if (isParentCategory) {
            // Load More - redirect to subcategory
            // Sử dụng tên sản phẩm thay vì ID
            const subcategoryName = product.name;
            const url = `/products?category=${product.catalogue!}&subcategory=${product.id}`;
            router.push(url);
        } else {
            // View Detail - redirect to product detail
            const url = `/products/${product.id}`;
            router.push(url);
        }
    };

    return (
        <div className="relative w-full">
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
                    }`}
            >
                {currentProducts.map(product => (
                    <div
                        key={product.id}
                        className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 aspect-[3/4]"
                    >
                        <div className="relative w-full h-[300px] mb-4 overflow-hidden rounded-md bg-gray-50">
                            <div className="relative w-full h-full flex items-center justify-center p-6">
                                <Image
                                    src={product.image!}
                                    alt={product.name || product.description!}
                                    fill
                                    className="object-contain rounded-md hover:scale-105 transition-transform duration-300"
                                    sizes={isParentCategory
                                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    }
                                    style={{ objectFit: 'contain', minWidth: '85%', minHeight: '85%' }}
                                    priority
                                />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                        {!product.catalogue && (
                            <p className={`text-gray-600 text-sm line-clamp-2 mb-4 ${isParentCategory ? 'h-8' : 'h-10'
                                }`}>
                                {product.description}
                            </p>
                        )}

                        <button
                            onClick={() => handleButtonClick(product)}
                            className={`px-4 py-2 rounded-md text-white transition-colors w-full text-center ${isParentCategory
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {isParentCategory ? 'Load More' : 'View Detail'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
} 