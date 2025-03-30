'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useCategories } from '@/app/contexts/CategoriesContext';

interface ProductItemType {
    name: string;
    href: string;
    fullName?: string;
    id?: string;
    isActive?: boolean;
}

interface ProductCategory {
    title: string;
    href?: string;
    items?: ProductItemType[];
    isOpen?: boolean;
}

// Các key cho sessionStorage
const EXPANDED_CATEGORY_KEY = "product_expanded_category";

// Create a custom event for category selection
export const setCategoryEvent = (category: string | null, subcategory: string | null = null) => {
    if (typeof window !== 'undefined') {
        console.log('[ProductSidebar] Dispatching categorySelected event:', { category, subcategory, time: new Date().toISOString() });
        const event = new CustomEvent('categorySelected', { detail: { category, subcategory } });
        window.dispatchEvent(event);
    }
};

const ProductCategoryItem = ({
    category,
    isOpen,
    onToggle,
    onItemClick
}: {
    category: ProductCategory;
    isOpen: boolean;
    onToggle: () => void;
    onItemClick: (href: string, categoryTitle: string, item: ProductItemType) => void;
}) => {
    return (
        <div className="mb-2">
            <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isOpen ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={onToggle}
            >
                <span className="font-medium">{category.title}</span>
                <ChevronRight
                    size={18}
                    className={`transition-transform duration-200 ${isOpen ? 'transform rotate-90' : ''}`}
                />
            </div>
            {isOpen && category.items && (
                <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-2">
                    {category.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`
                                p-2 text-sm cursor-pointer rounded-md
                                transition-colors duration-200
                                productSubcategoryItem
                                ${item.isActive ? 'bg-green-50 text-green-600 font-medium' : 'hover:bg-gray-100'}
                            `}
                            onClick={() => onItemClick(item.href, category.title, item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductSidebarSkeleton = () => (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        {[1, 2, 3].map(item => (
            <div key={item} className="mb-4">
                <div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="ml-4">
                    {[1, 2].map(subItem => (
                        <div key={subItem} className="h-4 bg-gray-200 rounded w-4/5 mb-2 animate-pulse"></div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const ProductSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [previouslyExpanded, setPreviouslyExpanded] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [animating, setAnimating] = useState(false);

    const { navigation, loading } = useCategories();

    // Reference to track animation timeouts
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

    // Thêm useSearchParams để đọc category từ URL
    const searchParams = useSearchParams();

    // Load expanded state from sessionStorage on first mount - only on client
    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            try {
                const savedCategory = sessionStorage.getItem(EXPANDED_CATEGORY_KEY);
                if (savedCategory) {
                    setExpandedCategory(savedCategory);
                }
            } catch (e) {
                console.error('Error reading from sessionStorage:', e);
            }
        }
    }, []);

    // Save expanded state to sessionStorage when it changes - only on client
    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;

        try {
            if (expandedCategory) {
                sessionStorage.setItem(EXPANDED_CATEGORY_KEY, expandedCategory);
            } else {
                sessionStorage.removeItem(EXPANDED_CATEGORY_KEY);
            }
        } catch (e) {
            console.error('Error interacting with sessionStorage:', e);
        }
    }, [expandedCategory, isMounted]);

    useEffect(() => {
        if (!navigation || navigation.length === 0) return;

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

            // Chỉ thiết lập category từ query param nếu có và đã ở client-side
            if (processedCategories.length > 0 && isMounted) {
                const categoryParam = searchParams.get('category');
                if (categoryParam) {
                    const matchingCategory = processedCategories.find(
                        cat => cat.title === categoryParam ||
                            cat.title.replace(/\s+/g, '-').toLowerCase() === categoryParam.toLowerCase()
                    );
                    if (matchingCategory) {
                        setExpandedCategory(matchingCategory.title);
                        // Khi có category từ URL, kích hoạt sự kiện cập nhật danh sách sản phẩm
                        if (!animating) {
                            setCategoryEvent(matchingCategory.title);
                        }
                    }
                } else if (expandedCategory) {
                    // Nếu URL không có category nhưng có expandedCategory, reset
                    setExpandedCategory(null);
                    setCategoryEvent(null);
                }
            }
        }

        // Clean up any animation timeouts when component unmounts
        return () => {
            if (animationTimeout.current) {
                clearTimeout(animationTimeout.current);
            }
        };
    }, [navigation, searchParams, isMounted, animating]);

    const toggleCategory = (title: string) => {
        // Nếu category đang mở, đóng nó
        if (expandedCategory === title) {
            setPreviouslyExpanded(title);
            setExpandedCategory(null);

            // Kích hoạt sự kiện với null để xử lý việc đóng tab
            setCategoryEvent(null);
            console.log('[ProductSidebar] Closing category:', title);

            // Xóa category khỏi URL khi đóng tab
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            params.delete('subcategory');
            router.push(`/products${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
        } else {
            // Lưu lại tab cũ trước khi đóng
            if (expandedCategory) {
                setPreviouslyExpanded(expandedCategory);
            }

            // Mở category mới
            setExpandedCategory(title);
            console.log('[ProductSidebar] Opening category:', title);

            // Kích hoạt sự kiện cập nhật danh sách sản phẩm
            setCategoryEvent(title);

            // Cập nhật breadcrumb để hiển thị đúng "Home > Product > UPS Supply" hoặc "Home > Product > ACM Series"
            const breadcrumbData = {
                category: {
                    name: title, // Tên tab như "UPS Supply" hoặc "ACM Series"
                    href: `/products?category=${encodeURIComponent(title)}`
                },
                showSubcategory: false,
                subcategory: null,
                product: null
            };

            try {
                sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));
                // Trigger breadcrumbUpdate event
                const event = new CustomEvent('breadcrumbUpdate');
                window.dispatchEvent(event);
                console.log('[ProductSidebar] Triggered breadcrumbUpdate event with:', { title });
            } catch (e) {
                console.error('Error interacting with sessionStorage:', e);
            }

            // Cập nhật URL với category được chọn và xóa subcategory nếu có
            const params = new URLSearchParams(searchParams.toString());
            params.set('category', title);
            params.delete('subcategory'); // Xóa subcategory khi chuyển sang category khác
            const newUrl = `/products?${params.toString()}`;
            console.log('[ProductSidebar] Navigating to:', newUrl);
            router.push(newUrl, { scroll: false });
        }
    };

    const handleItemClick = (href: string, categoryTitle: string, item: ProductItemType) => {
        if (href) {
            console.log('[ProductSidebar] Subcategory clicked:', {
                categoryTitle,
                subcategoryName: item.name,
                subcategoryId: item.id
            });

            // Tạo URL chính xác
            const correctHref = `/products?category=${encodeURIComponent(categoryTitle)}&subcategory=${encodeURIComponent(item.id || '')}`;

            // Kích hoạt sự kiện cập nhật danh sách sản phẩm với cả category và subcategory
            setCategoryEvent(categoryTitle, item.id || '');

            // Cập nhật breadcrumb với subcategory được chọn
            const breadcrumbData = {
                category: {
                    name: categoryTitle,
                    href: `/products?category=${encodeURIComponent(categoryTitle)}`
                },
                showSubcategory: true,
                subcategory: {
                    name: item.name,
                    href: correctHref
                },
                product: null
            };

            try {
                sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));
                // Trigger breadcrumbUpdate event
                const event = new CustomEvent('breadcrumbUpdate');
                window.dispatchEvent(event);
                console.log('[ProductSidebar] Updated breadcrumb with subcategory:', item.name);
            } catch (e) {
                console.error('Error interacting with sessionStorage:', e);
            }

            console.log('[ProductSidebar] Navigating to subcategory:', correctHref);
            router.push(correctHref);
        }
    };

    // Nếu chưa mount ở client, hiển thị skeleton
    if (!isMounted) {
        return (
            <div className="w-full">
                {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="mb-3">
                        <div className="w-full h-14 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                ))}
            </div>
        );
    }

    // Hiển thị loading icon khi đang tải
    if (loading) {
        return (
            <div className="w-full h-60 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-2" />
                <p className="text-gray-600 text-sm">Đang tải danh mục...</p>
            </div>
        );
    }

    // Nếu không có categories nhưng đã tải xong, hiển thị thông báo
    if (categories.length === 0 && !loading) {
        return (
            <div className="w-full p-4 bg-gray-50 rounded-md">
                <p className="text-gray-500 text-center">Không có danh mục sản phẩm</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                    Tải lại trang
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            {categories.map((category, index) => {
                const isExpanded = expandedCategory === category.title;
                const wasExpanded = previouslyExpanded === category.title && expandedCategory !== category.title;
                const activeSubcategory = searchParams.get('subcategory');

                return (
                    <div key={index} className="mb-3">
                        {/* Header - phần có thể click để mở/đóng */}
                        <button
                            type="button"
                            id={`product-category-${index}`}
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
                        {isExpanded && (
                            <div className="mt-1 rounded-md overflow-hidden transition-all duration-300">
                                {category.items && (
                                    <div className="bg-[#F6F6F6] rounded-md">
                                        {category.items.map((item) => {
                                            // Kiểm tra xem item có phải là subcategory đang active không
                                            const isActive = activeSubcategory === item.id;

                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`px-4 py-3 cursor-pointer transition-all duration-300 ${isActive
                                                        ? 'text-green-600 font-medium bg-white shadow-md border-l-4 border-green-600'
                                                        : 'text-gray-700 hover:bg-white hover:shadow-sm hover:text-green-600 hover:border-l-2 hover:border-green-300'}`}
                                                    onClick={() => handleItemClick(item.href, category.title, item)}
                                                >
                                                    <span className="line-clamp-2 break-words hover:line-clamp-none">
                                                        {item.fullName || item.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductSidebar; 