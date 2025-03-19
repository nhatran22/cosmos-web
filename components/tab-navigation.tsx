'use client';

import { usePathname, useRouter } from 'next/navigation';
import { navigation } from './mock/header-navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ActiveTab {
    parentName: string;
    submenuTitle: string;
    submenuHref: string;
}

const TabNavigation = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [activeParent, setActiveParent] = useState<string | null>(null);
    const [activeSubmenus, setActiveSubmenus] = useState<ActiveTab[]>([]);
    const [selectedTab, setSelectedTab] = useState<string | null>(null);

    useEffect(() => {
        if (pathname === '/' || pathname.startsWith('/products')) {
            // Don't show tab navigation on home page or any product pages
            setActiveParent(null);
            setActiveSubmenus([]);
            return;
        }

        // For other pages, use the original tab detection logic (showing only on first-level pages)
        const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
        if (pathSegments.length > 1) {
            // This is a deeper level page, don't show tabs
            setActiveParent(null);
            setActiveSubmenus([]);
            return;
        }

        // Only for first level pages
        let foundParent = null;
        const matchedSubmenus: ActiveTab[] = [];

        for (const navItem of navigation) {
            if (!navItem.submenu) continue;

            // Check if current path matches the parent path
            if (pathname === navItem.href) {
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
    }, [pathname]);

    // Only display on first-level pages and when there are submenus to show
    if (!activeParent || activeSubmenus.length === 0) {
        return null;
    }

    const handleTabClick = (href: string) => {
        setSelectedTab(href);
        if (href) {  // Only navigate if href is defined
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
                            onClick={() => handleTabClick(tab.submenuHref)}
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