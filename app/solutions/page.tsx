'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { navigation } from '@/components/mock/header-navigation';

// Display 3 solutions per page
const ITEMS_PER_PAGE = 3;

// Solution data structure
interface Solution {
    id: string;
    title: string;
    description: string;
    image: string;
    href: string;
}

export default function SolutionsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [allSolutions, setAllSolutions] = useState<Solution[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [categoryTitle, setCategoryTitle] = useState('');
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const [paused, setPaused] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate solutions to display on current page
    const currentSolutions = allSolutions.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage * ITEMS_PER_PAGE) + ITEMS_PER_PAGE
    );

    // Get solution categories from navigation
    const solutionCategories = navigation.find(item => item.name === 'Solution')?.submenu || [];

    // Function to change page with animation
    const goToPage = useCallback((pageIndex: number) => {
        if (isAnimating) return; // Prevent page change during animation

        setIsAnimating(true);

        // Determine slide direction
        if (pageIndex < 0) {
            setSlideDirection('left');
            setTimeout(() => {
                setCurrentPage(totalPages - 1);
            }, 300); // Wait for slide out animation to complete before changing page
        } else if (pageIndex >= totalPages) {
            setSlideDirection('right');
            setTimeout(() => {
                setCurrentPage(0);
            }, 300);
        } else {
            // Determine direction based on current and target page
            setSlideDirection(pageIndex > currentPage ? 'right' : 'left');
            setTimeout(() => {
                setCurrentPage(pageIndex);
            }, 300);
        }

        // End animation
        setTimeout(() => {
            setIsAnimating(false);
        }, 600); // Total animation duration
    }, [totalPages, currentPage, isAnimating]);

    // Function to go to next page
    const goToNextPage = useCallback(() => {
        goToPage(currentPage + 1);
    }, [currentPage, goToPage]);

    // Function to go to previous page
    const goToPrevPage = useCallback(() => {
        goToPage(currentPage - 1);
    }, [currentPage, goToPage]);

    // Handle automatic page transition
    useEffect(() => {
        // Only auto-transition when there are more than 1 page of solutions
        if (!paused && !isAnimating && totalPages > 1) {
            autoPlayRef.current = setInterval(() => {
                goToNextPage();
            }, 5000); // 5 seconds per transition
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [goToNextPage, paused, isAnimating, totalPages]);

    // Handle category change event listening
    useEffect(() => {
        const handleCategoryChange = (event: CustomEvent) => {
            setSelectedCategory(event.detail);
        };

        window.addEventListener('solutionCategorySelected', handleCategoryChange as EventListener);

        // Set initial category if not set yet
        if (!selectedCategory && solutionCategories.length > 0) {
            setSelectedCategory(solutionCategories[0].title);
            updateSolutions(solutionCategories[0].title);
        }

        return () => {
            window.removeEventListener('solutionCategorySelected', handleCategoryChange as EventListener);
        };
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            updateSolutions(selectedCategory);
            // Reset to first page when changing category
            setCurrentPage(0);
        }
    }, [selectedCategory]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);

        // Lưu category đã chọn vào localStorage để solution-sidebar có thể sử dụng
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedSolutionCategory', category);
        }
    };

    const updateSolutions = useCallback((category: string) => {
        const solutions: Solution[] = [];
        let title = '';

        if (category === 'Data Center Critical Infrastructure') {
            title = 'Data Center Solutions';
            solutions.push({
                id: 'data-center',
                title: 'Intelligent Modular Data Center',
                description: 'Smart, modular data center solution with high performance, easy scalability, and energy efficiency.',
                image: '/images/data-center.jpg',
                href: '/solutions/data-center'
            });
        }
        else if (category === 'New Energy Storage System') {
            title = 'Energy Storage Solutions';

            solutions.push({
                id: 'residential-storage',
                title: 'Residential Storage',
                description: 'Residential energy storage solution with hybrid inverter, optimizing solar energy utilization and providing backup power.',
                image: '/images/residential-storage.jpg',
                href: '/solutions/residential-storage'
            });

            solutions.push({
                id: 'commercial-storage',
                title: 'Commercial & Industrial Storage',
                description: 'Energy storage system for businesses and industrial facilities, optimizing electricity costs and ensuring continuous operation.',
                image: '/images/commercial-storage.jpg',
                href: '/solutions/commercial-storage'
            });

            solutions.push({
                id: 'utility-storage',
                title: 'Utility-Scale Storage',
                description: 'Large-scale energy storage solutions for power plants and grids, supporting renewable energy integration and grid stability.',
                image: '/images/utility-storage.jpg',
                href: '/solutions/utility-scale-storage'
            });
        }

        setAllSolutions(solutions);
        setCategoryTitle(title);
        setCurrentPage(0);
        setTotalPages(Math.ceil(solutions.length / ITEMS_PER_PAGE));
    }, []);

    // Pause auto-transition when user interacts
    const handleUserInteraction = () => {
        setPaused(true);
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }

        // After 30 seconds of no interaction, resume auto-transition
        setTimeout(() => {
            setPaused(false);
        }, 30000);
    };

    // Define CSS class for animation effect
    const getSlideClass = () => {
        if (!isAnimating) return '';

        return slideDirection === 'right'
            ? 'animate-slide-out-left'
            : 'animate-slide-out-right';
    };

    // Display message if no solutions
    if (allSolutions.length === 0 && selectedCategory) {
        return (
            <div className="container mx-auto px-4 py-8 mb-24">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Solutions</h1>

                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {solutionCategories.map((category) => (
                                <button
                                    key={category.title}
                                    onClick={() => handleCategorySelect(category.title)}
                                    className={`${selectedCategory === category.title
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-gray-600">No solutions found in this category.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mb-24">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Solutions</h1>

            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {solutionCategories.map((category) => (
                            <button
                                key={category.title}
                                onClick={() => handleCategorySelect(category.title)}
                                className={`${selectedCategory === category.title
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">{categoryTitle}</h2>

            <div className="py-8 relative overflow-hidden" onMouseEnter={handleUserInteraction}>
                <div className={`grid grid-rows-1 md:grid-cols-1 gap-8 transition-all duration-300 ${getSlideClass()}`}>
                    {currentSolutions.map((solution, index) => (
                        <Link
                            key={solution.id}
                            href={solution.href}
                            className="group"
                        >
                            <div className=" flex flex-row items-center gap-y-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-5px] h-[250px]">
                                <div className="p-5 flex flex-col flex-grow w-[100px]">
                                    <h3 className="text-xl text-blue-600 font-semibold mb-1 group-hover:text-blue-500 line-clamp-2 min-h-[56px]">
                                        {solution.title}
                                    </h3>
                                    <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                                        {solution.description}
                                    </p>
                                    <div className="flex items-center text-blue-600 group-hover:text-blue-500 transition-colors mt-auto">
                                        <span className="font-medium">Learn More</span>
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                                <div className="h-60 relative overflow-hidden flex-1">
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300">
                                        <img
                                            src={solution.image}
                                            alt={solution.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10 items-center">
                        <button
                            onClick={goToPrevPage}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-100 transition-colors mr-2"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center mx-1 ${currentPage === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                                    } transition-colors`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={goToNextPage}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-blue-100 transition-colors ml-2"
                        >
                            <ArrowRight className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes slideOutLeft {
                  0% { transform: translateX(0); opacity: 1; }
                  100% { transform: translateX(-10%); opacity: 0; }
                }
                
                @keyframes slideOutRight {
                  0% { transform: translateX(0); opacity: 1; }
                  100% { transform: translateX(10%); opacity: 0; }
                }
                
                @keyframes slideInLeft {
                  0% { transform: translateX(10%); opacity: 0; }
                  100% { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideInRight {
                  0% { transform: translateX(-10%); opacity: 0; }
                  100% { transform: translateX(0); opacity: 1; }
                }
                
                .animate-slide-out-left {
                  animation: slideOutLeft 0.3s forwards;
                }
                
                .animate-slide-out-right {
                  animation: slideOutRight 0.3s forwards;
                }
                
                .animate-slide-in-left {
                  animation: slideInLeft 0.3s forwards;
                }
                
                .animate-slide-in-right {
                  animation: slideInRight 0.3s forwards;
                }
             `}</style>
        </div>
    );
} 