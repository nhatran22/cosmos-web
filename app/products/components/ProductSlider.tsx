'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IProductListItem } from '@/app/interface/product';

interface ProductSliderProps {
    products: IProductListItem[];
    isParentCategory: boolean;
}

export default function ProductSlider({ products, isParentCategory }: ProductSliderProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const productsPerPage = 3;
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Memoize handlePageChange để tối ưu hiệu suất
    const handlePageChange = useCallback((newPage: number) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }, 300);
    }, [isTransitioning]);

    // Auto-rotate - sửa lại thời gian thành 3000ms (3 giây)
    useEffect(() => {
        if (isPaused || totalPages <= 1) return; // Không cần auto-rotate nếu chỉ có 1 trang

        const timer = setInterval(() => {
            handlePageChange((currentPage + 1) % totalPages);
        }, 3000);

        return () => clearInterval(timer);
    }, [currentPage, totalPages, handlePageChange, isPaused]);

    // Lấy sản phẩm của trang hiện tại
    const currentProducts = products.slice(
        currentPage * productsPerPage,
        (currentPage * productsPerPage) + productsPerPage
    );

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
        <div
            className="relative pl-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}
            >
                {currentProducts.map(product => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="relative h-48 mb-4 overflow-hidden rounded-md justify-center">
                            <Image
                                src={product.image!}
                                alt={product.name || product.description!}
                                width={200}
                                height={150}
                                className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                        {product.description && (<p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>)}

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

            {/* Pagination indicator với trạng thái hiện tại */}
            {totalPages >= 2 && (
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-125 ${index === currentPage ? 'bg-green-500 scale-110' : 'bg-gray-300'
                                    }`}
                                onClick={() => handlePageChange(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 