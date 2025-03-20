'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { navigation } from './mock/header-navigation';
import { setCategoryEvent } from './product-sidebar';
import { setSolutionCategoryEvent } from './solution-sidebar';
import { useEffect, useState } from 'react';
import { tabNavigationData } from './navigation-data';
import { findCategoryFromUrl } from './mock/adapter-utils';

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
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData | null>(null);

    // Đọc breadcrumb data từ sessionStorage
    useEffect(() => {
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

        // Đọc dữ liệu khi component được tải
        handleStorageChange();

        // Lắng nghe sự kiện storage thay đổi (cho các tab khác)
        window.addEventListener('storage', handleStorageChange);

        // Lắng nghe custom event breadcrumbUpdate từ các component khác
        window.addEventListener('breadcrumbUpdate', handleBreadcrumbUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('breadcrumbUpdate', handleBreadcrumbUpdate);
        };
    }, []);

    // Không hiện breadcrumb ở trang chủ
    if (pathname === '/') return null;

    const paths = pathname.split('/').filter(Boolean);
    const isProductPage = pathname.startsWith('/products');
    const isSolutionPage = pathname.startsWith('/solutions');
    const isAboutPage = pathname.startsWith('/about');
    const isSubPage = paths.length > 1;
    const isProductDetail = isProductPage && paths.length > 3; // Trang chi tiết sản phẩm

    // ===== CategoryTabs logic =====

    // Kiểm tra xem đang ở trang sản phẩm cấp 3 hay không
    const isLevel3ProductPage = () => {
        const urlParts = pathname.split('/').filter(Boolean);
        return urlParts.length > 3 && urlParts[0] === 'products';
    };

    // Kiểm tra xem một tab có đang active hay không
    const isTabActive = (tabId: string, href: string) => {
        // Kiểm tra nếu pathname khớp chính xác với href hoặc bắt đầu bằng href/
        const isPathActive = pathname === href || pathname.startsWith(`${href}/`);

        // Tìm thông tin danh mục từ URL
        const categoryInfo = findCategoryFromUrl(pathname);

        // Tab cũng là active nếu categoryId khớp với tabId
        const isCategoryMatch = categoryInfo?.id === tabId;

        return isPathActive || isCategoryMatch;
    };

    // Tạo hiệu ứng ripple khi click
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

        // Tìm thông tin tab từ tabNavigationData
        const selectedTab = tabNavigationData.find(tab => tab.id === tabId);
        if (selectedTab) {
            // Sử dụng hàm createRippleEffect thay vì createCategoryTabRippleEffect
            createRippleEffect(e, () => {
                // Kích hoạt sự kiện để cập nhật product sidebar
                setCategoryEvent(selectedTab.name);

                // Nếu URL hiện tại đã có query params, giữ lại nhưng reset subcategory
                if (searchParams.toString()) {
                    const newUrl = new URL(window.location.origin + pathname);
                    const newSearchParams = new URLSearchParams(searchParams.toString());
                    newSearchParams.delete('subcategory'); // Xóa subcategory khi chuyển tab

                    // Cập nhật URL không reload trang
                    const newPath = href + (newSearchParams.toString() ? `?${newSearchParams.toString()}` : '');
                    window.history.pushState({}, '', newPath);
                } else {
                    // Cập nhật URL không reload trang
                    window.history.pushState({}, '', href);
                }

                // Kích hoạt custom event để thông báo CategoryTab đã thay đổi
                const event = new CustomEvent('categoryTabChange', { detail: { tabId, name: selectedTab.name } });
                window.dispatchEvent(event);
            });
        }
    };

    // Render CategoryTabs
    const renderCategoryTabs = () => {
        // Chỉ hiển thị category tabs cho trang products và không phải trang chi tiết sản phẩm
        if (!isProductPage || isLevel3ProductPage()) return null;

        return (
            <div className="ml-auto">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-1">
                        {tabNavigationData.map((tab) => {
                            const isActive = isTabActive(tab.id, tab.href);

                            return (
                                <div key={tab.id}>
                                    {renderTab(
                                        tab.name,
                                        isActive,
                                        (e) => {
                                            handleCategoryTabClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, tab.id, tab.href);
                                        }
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    // Tạo tab với CSS chung
    const renderTab = (title: string, isActive: boolean, handleClick: (e: React.MouseEvent) => void) => (
        <div
            onClick={handleClick}
            className={`
                font-medium px-4 py-2 cursor-pointer transition-all duration-300 relative rounded-t-md overflow-hidden
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

            // Chỉ thêm subcategory và product khi xem trang chi tiết sản phẩm
            if (isProductDetail) {
                if (breadcrumbData.subcategory) {
                    breadcrumbItems.push({
                        name: breadcrumbData.subcategory.name,
                        href: breadcrumbData.subcategory.href
                    });
                }

                if (breadcrumbData.product) {
                    breadcrumbItems.push({
                        name: breadcrumbData.product.name,
                        href: breadcrumbData.product.href
                    });
                }
            }
        } else {
            // Fallback cho trường hợp không có dữ liệu từ sessionStorage
            if (paths.length > 1) {
                const categorySlug = paths[1];
                const category = navigation.find(item =>
                    item.href && item.href.split('/').filter(Boolean).pop() === categorySlug
                );

                if (category) {
                    breadcrumbItems.push({
                        name: category.name,
                        href: category.href || '/products'
                    });
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
            const categoryParam = searchParams.get('category');
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