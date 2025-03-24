"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { RelatedProduct } from '@/app/interface/solutions';

// Import type từ interface chung

export function RelatedProductsCarousel({ products }: { products: RelatedProduct[] }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const totalPages = Math.ceil(products.length / 2);
    const productsPerPage = 2;

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

    // Auto-rotate every 3 seconds
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            handlePageChange((currentPage + 1) % totalPages);
        }, 3000);

        return () => clearInterval(timer);
    }, [currentPage, totalPages, handlePageChange, isPaused]);

    // Get current products to display
    const currentProducts = products.slice(
        currentPage * productsPerPage,
        (currentPage * productsPerPage) + productsPerPage
    );

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
                    }`}
            >
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 h-[350px]"
                    >
                        <div className="flex flex-row h-full items-center">
                            <div className="p-6 flex flex-col">
                                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                                <div className="mb-4">
                                    {product.features.map((feature: string, idx: number) => (
                                        <span key={idx} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-[12px] mb-4 flex-1">{product.description}</p>
                                <a
                                    href={`/products/${product.slug}`}
                                    className="text-blue-600 hover:underline font-medium inline-flex items-center mt-auto"
                                >
                                    Learn more →
                                </a>
                            </div>
                            <div className="relative">
                                <Image
                                    src={product.image}
                                    alt={product.title || ''}
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                />
                            </div>
                        </div>
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