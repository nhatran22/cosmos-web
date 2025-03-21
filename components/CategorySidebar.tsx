import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { findCategoryFromUrl, processSubcategoryClick, findSubcategoryById } from './mock/adapter-utils';
import { headerNavigationData } from './navigation-data';

interface CategorySidebarProps {
    className?: string;
    onSubcategorySelect?: (subcategoryId: string, products: any[], subcategoryName: string) => void;
    onCategorySelect?: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
    className = '',
    onSubcategorySelect,
    onCategorySelect
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);

    // Tìm danh mục hiện tại từ URL
    const categoryInfo = findCategoryFromUrl(pathname);

    // Lắng nghe sự kiện categorySelected từ product-sidebar
    useEffect(() => {
        const handleCategorySelected = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail) {
                const categoryName = customEvent.detail;
                // Tìm category dựa vào tên
                const category = headerNavigationData.find(cat =>
                    cat.name === categoryName ||
                    cat.name.toLowerCase() === categoryName.toLowerCase()
                );
                if (category) {
                    // Mở rộng category tương ứng
                    setExpandedCategory(category.id);
                    // Thông báo lên component cha khi category được chọn
                    if (onCategorySelect) {
                        onCategorySelect(category.id);
                    }
                }
            }
        };

        window.addEventListener('categorySelected', handleCategorySelected);
        return () => {
            window.removeEventListener('categorySelected', handleCategorySelected);
        };
    }, [onCategorySelect]);

    // Tự động mở rộng danh mục hiện tại và xác định subcategory được chọn
    useEffect(() => {
        // Mở rộng danh mục nếu đã tìm thấy từ URL
        if (categoryInfo?.id) {
            setExpandedCategory(categoryInfo.id);
        }

        // Kiểm tra subcategory từ query params
        const subcategoryParam = searchParams.get('subcategory');
        if (subcategoryParam) {
            setSelectedSubcategoryId(subcategoryParam);
            return;
        }

        // Kiểm tra subcategory từ URL path
        const urlParts = pathname.split('/').filter(Boolean);
        if (urlParts.length >= 3 && urlParts[0] === 'products') {
            const categorySlug = urlParts[1];
            const subcategorySlug = urlParts[2];

            // Chỉ tiếp tục nếu đã có categoryInfo
            if (categoryInfo) {
                // Tìm category từ headerNavigationData
                const category = headerNavigationData.find(cat => {
                    // Kiểm tra dựa trên id trước (nếu có)
                    if (categoryInfo.id && cat.id === categoryInfo.id) {
                        return true;
                    }

                    // Hoặc kiểm tra dựa trên href
                    const catSlug = cat.href.split('/').filter(Boolean).pop();
                    return catSlug === categorySlug;
                });

                if (category?.submenu) {
                    // Tìm subcategory từ slug
                    const subcategory = category.submenu.find(sub => {
                        const subSlug = sub.href.split('/').filter(Boolean).pop();
                        return subSlug === subcategorySlug;
                    });

                    if (subcategory) {
                        setSelectedSubcategoryId(subcategory.id);
                    }
                }
            }
        }
    }, [pathname, categoryInfo, searchParams]);

    // Toggle mở/đóng danh mục - chỉ mở một danh mục tại một thời điểm
    const toggleCategory = (categoryId: string) => {
        setExpandedCategory(prev => (prev === categoryId ? null : categoryId));

        // Thông báo lên component cha khi category được chọn/mở rộng
        if (onCategorySelect) {
            onCategorySelect(categoryId);
        }
    };

    // Xử lý khi click vào danh mục cấp 1
    const handleCategoryClick = (e: React.MouseEvent, categoryId: string) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của link
        toggleCategory(categoryId); // Mở danh mục này và đóng danh mục khác

        // Thông báo lên component cha khi category được chọn
        if (onCategorySelect) {
            onCategorySelect(categoryId);
        }
    };

    // Xử lý khi click vào danh mục con
    const handleSubcategoryClick = (href: string | undefined, subcategoryId: string, subcategoryName: string, e: React.MouseEvent) => {
        e.preventDefault();

        // Ghi nhớ subcategory đã chọn
        setSelectedSubcategoryId(subcategoryId);

        // Nếu href không được định nghĩa, sử dụng đường dẫn mặc định
        const safeHref = href || `/products/${categoryInfo?.id || 'default'}/${subcategoryId}`;

        // Tìm thông tin subcategory và category
        const subcategoryInfo = findSubcategoryById(subcategoryId);

        // Xử lý navigation
        const result = processSubcategoryClick(safeHref);

        if (result.shouldRedirect && result.redirectUrl) {
            // Nếu chỉ có 1 sản phẩm, chuyển hướng đến trang chi tiết

            // Cập nhật breadcrumb trước khi chuyển hướng
            if (subcategoryInfo && subcategoryInfo.category && subcategoryInfo.subcategory) {
                // Tìm thông tin sản phẩm
                const product = subcategoryInfo.subcategory.products[0]; // Lấy sản phẩm đầu tiên

                // Lưu thông tin đầy đủ cho trang chi tiết
                const breadcrumbData = {
                    category: {
                        name: subcategoryInfo.category.name,
                        href: subcategoryInfo.category.href
                    },
                    showSubcategory: true,
                    subcategory: {
                        name: subcategoryInfo.subcategory.name,
                        href: subcategoryInfo.subcategory.href
                    },
                    product: product ? {
                        name: product.name,
                        href: product.href
                    } : null
                };

                // Lưu vào sessionStorage
                sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

                // Kích hoạt custom event để thông báo breadcrumb đã thay đổi
                window.dispatchEvent(new Event('breadcrumbUpdate'));
            }

            window.location.href = result.redirectUrl;
        } else if (onSubcategorySelect && result.products) {
            // Nếu có nhiều sản phẩm, gọi callback để hiển thị danh sách
            onSubcategorySelect(subcategoryId, result.products, subcategoryName);

            // Cập nhật breadcrumb cho trang danh sách sản phẩm subcategory
            if (subcategoryInfo && subcategoryInfo.category) {
                // Lưu thông tin breadcrumb - chỉ hiển thị đến category theo yêu cầu
                const breadcrumbData = {
                    category: {
                        name: subcategoryInfo.category.name,
                        href: subcategoryInfo.category.href
                    },
                    showSubcategory: false,
                    subcategory: null,
                    product: null
                };

                // Lưu vào sessionStorage
                sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

                // Kích hoạt custom event để thông báo breadcrumb đã thay đổi
                window.dispatchEvent(new Event('breadcrumbUpdate'));
            }

            // Cập nhật URL không reload trang - sử dụng đúng href của submenu
            window.history.pushState({}, '', safeHref);
        }
    };

    // Kiểm tra xem link có active hay không
    const isLinkActive = (subcategoryId: string) => {
        // Kiểm tra dựa trên selectedSubcategoryId (đã set từ URL hoặc từ sự kiện click)
        return selectedSubcategoryId === subcategoryId;
    };

    return (
        <aside className={`category-sidebar ${className}`}>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <ul className="space-y-1">
                    {headerNavigationData.map((category) => {
                        // Kiểm tra xem category có đang active không dựa trên pathname và id của category
                        const isCategoryActive = (categoryInfo?.id === category.id) || pathname.includes(category.href);
                        const isCategoryExpanded = expandedCategory === category.id;

                        return (
                            <li key={category.id} className={`category-item ${isCategoryActive ? 'border-l-4 border-green-500 pl-2' : 'pl-3'}`}>
                                <div className="flex items-center justify-between py-2">
                                    <a
                                        href={category.href}
                                        onClick={(e) => handleCategoryClick(e, category.id)}
                                        className={`text-sm font-medium block flex-grow ${isCategoryActive ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                                    >
                                        {category.name}
                                    </a>

                                    {category.submenu && category.submenu.length > 0 && (
                                        <button
                                            onClick={() => toggleCategory(category.id)}
                                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-green-600"
                                        >
                                            {isCategoryExpanded ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {isCategoryExpanded && category.submenu && category.submenu.length > 0 && (
                                    <ul className="ml-2 space-y-1 border-l-2 border-gray-100 pl-3 py-1">
                                        {category.submenu.map((subItem) => {
                                            const isSubItemActive = isLinkActive(subItem.id);

                                            return (
                                                <li key={subItem.id}>
                                                    <a
                                                        href={subItem.href || `/products/${category.id}/${subItem.id}`}
                                                        onClick={(e) => handleSubcategoryClick(
                                                            subItem.href,
                                                            subItem.id,
                                                            subItem.title,
                                                            e
                                                        )}
                                                        className={`text-sm block py-1.5 transition-colors ${isSubItemActive ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
                                                    >
                                                        {subItem.title}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default CategorySidebar; 