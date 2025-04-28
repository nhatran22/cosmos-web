'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { RelatedProduct, Solution } from '@/app/interface/solutions';
import { SOLUTIONS_DATA, TABS } from '@/data/solution-data';

// Tách DataCenterSolutionItem thành component riêng
const DataCenterSolutionItem = ({ solution }: { solution: Solution }) => (
    <>
        <div className="relative w-full h-[200px] md:h-[400px]">
            <Image
                src={solution.image}
                alt={solution.title || ''}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                loading="lazy"
            />
        </div>
        <div className="p-4 md:p-6 w-full flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-green-600">
                {solution.title}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {solution.description}
            </p>
        </div>
    </>
);

// Tách StandardSolutionItem thành component riêng
const StandardSolutionItem = ({ solution }: { solution: Solution }) => (
    <>
        {/* Phần bên trái: Thông tin và nút Load More */}
        <div className="p-4 md:p-6 w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-green-600">
                {solution.title}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {solution.description}
            </p>
            <Link
                href={solution.href || '#'}
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors group w-fit"
            >
                <span className="font-medium mr-2">Load More</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        {/* Phần bên phải: Hình ảnh */}
        <div className="w-full md:w-1/2 relative h-[200px] md:h-[300px]">
            <Image
                src={solution.image}
                alt={solution.title || ''}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                loading="lazy"
            />
        </div>
    </>
);

// SolutionItem component sử dụng các components con
const SolutionItem = ({ solution, isDataSolutionPage }: { solution: Solution, isDataSolutionPage: boolean }) => (
    <div className={`flex flex-col ${isDataSolutionPage ? '' : 'md:flex-row'} items-center gap-4 md:gap-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300`}>
        {isDataSolutionPage ? (
            <DataCenterSolutionItem solution={solution} />
        ) : (
            <StandardSolutionItem solution={solution} />
        )}
    </div>
);

// Component LoadingState tách riêng
const LoadingState = () => (
    <div className="mb-16 md:mb-24 px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-800">Loading Solutions...</h1>
        {[1, 2, 3].map((item) => (
            <div key={item} className="mb-6 md:mb-10 h-40 md:h-64 animate-pulse bg-gray-100 rounded-lg"></div>
        ))}
    </div>
);

// Component EmptyState tách riêng
const EmptyState = () => (
    <div className="mb-16 md:mb-24 px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-800">Solutions</h1>
        <div className="bg-gray-100 p-4 md:p-8 rounded-lg text-center">
            <p className="text-gray-600">No solutions available in this category.</p>
        </div>
    </div>
);

// Component hiển thị related products
const RelatedProducts = React.memo(({ products }: { products?: RelatedProduct[] }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50 rounded-lg">
            <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800">Sản phẩm liên quan</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {products.map(product => (
                    <Link
                        key={product.id}
                        href={product.href || '#'}
                        className="flex flex-col bg-white rounded-lg shadow-sm p-3 md:p-4 transition-all hover:shadow-md"
                    >
                        <div className="h-32 md:h-40 mb-2 md:mb-3 relative">
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="object-contain"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <h5 className="font-medium text-green-600 text-sm md:text-base">{product.title}</h5>
                        {product.features && (
                            <div className="flex flex-wrap gap-1 my-1 md:my-2">
                                {product.features.slice(0, 2).map((feature: string, index: number) => (
                                    <span key={index} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        )}
                        {product.description && (
                            <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">{product.description}</p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
});

RelatedProducts.displayName = 'RelatedProducts';

export default function SolutionsPage() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [activeTab, setActiveTab] = useState<string>(TABS[0]?.id || '');

    // Memoize categoryParam để tránh tính toán lại
    const categoryParam = useMemo(() => searchParams.get('category'), [searchParams]);
    const isDataSolutionPage = useMemo(() => {
        const currentTab = TABS.find(tab => tab.id === activeTab);
        return currentTab?.category === 'Data Center Critical Infrastructure';
    }, [activeTab]);


    // Sử dụng useMemo để tối ưu việc lọc giải pháp
    const filteredSolutions = useMemo(() => {
        const currentTab = TABS.find(tab => tab.id === activeTab);
        if (!currentTab) return [];
        return solutions.filter(solution => solution.category === currentTab.category);
    }, [solutions, activeTab]);

    // Xử lý lấy dữ liệu giải pháp
    useEffect(() => {
        const fetchSolutions = () => {
            setIsLoading(true);

            try {
                const allSolutions: Solution[] = [];

                // Lấy từ dữ liệu cố định từ SOLUTIONS_DATA
                Object.values(SOLUTIONS_DATA).forEach(categoryItems => {
                    allSolutions.push(...categoryItems);
                });

                setSolutions(allSolutions);

                // Nếu có category param, thiết lập tab phù hợp
                if (categoryParam) {
                    const tabForCategory = TABS.find(tab => tab.category === categoryParam);
                    if (tabForCategory) {
                        setActiveTab(tabForCategory.id);
                        setActiveCategory(categoryParam);
                    }
                } else {
                    // Mặc định là tab đầu tiên
                    setActiveTab(TABS[0]?.id || '');
                    setActiveCategory(TABS[0]?.category || null);
                }

            } catch (error) {
                console.error('Error fetching solutions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSolutions();
    }, [categoryParam]);

    // Xử lý sự kiện thay đổi category
    useEffect(() => {
        const handleCategoryChange = (event: CustomEvent) => {
            const selectedCategory = event.detail;
            setActiveCategory(selectedCategory);

            // Tìm tab phù hợp với category
            const tabForCategory = TABS.find(tab => tab.category === selectedCategory);
            if (tabForCategory) {
                setActiveTab(tabForCategory.id);
            }
        };

        window.addEventListener('solutionCategorySelected', handleCategoryChange as EventListener);
        return () => {
            window.removeEventListener('solutionCategorySelected', handleCategoryChange as EventListener);
        };
    }, []);

    // Hiển thị trạng thái loading
    if (isLoading) {
        return <LoadingState />;
    }

    // Hiển thị thông báo nếu không có giải pháp
    if (filteredSolutions.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="mb-16 md:mb-24 px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-800">
                {activeCategory + ' Solutions'}
            </h1>

            <div className="space-y-6 md:space-y-12">
                {filteredSolutions.map((solution) => (
                    <SolutionItem
                        key={solution.id}
                        solution={solution}
                        isDataSolutionPage={isDataSolutionPage}
                    />
                ))}
            </div>
        </div>
    );
} 