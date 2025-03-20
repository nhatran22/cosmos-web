'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { navigation } from './mock/header-navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { setCategoryEvent } from './product-sidebar';
import { setSolutionCategoryEvent } from './solution-sidebar';

interface ActiveTab {
    parentName: string;
    submenuTitle: string;
    submenuHref: string;
}

const TabNavigation = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeParent, setActiveParent] = useState<string | null>(null);
    const [activeSubmenus, setActiveSubmenus] = useState<ActiveTab[]>([]);
    const [selectedTab, setSelectedTab] = useState<string | null>(null);

    useEffect(() => {
        // Xác định loại trang hiện tại
        const isProductPage = pathname.startsWith('/products');
        const isSolutionPage = pathname.startsWith('/solutions');

        // Kiểm tra nếu đây là trang con (có nhiều hơn 1 segment trong URL)
        const pathSegments = pathname.split('/').filter(Boolean);
        const isSubPage = pathSegments.length > 1;

        // Nếu là trang con của products hoặc solutions, không hiển thị tab navigation
        if ((isProductPage || isSolutionPage) && isSubPage) {
            setActiveParent(null);
            setActiveSubmenus([]);
            return;
        }

        // Lấy category từ URL nếu có
        const categoryParam = searchParams.get('category');

        if (isProductPage && !isSubPage) {
            // Hiển thị tabs cho trang product (chỉ ở trang chính)
            const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');

            if (productNav?.submenu) {
                setActiveParent('Product');

                // Tạo danh sách tabs từ submenu
                const productTabs = productNav.submenu.map(submenu => ({
                    parentName: 'Product',
                    submenuTitle: submenu.title,
                    submenuHref: `/products?category=${encodeURIComponent(submenu.title)}`
                }));

                setActiveSubmenus(productTabs);

                // Xác định tab được chọn dựa vào category trong URL
                if (categoryParam) {
                    // Tìm tab chính xác hoặc gần đúng nếu có
                    const matchingTab = productTabs.find(tab =>
                        tab.submenuTitle === categoryParam ||
                        tab.submenuTitle.toLowerCase().includes(categoryParam.toLowerCase()) ||
                        categoryParam.toLowerCase().includes(tab.submenuTitle.toLowerCase())
                    );

                    if (matchingTab) {
                        setSelectedTab(matchingTab.submenuHref);
                    } else if (productTabs.length > 0) {
                        // Nếu không tìm thấy, chọn tab đầu tiên
                        setSelectedTab(productTabs[0].submenuHref);
                    }
                } else if (productTabs.length > 0) {
                    // Mặc định chọn tab đầu tiên nếu không có category
                    setSelectedTab(productTabs[0].submenuHref);

                    // Cập nhật URL để phản ánh tab được chọn
                    const firstTabTitle = productTabs[0].submenuTitle;
                    router.replace(`/products?category=${encodeURIComponent(firstTabTitle)}`, { scroll: false });

                    // Gửi event để hiển thị nội dung đầu tiên
                    setCategoryEvent(firstTabTitle);
                }
            }
        } else if (isSolutionPage && !isSubPage) {
            // Hiển thị tabs cho trang solution (chỉ ở trang chính)
            const solutionNav = navigation.find(item => item.name === 'Solution' || item.href === '/solutions');

            if (solutionNav?.submenu) {
                setActiveParent('Solution');

                // Tạo danh sách tabs từ submenu
                const solutionTabs = solutionNav.submenu.map(submenu => ({
                    parentName: 'Solution',
                    submenuTitle: submenu.title,
                    submenuHref: `/solutions?category=${encodeURIComponent(submenu.title)}`
                }));

                setActiveSubmenus(solutionTabs);

                // Xác định tab được chọn dựa vào category trong URL
                if (categoryParam) {
                    // Tìm tab chính xác hoặc gần đúng nếu có
                    const matchingTab = solutionTabs.find(tab =>
                        tab.submenuTitle === categoryParam ||
                        tab.submenuTitle.toLowerCase().includes(categoryParam.toLowerCase()) ||
                        categoryParam.toLowerCase().includes(tab.submenuTitle.toLowerCase())
                    );

                    if (matchingTab) {
                        setSelectedTab(matchingTab.submenuHref);
                    } else if (solutionTabs.length > 0) {
                        // Nếu không tìm thấy, chọn tab đầu tiên
                        setSelectedTab(solutionTabs[0].submenuHref);
                    }
                } else if (solutionTabs.length > 0) {
                    // Mặc định chọn tab đầu tiên nếu không có category
                    setSelectedTab(solutionTabs[0].submenuHref);

                    // Cập nhật URL để phản ánh tab được chọn
                    const firstTabTitle = solutionTabs[0].submenuTitle;
                    router.replace(`/solutions?category=${encodeURIComponent(firstTabTitle)}`, { scroll: false });

                    // Gửi event để hiển thị nội dung đầu tiên
                    setSolutionCategoryEvent(firstTabTitle);
                }
            }
        } else if (pathname === '/' || pathname.length <= 1) {
            // Không hiển thị tabs ở trang chủ
            setActiveParent(null);
            setActiveSubmenus([]);
            return;
        } else {
            // Xử lý cho các trang khác (giữ nguyên logic cũ)
            const pathSegments = pathname.split('/').filter(segment => segment.length > 0);

            let foundParent = null;
            const matchedSubmenus: ActiveTab[] = [];

            for (const navItem of navigation) {
                if (!navItem.submenu) continue;

                // Check if current path matches the parent path
                if (pathname === navItem.href || (pathSegments.length > 0 && navItem.href?.includes(pathSegments[0]))) {
                    foundParent = navItem.name;

                    // Get all submenus for this parent
                    navItem.submenu.forEach(submenu => {
                        matchedSubmenus.push({
                            parentName: navItem.name,
                            submenuTitle: submenu.title,
                            submenuHref: submenu.href || navItem.href
                        });
                    });

                    break;
                }
            }

            setActiveParent(foundParent);
            setActiveSubmenus(matchedSubmenus);
        }
    }, [pathname, searchParams]);

    // Only display when there are submenus to show
    if (!activeParent || activeSubmenus.length === 0) {
        return null;
    }

    const handleTabClick = (href: string, tabTitle: string) => {
        setSelectedTab(href);
        if (href) {
            // Xác định nếu đây là trang product hay solution và gửi event tương ứng
            const isProductPage = pathname.startsWith('/products');
            const isSolutionPage = pathname.startsWith('/solutions');

            if (isProductPage) {
                // Gửi event để hiển thị danh sách sản phẩm tương ứng
                setCategoryEvent(tabTitle);
            } else if (isSolutionPage) {
                // Gửi event để hiển thị danh sách giải pháp tương ứng
                setSolutionCategoryEvent(tabTitle);
            }

            // Chuyển hướng đến URL với category tương ứng
            router.push(href);
        }
    };

    return (
        <div className="bg-[#EEE] py-4 border-b border-gray-300 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center space-x-8">
                    {activeSubmenus.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => handleTabClick(tab.submenuHref, tab.submenuTitle)}
                            className={`
                                font-medium px-4 py-2 cursor-pointer transition-all duration-200 rounded-md relative
                                ${selectedTab === tab.submenuHref
                                    ? 'text-green-600 bg-white shadow-md'
                                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-200'}
                            `}
                        >
                            {tab.submenuTitle}
                            {selectedTab === tab.submenuHref && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 rounded-b-md"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabNavigation; 