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
        <div className="relative md:h-auto">
            <Image
                src={solution.image}
                alt={solution.title || ''}
                className="object-cover"
                width={800}
                height={500}
                loading="lazy"
            />
        </div>
        <div className="p-6 w-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
                {solution.title}
            </h3>
            <p className="text-gray-600 mb-6 text-[12px] leading-relaxed">
                {solution.description}
            </p>
        </div>
    </>
);

// Tách StandardSolutionItem thành component riêng
const StandardSolutionItem = ({ solution }: { solution: Solution }) => (
    <>
        {/* Phần bên trái: Thông tin và nút Load More */}
        <div className="p-6 md:w-1/2 flex flex-col w-[550px] justify-center">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
                {solution.title}
            </h3>
            <p className="text-gray-600 mb-6 text-[12px] leading-relaxed">
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
        <div className="md:w-1/2 relative h-64 md:h-auto flex-1">
            <Image
                src={solution.image}
                alt={solution.title || ''}
                className="object-cover"
                width={450}
                height={200}
                loading="lazy"
            />
        </div>
    </>
);

// SolutionItem component sử dụng các components con
const SolutionItem = ({ solution, isDataSolutionPage }: { solution: Solution, isDataSolutionPage: boolean }) => (
    <div className={`flex ${isDataSolutionPage ? 'flex-col' : 'flex-row'} items-center gap-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300`}>
        {isDataSolutionPage ? (
            <DataCenterSolutionItem solution={solution} />
        ) : (
            <StandardSolutionItem solution={solution} />
        )}
    </div>
);

// Component LoadingState tách riêng
const LoadingState = () => (
    <div className="mb-24 px-6">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Loading Solutions...</h1>
        {[1, 2, 3].map((item) => (
            <div key={item} className="mb-10 h-64 animate-pulse bg-gray-100 rounded-lg"></div>
        ))}
    </div>
);

// Component EmptyState tách riêng
const EmptyState = () => (
    <div className="mb-24 px-6">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Solutions</h1>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-gray-600">No solutions available in this category.</p>
        </div>
    </div>
);

// Component hiển thị related products
const RelatedProducts = React.memo(({ products }: { products?: RelatedProduct[] }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Sản phẩm liên quan</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <Link
                        key={product.id}
                        href={product.href || '#'}
                        className="flex flex-col bg-white rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
                    >
                        <div className="h-40 mb-3 relative">
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="object-contain"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <h5 className="font-medium text-green-600">{product.title}</h5>
                        {product.features && (
                            <div className="flex flex-wrap gap-1 my-2">
                                {product.features.slice(0, 2).map((feature: string, index: number) => (
                                    <span key={index} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        )}
                        {product.description && (
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
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
        <div className="mb-24 px-6">
            <h1 className="text-3xl font-bold mb-10 text-gray-800">
                {activeCategory + ' Solutions'}
            </h1>

            <div className="space-y-12">
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