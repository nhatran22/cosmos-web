'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { navigation } from './mock/header-navigation';
import { ChevronRight } from 'lucide-react';

interface ProductCategory {
    title: string;
    href?: string;
    items?: { name: string; href: string; fullName?: string }[];
    isOpen?: boolean;
}

// Create a custom event for category selection
export const setCategoryEvent = (category: string) => {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('categorySelected', { detail: category });
        window.dispatchEvent(event);
    }
};

const ProductSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [previouslyExpanded, setPreviouslyExpanded] = useState<string | null>(null);
    const [animating, setAnimating] = useState(false);

    // Reference to track animation timeouts
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Find the product navigation item
        const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');

        if (productNav?.submenu) {
            // Set categories from submenu, ensuring fullName is included
            const processedCategories = productNav.submenu.map(category => {
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

            // Kiểm tra xem có category nào được chọn từ footer không
            let selectedCategory = null;
            if (typeof window !== 'undefined') {
                selectedCategory = localStorage.getItem('selectedProductCategory');

                // Nếu có, xóa để lần sau không còn hiệu lực
                if (selectedCategory) {
                    localStorage.removeItem('selectedProductCategory');
                }
            }

            // Find which category should be expanded
            const currentPath = pathname;

            // If we're on a product page, expand the relevant category
            if (currentPath.startsWith('/products')) {
                const pathParts = currentPath.split('/').filter(Boolean);
                let foundCategory = null;

                // Nếu có category được chọn từ footer, ưu tiên nó
                if (selectedCategory) {
                    foundCategory = selectedCategory;
                } else {
                    // Find which category contains the current product
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
                    setCategoryEvent(foundCategory);
                }
                // Xóa bỏ việc mở tab đầu tiên mặc định nếu không tìm thấy category phù hợp
            }
        }

        // Clean up any animation timeouts when component unmounts
        return () => {
            if (animationTimeout.current) {
                clearTimeout(animationTimeout.current);
            }
        };
    }, [pathname]);

    const toggleCategory = (title: string) => {
        // If already animating, don't do anything
        if (animating) return;

        // Start animation
        setAnimating(true);

        if (expandedCategory === title) {
            // Collapsing current category
            setExpandedCategory(null);
            // Keep track of what was previously expanded for animation
            setPreviouslyExpanded(title);
        } else {
            // Expanding a new category
            setPreviouslyExpanded(expandedCategory);
            setExpandedCategory(title);
            // Emit the selected category
            setCategoryEvent(title);
        }

        // Clear animation state after animation duration
        animationTimeout.current = setTimeout(() => {
            setAnimating(false);
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
                        <div
                            className={`flex justify-between items-center p-4 cursor-pointer bg-white rounded-md transition-all duration-300 hover:shadow-md ${isExpanded ? 'shadow-md border-l-4 border-green-600' : 'hover:border-l-4 hover:border-green-600'
                                }`}
                            onClick={() => toggleCategory(category.title)}
                        >
                            <div className={`font-medium transition-colors duration-300 ${isExpanded ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                                }`}>
                                {category.title}
                            </div>
                            <ChevronRight
                                className={`h-5 w-5 transition-all duration-300 ${isExpanded ? 'text-green-600 rotate-90' : 'text-gray-500 group-hover:text-green-600'
                                    }`}
                            />
                        </div>

                        <div
                            className={`mt-1 rounded-md overflow-hidden transition-all duration-300 ${isExpanded
                                ? 'max-h-96 opacity-100'
                                : wasExpanded
                                    ? 'max-h-0 opacity-0'
                                    : 'max-h-0 opacity-0 hidden'
                                }`}
                        >
                            {category.items && (
                                <div className="bg-[#F6F6F6] rounded-md">
                                    {category.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className={`px-4 py-3 text-gray-700 cursor-pointer transition-colors hover:bg-white hover:shadow-sm hover:text-green-600 ${pathname === item.href ? 'text-green-700 font-medium bg-white shadow-sm' : ''
                                                }`}
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

export default ProductSidebar; 