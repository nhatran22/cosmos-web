'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { navigation } from './mock/header-navigation';
import { ChevronRight } from 'lucide-react';

interface SolutionCategory {
    title: string;
    href?: string;
    items?: { name: string; href: string; fullName?: string }[];
    isOpen?: boolean;
}

// Create a custom event for category selection
export const setSolutionCategoryEvent = (category: string) => {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('solutionCategorySelected', { detail: category });
        window.dispatchEvent(event);
    }
};

const SolutionSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [categories, setCategories] = useState<SolutionCategory[]>([]);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [previouslyExpanded, setPreviouslyExpanded] = useState<string | null>(null);
    const [animating, setAnimating] = useState(false);

    // Reference to track animation timeouts
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

    // Thêm useSearchParams để đọc category từ URL
    const searchParams = useSearchParams();

    useEffect(() => {
        // Find the solution navigation item
        const solutionNav = navigation.find(item => item.name === 'Solution' || item.href === '/solutions');

        if (solutionNav?.submenu) {
            // Set categories from submenu, ensuring fullName is included
            const processedCategories = solutionNav.submenu.map(category => {
                // Process items to ensure fullName is set
                const processedItems = category.items?.map(item => ({
                    ...item,
                    // If fullName isn't set, use name as fallback
                    fullName: item.fullName || item.name
                }));

                return {
                    ...category,
                    items: processedItems
                };
            });

            setCategories(processedCategories);

            // Kiểm tra xem có category nào được chọn từ localStorage không
            let selectedCategory = null;
            if (typeof window !== 'undefined') {
                selectedCategory = localStorage.getItem('selectedSolutionCategory');

                // Nếu có, xóa để lần sau không còn hiệu lực
                if (selectedCategory) {
                    localStorage.removeItem('selectedSolutionCategory');
                }
            }

            // Lấy category từ query params nếu có
            const categoryParam = searchParams.get('category');

            // Find which category should be expanded
            const currentPath = pathname;

            // If we're on a solution page, expand the relevant category
            if (currentPath.startsWith('/solutions')) {
                const pathParts = currentPath.split('/').filter(Boolean);
                let foundCategory = null;

                // Ưu tiên lấy category từ URL query param
                if (categoryParam) {
                    // Tìm danh mục phù hợp với category trong URL
                    const matchingCategory = solutionNav.submenu.find(submenu => {
                        return submenu.title === categoryParam ||
                            submenu.title.toLowerCase().includes(categoryParam.toLowerCase()) ||
                            categoryParam.toLowerCase().includes(submenu.title.toLowerCase());
                    });

                    if (matchingCategory) {
                        foundCategory = matchingCategory.title;
                    }
                }
                // Nếu không có trong URL, kiểm tra localStorage
                else if (selectedCategory) {
                    foundCategory = selectedCategory;
                } else {
                    // Find which category contains the current solution
                    for (const category of processedCategories) {
                        if (category.href === currentPath) {
                            foundCategory = category.title;
                            break;
                        } else if (category.items) {
                            // Check if any items match the current path
                            const matchingItem = category.items.find(item =>
                                item.href === currentPath ||
                                (pathParts.length > 1 && item.href.includes(pathParts[1]))
                            );

                            if (matchingItem) {
                                foundCategory = category.title;
                                break;
                            }
                        }
                    }
                }

                // Set the expanded category
                if (foundCategory) {
                    setExpandedCategory(foundCategory);
                    setPreviouslyExpanded(foundCategory);
                    setSolutionCategoryEvent(foundCategory);
                }
            }
        }

        // Clean up any animation timeouts when component unmounts
        return () => {
            if (animationTimeout.current) {
                clearTimeout(animationTimeout.current);
            }
        };
    }, [pathname, searchParams]); // Thêm searchParams vào dependency

    const toggleCategory = (title: string) => {
        // Log để debug
        console.log('Toggle solution category clicked:', title, 'Current expanded:', expandedCategory, 'Animating:', animating);

        // Nếu đang animation thì dừng animation và reset trạng thái
        if (animating) {
            if (animationTimeout.current) {
                clearTimeout(animationTimeout.current);
            }
            console.log('Animation in progress, clearing and resetting');
        }

        // Start animation
        setAnimating(true);

        if (expandedCategory === title) {
            // Collapsing current category
            setExpandedCategory(null);
            // Keep track of what was previously expanded for animation
            setPreviouslyExpanded(title);

            // Khi đóng tab, cũng cập nhật URL để không còn hiển thị category
            router.push('/solutions');
        } else {
            // Expanding a new category
            setPreviouslyExpanded(expandedCategory);
            setExpandedCategory(title);

            // Emit the selected category
            setSolutionCategoryEvent(title);

            // Cập nhật URL để đồng bộ với tab navigation
            router.push(`/solutions?category=${encodeURIComponent(title)}`);

            // Log thành công
            console.log('Expanded solution category to:', title);
        }

        // Clear animation state after animation duration
        animationTimeout.current = setTimeout(() => {
            setAnimating(false);
            console.log('Animation completed, animating set to false');
        }, 300); // Duration should match CSS transition time
    };

    const handleItemClick = (href: string) => {
        if (href) {  // Only navigate if href is defined
            router.push(href);
        }
    };

    if (categories.length === 0) return null;

    return (
        <div className="w-full">
            {categories.map((category, index) => {
                const isExpanded = expandedCategory === category.title;
                const wasExpanded = previouslyExpanded === category.title && expandedCategory !== category.title;

                return (
                    <div key={index} className="mb-3">
                        {/* Header - phần có thể click để mở/đóng */}
                        <button
                            type="button"
                            id={`solution-category-${index}`}
                            className={`w-full flex justify-between items-center p-4 cursor-pointer bg-white rounded-md transition-all duration-300 hover:shadow-md ${isExpanded ? 'shadow-md border-l-4 border-green-600' : 'hover:border-l-4 hover:border-green-600'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCategory(category.title);
                            }}
                        >
                            <div className={`font-medium transition-colors duration-300 ${isExpanded ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
                                {category.title}
                            </div>
                            <ChevronRight
                                className={`h-5 w-5 transition-all duration-300 ${isExpanded ? 'text-green-600 rotate-90' : 'text-gray-500'}`}
                            />
                        </button>

                        {/* Content - phần hiển thị khi mở */}
                        <div
                            className={`mt-1 rounded-md overflow-hidden transition-all duration-300 ${isExpanded
                                ? 'max-h-[800px] opacity-100 visible'
                                : 'max-h-0 opacity-0 invisible'
                                }`}
                            style={{
                                display: isExpanded ? 'block' : 'none',
                                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'
                            }}
                        >
                            {category.items && (
                                <div className="bg-[#F6F6F6] rounded-md">
                                    {category.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className={`px-4 py-3 text-gray-700 cursor-pointer transition-colors hover:bg-white hover:shadow-sm hover:text-green-600 ${pathname === item.href ? 'text-green-700 font-medium bg-white shadow-sm' : ''}`}
                                            onClick={() => handleItemClick(item.href)}
                                        >
                                            <span className="line-clamp-2 break-words hover:line-clamp-none">
                                                {item.fullName || item.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SolutionSidebar; 