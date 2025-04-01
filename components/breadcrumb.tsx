'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useCategories } from '@/app/contexts/CategoriesContext';
import { setSolutionCategoryEvent } from './SolutionSidebar';

interface BreadcrumbItemType {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

interface BreadcrumbData {
    category: {
        name: string;
        href: string;
    };
    showSubcategory: boolean;
    subcategory: {
        name: string;
        href: string;
    } | null;
    product: {
        name: string;
        href: string;
    } | null;
}

export default function Breadcrumb() {
    // Đặt tất cả hooks ở đầu component theo thứ tự nhất quán
    const pathname = usePathname();
    const router = useRouter();
    const searchParamsHook = useSearchParams();
    const memoizedPathname = useMemo(() => pathname, [pathname]); // Hook #4
    const [searchParamsValue, setSearchParamsValue] = useState<URLSearchParams | null>(null); // Hook #5
    const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData | null>(null); // Hook #6
    const { navigation } = useCategories(); // Hook #7
    const [shouldRender, setShouldRender] = useState<boolean>(pathname !== '/'); // Hook để kiểm soát việc render

    // Kiểm tra xem active tab có phải là tab Products không
    const isProductTab = pathname?.startsWith('/products');

    // Ở đây chúng ta chuẩn hóa category khi lấy từ URL
    const categoryParamRaw = searchParamsHook?.get("category");
    const categoryParam = categoryParamRaw ? decodeURIComponent(categoryParamRaw).replace(/\+/g, ' ') : null;

    // Tương tự, chuẩn hóa subcategory khi lấy từ URL
    const subcategoryParamRaw = searchParamsHook?.get("subcategory");
    const subcategoryParam = subcategoryParamRaw ? decodeURIComponent(subcategoryParamRaw).replace(/\+/g, ' ') : null;

    // Tìm tên subcategory từ navigation dựa trên tên
    const findSubcategoryName = useCallback((category: string, subcategory: string) => {
        const productNavItem = navigation.find(item =>
            item.name === 'Products' ||
            item.name === 'Product' ||
            item.href === '/products'
        );

        if (productNavItem?.submenu) {
            const foundCategory = productNavItem.submenu.find(cat => cat.title === category);
            if (foundCategory?.items) {
                const foundSubcategory = foundCategory.items.find(item => item.name === subcategory);
                if (foundSubcategory) {
                    return {
                        name: foundSubcategory.name,
                        id: foundSubcategory.id
                    };
                }
            }
        }
        return { name: subcategory, id: null };
    }, [navigation]);

    // Hook #8 - luôn gọi useEffect ở vị trí này, đặt điều kiện bên trong
    useEffect(() => {
        // Điều kiện sẽ kiểm tra bên trong useEffect
        if (pathname !== '/') {
            // Logic xử lý breadcrumb data
            const handleStorageChange = () => {
                try {
                    const data = sessionStorage.getItem('breadcrumbData');
                    if (data) {
                        setBreadcrumbData(JSON.parse(data));
                    }
                } catch (error) {
                    console.error('Error parsing breadcrumb data:', error);
                }
            };

            // Hàm xử lý khi có custom event breadcrumbUpdate
            const handleBreadcrumbUpdate = () => {
                handleStorageChange();
            };

            // Khởi tạo data
            handleStorageChange();

            // Đăng ký event listeners
            window.addEventListener('storage', handleStorageChange);
            window.addEventListener('breadcrumbUpdate', handleBreadcrumbUpdate);

            // Cleanup function
            return () => {
                window.removeEventListener('storage', handleStorageChange);
                window.removeEventListener('breadcrumbUpdate', handleBreadcrumbUpdate);
            };
        }

        // Luôn trả về một cleanup function, ngay cả khi không cần thiết
        return () => { };
    }, [pathname]);

    // Hook #9 - useEffect thứ hai
    useEffect(() => {
        setSearchParamsValue(searchParamsHook);
    }, [searchParamsHook]);

    // Cập nhật shouldRender khi pathname thay đổi
    useEffect(() => {
        setShouldRender(pathname !== '/');
    }, [pathname]);

    // Thiết lập breadcrumb data dựa trên URL hiện tại
    useEffect(() => {
        if (isProductTab) {
            try {
                if (categoryParam) {
                    // Subcategory có thể là tên hoặc ID, tìm subcategory trong navigation
                    let subcategoryId = null;
                    let subcategoryName = subcategoryParam || '';

                    if (subcategoryParam) {
                        const subcategoryInfo = findSubcategoryName(categoryParam, subcategoryParam);
                        subcategoryId = subcategoryInfo.id;
                        subcategoryName = subcategoryInfo.name || subcategoryParam; // Fallback nếu name null
                    }

                    // Sử dụng đường dẫn với tên danh mục
                    setBreadcrumbData({
                        category: {
                            name: categoryParam,
                            href: `/products?category=${categoryParam.replace(/ /g, '%20')}`
                        },
                        showSubcategory: !!subcategoryParam,
                        subcategory: subcategoryParam ? {
                            name: subcategoryName, // Hiển thị tên subcategory 
                            href: `/products?category=${categoryParam.replace(/ /g, '%20')}&subcategory=${subcategoryParam.replace(/ /g, '%20')}`
                        } : null,
                        product: null
                    });
                }
            } catch (e) {
                console.error('Error setting breadcrumbData from URL:', e);
            }
        }
    }, [categoryParam, subcategoryParam, isProductTab, findSubcategoryName]);

    // Thay vì early return, sử dụng điều kiện render
    if (!shouldRender) {
        return null;
    }

    // Logic xử lý breadcrumb không đổi
    const paths = pathname.split('/').filter(Boolean);
    const isProductPage = pathname.startsWith('/products');
    const isSolutionPage = pathname.startsWith('/solutions');
    const isAboutPage = pathname.startsWith('/about');
    const isSubPage = paths.length > 1;
    const isProductDetail = pathname.includes('products') && paths.length === 2;

    // ===== CategoryTabs logic =====
    const isLevel3ProductPage = () => {
        const urlParts = pathname.split('/').filter(Boolean);
        return urlParts.length > 3 && urlParts[0] === 'products';
    };

    const isTabActive = (tabId: string, href: string) => {
        return true; // Logic giữ nguyên như trong code gốc
    };

    // Tạo hiệu ứng ripple khi click - không thay đổi
    const createRippleEffect = (e: React.MouseEvent, callback: () => void) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Thêm style keyframes nếu không có trong tailwind
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                from {
                    transform: scale(0);
                    opacity: 0.8;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(22, 163, 74, 0.3);
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            }
        `;
        document.head.appendChild(style);

        ripple.className = 'ripple-effect';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
            style.remove();
            callback();
        }, 600);
    };

    // Xử lý khi click vào tab
    const handleCategoryTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string, href: string) => {
        e.preventDefault();
        // Tạo hiệu ứng ripple khi click
        createRippleEffect(e, () => {
            // Cập nhật tab và redirect
            const params = new URLSearchParams(searchParamsValue?.toString() || '');
            params.delete('subcategory'); // Xóa subcategory khi chuyển tab

            // Mã hóa URL thủ công để sử dụng %20 thay vì +
            const categoryParam = tabId.replace(/ /g, '%20');

            // Gọi event để đồng bộ với ProductSidebar
            if (typeof window !== 'undefined') {
                try {
                    // Import động để tránh dependency cycle
                    const { setProductCategoryEvent } = require('./ProductSidebar');
                    // Sử dụng tên danh mục thay vì ID
                    setProductCategoryEvent(tabId, null);
                } catch (error) {
                    console.error('Error importing setProductCategoryEvent:', error);
                }
            }

            // Chuyển trang với URL đã được mã hóa thủ công
            router.push(`/products?category=${categoryParam}`);
        });
    };

    // Giữ nguyên hàm render TabCategoryTabs
    const renderCategoryTabs = () => {
        // Không hiển thị tabs trong trang chi tiết sản phẩm
        if (isProductDetail) return null;

        // Chỉ hiển thị tabs trong trang danh sách sản phẩm
        // pathname phải bắt đầu bằng '/products' và không được có đường dẫn con
        const isProductListPage = pathname.includes('/products');
        if (isProductListPage) {
            // Lấy category từ URL và chuẩn hóa
            const categoryParamRaw = searchParamsValue?.get('category');
            const categoryParam = categoryParamRaw ? decodeURIComponent(categoryParamRaw).replace(/\+/g, ' ') : null;

            const productNavItem = navigation.find(item => item.name === 'Products' || item.name === 'Product');
            const tabNavigationData = productNavItem?.submenu;

            if (!tabNavigationData) return null;

            return (
                <div className="ml-auto">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center space-x-1">
                            {tabNavigationData.map((tab, index) => {
                                // Kiểm tra tab nào đang active, sử dụng giá trị đã chuẩn hóa
                                const isActive = categoryParam === tab.title || (!categoryParam && index === 0);

                                return (
                                    <div key={tab.title}>
                                        {renderTab(
                                            tab.title,
                                            isActive,
                                            (e) => handleCategoryTabClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, tab.title, tab.href || '/products')
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    // Tạo tab với CSS chung
    const renderTab = (title: string, isActive: boolean, handleClick: (e: React.MouseEvent) => void) => (
        <div
            onClick={handleClick}
            className={`
                font-light text-[12px] px-4 py-2 cursor-pointer transition-all duration-300 relative rounded-t-md overflow-hidden
                ${isActive
                    ? 'text-green-600 bg-white shadow-md z-10'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-100 hover:shadow-sm hover:translate-y-[-2px] hover:border-b-2 hover:border-green-300'
                }
            `}
        >
            {title}
            {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 rounded-t-lg"></div>
            )}
        </div>
    );

    // Xử lý breadcrumb items và tabs cho từng loại trang
    let breadcrumbItems = [];
    let tabsToRender = null;

    // Luôn thêm Home
    breadcrumbItems.push({
        name: 'Home',
        href: '/',
        icon: <Home className="h-4 w-4" />
    });

    if (isProductPage) {
        // Thêm Products vào breadcrumb
        breadcrumbItems.push({
            name: 'Products',
            href: '/products'
        });

        // Xử lý breadcrumb từ dữ liệu được lưu trong sessionStorage
        if (breadcrumbData && breadcrumbData.category) {
            // Thêm Category
            breadcrumbItems.push({
                name: breadcrumbData.category.name,
                href: breadcrumbData.category.href
            });

            // Kiểm tra xem nếu có subcategory và đang xem trang subcategory
            if (breadcrumbData.showSubcategory && breadcrumbData.subcategory) {
                breadcrumbItems.push({
                    name: breadcrumbData.subcategory.name,
                    href: breadcrumbData.subcategory.href
                });
            }

            // Chỉ thêm product khi xem trang chi tiết sản phẩm
            if (isProductDetail && breadcrumbData.product) {
                breadcrumbItems.push({
                    name: breadcrumbData.product.name,
                    href: breadcrumbData.product.href
                });
            }
        } else {
            // Fallback cho trường hợp không có dữ liệu từ sessionStorage
            // Lấy thông tin từ URL
            const urlParts = pathname.split('/').filter(Boolean);

            if (urlParts.length > 1) {
                const categorySlug = urlParts[1]; // Lấy category slug từ URL

                // Tìm category từ navigation
                const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
                if (productNav?.submenu) {
                    // Tìm category dựa trên slug từ URL
                    const categoryObj = productNav.submenu.find(
                        cat => cat.title.toLowerCase().replace(/\s+/g, '-') === categorySlug ||
                            (cat.href && cat.href.includes(categorySlug))
                    );

                    if (categoryObj) {
                        breadcrumbItems.push({
                            name: categoryObj.title,
                            href: `/products?category=${encodeURIComponent(categoryObj.title)}`
                        });

                        // Nếu URL có subcategory
                        if (urlParts.length > 2) {
                            const subcategorySlug = urlParts[2];
                            const subcategoryObj = categoryObj.items?.find(
                                item => item.name.toLowerCase().replace(/\s+/g, '-') === subcategorySlug ||
                                    item.href.includes(subcategorySlug) ||
                                    item.id === subcategorySlug
                            );

                            if (subcategoryObj) {
                                breadcrumbItems.push({
                                    name: subcategoryObj.name,
                                    href: `/products?category=${encodeURIComponent(categoryObj.title)}&subcategory=${encodeURIComponent(subcategoryObj.id!)}`
                                });

                                // Nếu URL có ID sản phẩm
                                if (urlParts.length > 3) {
                                    const productId = urlParts[3];
                                    // Sử dụng đường dẫn đầy đủ nhưng vẫn giữ định dạng URL cũ
                                    breadcrumbItems.push({
                                        name: `Sản phẩm ${productId}`,
                                        href: pathname
                                    });
                                }
                            }
                        }
                    } else {
                        // Fallback khi không tìm thấy category trong navigation
                        const displayName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' ');
                        breadcrumbItems.push({
                            name: displayName,
                            href: `/products?category=${encodeURIComponent(displayName)}`
                        });
                    }
                }
            } else if (searchParamsValue && searchParamsValue.has('category')) {
                // Lấy thông tin từ query params
                const categoryName = searchParamsValue.get('category');
                if (categoryName) {
                    // Cập nhật lại đường dẫn cho UPS Supply và ACM Series
                    let displayName = categoryName;
                    if (categoryName === "UPS Supply") {
                        displayName = "UPS Supply";
                    } else if (categoryName === "ACM Series") {
                        displayName = "ACM Series";
                    }

                    breadcrumbItems.push({
                        name: displayName,
                        href: `/products?category=${encodeURIComponent(categoryName)}`
                    });

                    if (searchParamsValue.has('subcategory')) {
                        const subcategoryParam = searchParamsValue.get('subcategory');
                        if (subcategoryParam) {
                            // Tìm subcategory để lấy tên hiển thị
                            const productNav = navigation.find(item =>
                                item.name === 'Products' ||
                                item.name === 'Product' ||
                                item.href === '/products'
                            );

                            if (productNav?.submenu) {
                                const category = productNav.submenu.find(cat => cat.title === categoryName);
                                if (category?.items) {
                                    // Subcategory có thể là tên hoặc id, thử cả hai cách
                                    let subcategory = category.items.find(item => item.id === subcategoryParam);
                                    if (!subcategory) {
                                        // Nếu không tìm thấy bằng ID, thử tìm bằng tên
                                        subcategory = category.items.find(item => item.name === decodeURIComponent(subcategoryParam).replace(/\+/g, ' '));
                                    }

                                    if (subcategory) {
                                        // Sử dụng tên để hiển thị nhưng ID để tạo URL
                                        const subcategoryId = subcategory.id || subcategoryParam;
                                        breadcrumbItems.push({
                                            name: subcategory.name,
                                            href: `/products?category=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(subcategoryId)}`
                                        });
                                    } else {
                                        // Fallback nếu không tìm thấy
                                        breadcrumbItems.push({
                                            name: decodeURIComponent(subcategoryParam).replace(/\+/g, ' '),
                                            href: `/products?category=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(subcategoryParam)}`
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (isSolutionPage) {
        // Xử lý breadcrumb cho trang Solutions tương tự
        breadcrumbItems.push({
            name: 'Solutions',
            href: '/solutions'
        });

        // Xử lý trang chi tiết Solutions
        if (isSubPage) {
            const nav = navigation.find(item => item.name === 'Solution' || item.href === '/solutions');

            if (nav?.submenu) {
                const currentUrl = `/${paths.slice(0, 2).join('/')}`;
                let foundCategory = null;
                let foundItem = null;

                // Tìm danh mục và giải pháp hiện tại
                for (const category of nav.submenu) {
                    if (category.items) {
                        const item = category.items.find(item => item.href === currentUrl);
                        if (item) {
                            foundCategory = category;
                            foundItem = item;
                            break;
                        }
                    }
                }

                // Thêm danh mục và giải pháp vào breadcrumb nếu tìm thấy
                if (foundCategory) {
                    breadcrumbItems.push({
                        name: foundCategory.title,
                        href: foundCategory.href || '/solutions'
                    });
                }

                if (foundItem) {
                    breadcrumbItems.push({
                        name: foundItem.name,
                        href: foundItem.href || '/solutions'
                    });
                }
            }
        }

        // Tạo tabs nếu đang ở trang chính (không phải trang con)
        if (!isSubPage) {
            const categoryParam = searchParamsValue && searchParamsValue.get('category');
            const nav = navigation.find(item => item.name === 'Solution' || item.href === '/solutions');

            if (nav?.submenu) {
                tabsToRender = (
                    <div className="ml-auto">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-1">
                                {nav.submenu.map((tab, index) => {
                                    const isActive = categoryParam === tab.title || (!categoryParam && index === 0);
                                    const exactTitle = tab.title;

                                    const handleTabClick = () => {
                                        setSolutionCategoryEvent(exactTitle);
                                        router.push(`/solutions?category=${encodeURIComponent(exactTitle)}`);
                                    };

                                    return (
                                        <div key={index}>
                                            {renderTab(
                                                tab.title,
                                                isActive,
                                                (e) => createRippleEffect(e, handleTabClick)
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    } else {
        // Xử lý cho các trang khác không phải sản phẩm hoặc giải pháp
        const generalBreadcrumbs = paths.map((path, index) => ({
            href: `/${paths.slice(0, index + 1).join('/')}`,
            label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
        }));

        // Add general breadcrumbs
        generalBreadcrumbs.forEach(breadcrumb => {
            breadcrumbItems.push({
                name: breadcrumb.label,
                href: breadcrumb.href
            });
        });

        // Hiển thị tab của About
        if (isAboutPage) {
            const aboutNav = navigation.find(item => item.name === 'About Us');
            if (aboutNav?.submenu) {
                tabsToRender = (
                    <div className="ml-auto">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-1">
                                {aboutNav.submenu.map((tab, index) => {
                                    const isActive = pathname.includes(tab.href || '');
                                    const handleTabClick = () => router.push(tab.href || '/about');

                                    return (
                                        <div key={index}>
                                            {renderTab(
                                                tab.title,
                                                isActive,
                                                (e) => createRippleEffect(e, handleTabClick)
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    // Hiển thị breadcrumb và tabs
    return (
        <>
            <div className="flex justify-between items-center px-20 py-3">
                <div className="bg-gray-100 py-3 rounded-md">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            {breadcrumbItems.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    {index > 0 && (
                                        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                                    )}
                                    <Link
                                        href={item.href}
                                        className={`flex items-center hover:text-green-600 transition-colors ${index === breadcrumbItems.length - 1 ? 'font-medium text-green-600' : ''}`}
                                    >
                                        {item.icon && <span className="mr-1">{item.icon}</span>}
                                        {item.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isProductPage ? renderCategoryTabs() : tabsToRender}
            </div>
        </>
    );
} 