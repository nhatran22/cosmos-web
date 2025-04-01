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

// Hàm event để đồng bộ giữa ProductSidebar và breadcrumb
export function setProductCategoryEvent(category: string | null, subcategory: string | null = null) {
    // Chuẩn hóa category và subcategory
    const normalizedCategory = category ? decodeURIComponent(String(category)).replace(/\+/g, ' ') : null;
    const normalizedSubcategory = subcategory ? decodeURIComponent(String(subcategory)).replace(/\+/g, ' ') : null;

    if (typeof window !== 'undefined') {
        // Tạo breadcrumb data
        const breadcrumbData: any = {
            category: normalizedCategory ? {
                name: normalizedCategory,
                href: `/products?category=${encodeURIComponent(normalizedCategory)}`
            } : null,
            showSubcategory: !!normalizedSubcategory,
            subcategory: normalizedSubcategory ? {
                name: normalizedSubcategory,
                href: `/products?category=${encodeURIComponent(normalizedCategory!)}&subcategory=${normalizedSubcategory.replace(/ /g, '%20')}`
            } : null,
            product: null
        };

        // Lưu vào sessionStorage để đồng bộ với breadcrumb
        try {
            sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

            // Kích hoạt sự kiện breadcrumbUpdate
            const updateEvent = new CustomEvent('breadcrumbUpdate');
            window.dispatchEvent(updateEvent);

            // Kích hoạt sự kiện categorySelected cho ProductList
            const categoryEvent = new CustomEvent('categorySelected', {
                detail: { category: normalizedCategory, subcategory: normalizedSubcategory }
            });
            window.dispatchEvent(categoryEvent);
        } catch (e) {
            console.error('Error interacting with sessionStorage:', e);
        }
    }
}

// Create a custom event for category selection
export const setCategoryEvent = (category: string | null) => {
    // Gọi hàm setProductCategoryEvent với subcategory = null
    setProductCategoryEvent(category, null);
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
    const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
    const [previouslyExpanded, setPreviouslyExpanded] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [animating, setAnimating] = useState(false);

    const { navigation } = useCategories();

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

        // Find the product navigation item - trường hợp này có thể là 'Products' hoặc 'Product'
        const productNav = navigation.find(item =>
            item.name === 'Products' ||
            item.name === 'Product' ||
            item.href === '/products'
        );

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
            setProductCategoryEvent(null, null);
            window.dispatchEvent(new CustomEvent('categorySelected', {
                detail: { category: null, subcategory: null }
            }));

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

            // Kích hoạt cả hai sự kiện để đảm bảo xử lý nhất quán
            setProductCategoryEvent(title, null);
            window.dispatchEvent(new CustomEvent('categorySelected', {
                detail: { category: title, subcategory: null }
            }));

            // Sử dụng cách mã hóa URL thủ công thay vì URLSearchParams để đảm bảo %20 thay vì +
            const categoryParam = encodeURIComponent(title);
            const newUrl = `/products?category=${categoryParam}`;

            router.push(newUrl, { scroll: false });
        }
    };

    // Xử lý khi click vào một subcategory item
    const handleItemClick = (href: string, categoryTitle: string, item: any) => {
        if (animationTimeout.current) {
            clearTimeout(animationTimeout.current);
        }

        setAnimating(true);
        animationTimeout.current = setTimeout(() => {
            setAnimating(false);
        }, 500);

        if (href) {
            // Mã hóa đúng cách với %20 thay vì +
            const categoryParam = categoryTitle.replace(/ /g, '%20');
            // Sử dụng tên subcategory thay vì ID
            const subcategoryParam = (item.name || '').replace(/ /g, '%20');

            // Tạo URL chính xác
            const correctHref = `/products?category=${categoryParam}&subcategory=${subcategoryParam}`;

            // Kích hoạt sự kiện cập nhật danh sách sản phẩm với cả category và subcategory
            // Truyền tên subcategory thay vì ID
            setProductCategoryEvent(categoryTitle, item.name || '');

            router.push(correctHref);
        }
    };

    // Hàm xử lý sự kiện khi một category được chọn từ breadcrumb
    const handleProductCategorySelected = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail) {
            const { category, subcategory } = customEvent.detail;

            // Chuẩn hóa category và subcategory để đảm bảo nhất quán
            const normalizedCategory = category ? decodeURIComponent(String(category)).replace(/\+/g, ' ') : null;
            const normalizedSubcategory = subcategory ? decodeURIComponent(String(subcategory)).replace(/\+/g, ' ') : null;

            // Cập nhật state
            if (normalizedCategory) {
                setExpandedCategory(normalizedCategory);
                // Nếu có subcategory, mở rộng nó
                if (normalizedSubcategory) {
                    setExpandedSubcategory(normalizedSubcategory);
                } else {
                    setExpandedSubcategory(null);
                }
            }

            // Cập nhật URL mà không reload trang
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);

            if (normalizedCategory) {
                // Mã hóa category với %20 cho URL
                const categoryParam = encodeURIComponent(normalizedCategory);
                params.set('category', categoryParam);

                if (normalizedSubcategory) {
                    // Mã hóa subcategory với %20 cho URL
                    const subcategoryParam = normalizedSubcategory.replace(/ /g, '%20');
                    params.set('subcategory', subcategoryParam);
                } else {
                    params.delete('subcategory');
                }
            }

            url.search = params.toString();
            window.history.pushState({}, '', url.toString());
        }
    };

    // Lắng nghe sự kiện từ breadcrumb khi tab được click
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Đăng ký lắng nghe sự kiện
        window.addEventListener('productCategorySelected', handleProductCategorySelected as EventListener);

        return () => {
            window.removeEventListener('productCategorySelected', handleProductCategorySelected as EventListener);
        };
    }, []);

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

    return (
        <div className="w-full">
            {categories.map((category, index) => {
                const isExpanded = expandedCategory === category.title;
                const wasExpanded = previouslyExpanded === category.title && expandedCategory !== category.title;
                // Nếu activeSubcategory là tên, chúng ta cần tìm theo tên thay vì ID
                const activeSubcategoryParam = searchParams.get('subcategory');
                const activeSubcategory = activeSubcategoryParam ?
                    decodeURIComponent(activeSubcategoryParam).replace(/\+/g, ' ') : null;

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
                                            // So sánh tên subcategory thay vì ID
                                            const isActive = activeSubcategory === item.name;

                                            return (
                                                <div
                                                    key={item.id || item.name}
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