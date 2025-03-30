'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IProduct } from '@/app/services/api';

interface ProductSliderProps {
    products: IProduct[];
    isParentCategory: boolean;
}

export default function ProductSlider({ products, isParentCategory }: ProductSliderProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const router = useRouter();

    // Log khi component được render
    useEffect(() => {
        return () => {
        };
    }, [products.length, isParentCategory]);

    const productsPerPage = 3;
    const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));

    // Hàm chuyển trang
    const goToPage = useCallback((pageIndex: number) => {
        const newIndex = (pageIndex + totalPages) % totalPages;
        setCurrentPage(newIndex);
    }, [totalPages]);

    // Xử lý auto-play
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            goToPage(currentPage + 1);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [autoPlay, currentPage, goToPage]);

    // Lấy sản phẩm của trang hiện tại
    const currentProducts = products.slice(
        currentPage * productsPerPage,
        Math.min((currentPage + 1) * productsPerPage, products.length)
    );

    // Xử lý khi nhấn Load More hoặc View Detail
    const handleButtonClick = (product: IProduct) => {
        if (isParentCategory) {
            // Load More - redirect to subcategory
            const url = `/products?category=${encodeURIComponent(product.catalogue)}&subcategory=${encodeURIComponent(product.categoryId)}`;
            router.push(url);
        } else {
            // View Detail - redirect to product detail
            const url = `/products/${product.id}`;
            router.push(url);
        }
    };

    // Dừng autoplay khi hover vào slider
    const handleMouseEnter = () => {
        setAutoPlay(false);
    }

    const handleMouseLeave = () => {
        setAutoPlay(true);
    }

    return (
        <div
            className="relative py-8"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Hiển thị sản phẩm */}
            <div
                className="transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentProducts.map(product => (
                        <div
                            key={product.id}
                            className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                                <Image
                                    src={product.image || '/images/placeholder.jpg'}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/images/placeholder.jpg';
                                    }}
                                    onLoad={() => {
                                    }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>

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

            {/* Navigation arrows */}
            {totalPages > 1 && (
                <>
                    <button
                        onClick={() => {
                            setAutoPlay(false);
                            goToPage(currentPage - 1);
                            setTimeout(() => setAutoPlay(true), 5000);
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>

                    <button
                        onClick={() => {
                            setAutoPlay(false);
                            goToPage(currentPage + 1);
                            setTimeout(() => setAutoPlay(true), 5000);
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                </>
            )}

            {/* Pagination dots */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setAutoPlay(false);
                                goToPage(index);
                                setTimeout(() => setAutoPlay(true), 5000);
                            }}
                            className={`w-3 h-3 rounded-full transition-colors ${currentPage === index ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 