import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { tabNavigationData } from './navigation-data';
import { findCategoryFromUrl } from './mock/adapter-utils';

interface CategoryTabsProps {
    className?: string;
    onTabSelect?: (tabId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ className = '', onTabSelect }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Tạo hiệu ứng ripple khi click
    const createRippleEffect = (event: React.MouseEvent<HTMLElement>) => {
        const button = event.currentTarget;

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
        circle.classList.add('ripple');

        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
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

    // Kiểm tra xem đang ở trang sản phẩm cấp 3 hay không
    const isLevel3ProductPage = () => {
        const urlParts = pathname.split('/').filter(Boolean);
        return urlParts.length > 3 && urlParts[0] === 'products';
    };

    // Xử lý khi click vào tab
    const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string, href: string) => {
        e.preventDefault();
        createRippleEffect(e);

        // Nếu URL hiện tại đã có query params, giữ lại nhưng reset subcategory
        if (searchParams.toString()) {
            const newUrl = new URL(window.location.href);
            const newSearchParams = new URLSearchParams(newUrl.search);
            newSearchParams.delete('subcategory'); // Xóa subcategory khi chuyển tab

            // Cập nhật URL không reload trang
            const newPath = href + (newSearchParams.toString() ? `?${newSearchParams.toString()}` : '');
            window.history.pushState({}, '', newPath);
        } else {
            // Cập nhật URL không reload trang
            window.history.pushState({}, '', href);
        }

        if (onTabSelect) {
            onTabSelect(tabId);
        }
    };

    // Ẩn tab navigation nếu đang ở trang sản phẩm cấp 3
    if (isLevel3ProductPage()) {
        return null;
    }

    return (
        <div className={`category-tabs ${className}`}>
            <div className="bg-white border-b border-gray-200 overflow-x-auto">
                <div className="container mx-auto">
                    <div className="flex">
                        {tabNavigationData.map((tab) => {
                            const isActive = isTabActive(tab.id, tab.href);

                            return (
                                <a
                                    key={tab.id}
                                    href={tab.href}
                                    onClick={(e) => handleTabClick(e, tab.id, tab.href)}
                                    className={`
                                        relative overflow-hidden px-6 py-4 text-sm font-medium
                                        transition-all duration-300 whitespace-nowrap
                                        ${isActive
                                            ? 'text-green-600 border-b-2 border-green-500 -mb-[2px]'
                                            : 'text-gray-700 hover:text-green-600'
                                        }
                                    `}
                                >
                                    {tab.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ripple {
                    position: absolute;
                    background: rgba(0, 128, 0, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CategoryTabs; 