'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/components/mock/header-navigation';
import { useSearchParams } from 'next/navigation';

// Solution data structure
interface Solution {
    id: string;
    title: string;
    description: string;
    image: string;
    href: string;
    category: string;
}

// Component cho Solution Item theo yêu cầu mới: hiển thị bên trái là thông tin, bên phải là hình ảnh
const SolutionItem = ({ solution }: { solution: Solution }) => (
    <div className="flex flex-col md:flex-row gap-6 mb-12 border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
        {/* Phần bên trái: Thông tin và nút Load More */}
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {solution.title}
            </h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
                {solution.description}
            </p>
            <Link
                href={solution.href}
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors group w-fit"
            >
                <span className="font-medium mr-2">View Details</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        {/* Phần bên phải: Hình ảnh */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
            <Image
                src={solution.image || "/placeholder-solution.png"}
                alt={solution.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
            />
        </div>
    </div>
);

export default function SolutionsPage() {
    const searchParams = useSearchParams();
    const [allSolutions, setAllSolutions] = useState<Solution[]>([]);
    const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Lấy danh sách giải pháp từ navigation
    useEffect(() => {
        setIsLoading(true);

        const solutions: Solution[] = [];

        // Lấy danh sách giải pháp từ navigation
        const solutionNav = navigation.find(item => item.name === 'Solution');

        if (solutionNav?.submenu) {
            // Duyệt qua các danh mục giải pháp
            solutionNav.submenu.forEach(category => {
                // Xử lý cho từng danh mục
                if (category.title === 'Data Center Critical Infrastructure' && category.items) {
                    solutions.push({
                        id: 'data-center',
                        title: 'Intelligent Modular Data Center',
                        description: 'Smart, modular data center solution with high performance, easy scalability, and energy efficiency. Our modular data center infrastructure provides a comprehensive solution for businesses looking to build efficient, scalable, and resilient IT environments. With advanced cooling technologies, integrated power management, and intelligent monitoring systems, our solution ensures optimal performance and reliability for mission-critical operations.',
                        image: '/images/data-center.jpg',
                        href: '/solutions/data-center',
                        category: category.title
                    });
                }

                if (category.title === 'New Energy Storage System' && category.items) {
                    solutions.push({
                        id: 'residential-storage',
                        title: 'Residential Storage Hybrid Inverter',
                        description: 'Residential energy storage solution with hybrid inverter, optimizing solar energy utilization and providing backup power. Our residential storage systems are designed for homeowners seeking energy independence and reduced electricity bills. By integrating seamlessly with solar installations, these systems store excess energy during the day for use during peak hours or power outages, ensuring continuous power supply and maximum energy efficiency.',
                        image: '/images/residential-storage.jpg',
                        href: '/solutions/residential-storage',
                        category: category.title
                    });

                    solutions.push({
                        id: 'commercial-storage',
                        title: 'Industrial & Commercial Storage',
                        description: 'Energy storage system for businesses and industrial facilities, optimizing electricity costs and ensuring continuous operation. Our industrial and commercial storage solutions help businesses manage energy costs, improve grid stability, and ensure operational continuity. With scalable capacity and advanced energy management systems, these solutions provide peak shaving, load shifting, and emergency backup capabilities that reduce operational expenses while supporting sustainability goals.',
                        image: '/images/commercial-storage.jpg',
                        href: '/solutions/commercial-storage',
                        category: category.title
                    });

                    solutions.push({
                        id: 'utility-storage',
                        title: 'Utility-Scale Storage',
                        description: 'Large-scale energy storage solutions for power plants and grids, supporting renewable energy integration and grid stability. Our utility-scale storage systems are designed to address the challenges of grid modernization and renewable energy integration. These large-capacity solutions provide frequency regulation, renewable energy time-shifting, and grid stabilization services that enhance the reliability and efficiency of power distribution networks while facilitating the transition to cleaner energy sources.',
                        image: '/images/utility-storage.jpg',
                        href: '/solutions/utility-scale-storage',
                        category: category.title
                    });
                }
            });
        }

        setAllSolutions(solutions);

        // Lấy category từ URL (nếu có)
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setActiveCategory(categoryParam);
            const filtered = solutions.filter(solution => solution.category === categoryParam);
            setFilteredSolutions(filtered);
        } else {
            setFilteredSolutions(solutions);
        }

        setIsLoading(false);
    }, [searchParams]);

    // Xử lý khi có sự kiện thay đổi category
    useEffect(() => {
        const handleCategoryChange = (event: CustomEvent) => {
            const selectedCategory = event.detail;
            setActiveCategory(selectedCategory);

            const filtered = allSolutions.filter(solution =>
                solution.category === selectedCategory
            );

            setFilteredSolutions(filtered);
        };

        window.addEventListener('solutionCategorySelected', handleCategoryChange as EventListener);

        return () => {
            window.removeEventListener('solutionCategorySelected', handleCategoryChange as EventListener);
        };
    }, [allSolutions]);

    // Display loading state
    if (isLoading) {
        return (
            <div className="mb-24 px-6">
                <h1 className="text-3xl font-bold mb-10 text-gray-800">Loading Solutions...</h1>
                {[1, 2, 3].map((item) => (
                    <div key={item} className="mb-10 h-64 animate-pulse bg-gray-100 rounded-lg"></div>
                ))}
            </div>
        );
    }

    // Display message if no solutions
    if (filteredSolutions.length === 0) {
        return (
            <div className="mb-24 px-6">
                <h1 className="text-3xl font-bold mb-10 text-gray-800">Solutions</h1>
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-gray-600">No solutions available in this category.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-24 px-6">
            <h1 className="text-3xl font-bold mb-10 text-gray-800">
                {activeCategory || "Cosmos Solutions"}
            </h1>

            <div className="space-y-12">
                {filteredSolutions.map((solution) => (
                    <SolutionItem key={solution.id} solution={solution} />
                ))}
            </div>
        </div>
    );
} 