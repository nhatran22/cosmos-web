'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/components/mock/header-navigation';
import { useSearchParams } from 'next/navigation';

// Solution data structure
interface Solution {
    id: string;
    title?: string;
    description: string;
    image: string;
    href: string;
    category: string;
}

// Tab interface
interface Tab {
    id: string;
    label: string;
    category: string;
}

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
                href={solution.href}
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

// Các dữ liệu giải pháp cố định
const SOLUTIONS_DATA = {
    'Data Center Critical Infrastructure': [
        {
            id: 'data-center',
            description: 'The key infrastructure system solution for the data center adopts a modular, prefabricated, and intelligent design concept. It efficiently integrates and integrates power supply and distribution systems, UPS power supply systems, intelligent temperature control systems, cabinet systems, closed channel systems, dynamic and environmental monitoring systems, and is equipped with various environmental data sampling sensors for unified monitoring and management, achieving automatic control, intelligent operation and maintenance, and improving the reliability of the data center Availability and maintainability.',
            image: '/solutions/data-center-solution.png',
            href: '/solutions/data-center',
            category: 'Data Center Critical Infrastructure'
        }
    ],
    'New Energy Storage System': [
        {
            id: 'residential-storage',
            title: 'Household Hybrid Inverter',
            description: 'ACwatt household energy storage solutions include "energy storage converter energy storage battery" as complete solution, with a variety of energy storage converter and battery products, suitable for new optical storage power station, the original household grid system transformation or no (weak) grid areas. Acwatt household energy storage solution realizes a higher proportion of green electricity for self-use and reduces electricity',
            image: '/solutions/household-hybrid.png',
            href: '/solutions/residential-storage',
            category: 'New Energy Storage System'
        },
        {
            id: 'commercial-storage',
            title: 'Industrial and Commercial Hybrid Inverter',
            description: 'ACwatt industrial and commercial roofs include not only standard industrial and commercial roofs such as factory roofs, supermarkets and office buildings, but also party and government organs (courts, government buildings, etc.), roofs of public buildings (schools, hospitals, stations, etc.) and some application scenarios of "photovoltaic energy storage". The industrial and commercial roof area is large, the electricity consumption of users is large and the electricity price is relatively high. The return on',
            image: '/solutions/industrial-hybrid.png',
            href: '/solutions/commercial-storage',
            category: 'New Energy Storage System'
        }
    ]
};

// Danh sách tabs
const TABS: Tab[] = [
    {
        id: 'data-center',
        label: 'Data Center Critical Infrastructure',
        category: 'Data Center Critical Infrastructure'
    },
    {
        id: 'energy-storage',
        label: 'New Energy Storage System',
        category: 'New Energy Storage System'
    }
];

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

    // Xử lý thay đổi tab
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        const selectedTab = TABS.find(tab => tab.id === tabId);
        if (selectedTab) {
            setActiveCategory(selectedTab.category);
        }
    };

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

                // Lấy từ dữ liệu cố định thay vì tính toán mỗi lần render
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