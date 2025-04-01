'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCategories } from '@/app/contexts/CategoriesContext';
import { useRouter } from 'next/navigation';
import { cloneElement } from 'react';

const Navigation = () => {
    const { navigation } = useCategories();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const router = useRouter();

    const toggleSection = (sectionName: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionName)
                ? prev.filter(name => name !== sectionName)
                : [...prev, sectionName]
        );
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Kiểm tra xem một item có phải là Product navigation item hay không
    const isProductNavItem = (item: any) => {
        return item.name === 'Products' || item.name === 'Product' || item.href === '/products';
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                isHomePage ? "" : "flex justify-center",
                isHomePage || scrolled ? "" : "py-2"
            )}
        >
            <div
                className={cn(
                    "px-4 sm:px-6 lg:px-20",
                    isHomePage
                        ? "w-full bg-white shadow-md"
                        : scrolled
                            ? "w-full bg-white shadow-md transition-colors duration-300"
                            : "max-w-[80%] w-[1340px] bg-[#EEE]/60 bg-opacity-40 backdrop-blur-sm rounded-2xl",
                )}
            >
                <div className={cn(
                    "flex h-20 items-center",
                    (!isHomePage && !scrolled) ? "justify-between" : "justify-between"
                )}>
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/other/cosmos-web-logo.png"
                                width={350}
                                height={100}
                                alt="Cosmos Logo"
                                className="object-cover"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className={cn(
                        "hidden lg:flex items-center h-full",
                        (!isHomePage && !scrolled) ? "justify-end gap-x-6" : "justify-center gap-x-4"
                    )}>
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.submenu ? (
                                    <div
                                        className={cn(
                                            "px-3 py-2 text-[16px] font-medium border-b-2 border-transparent hover:border-current transition-colors duration-300 cursor-default",
                                            isHomePage || scrolled
                                                ? "text-gray-700 hover:text-green-600"
                                                : "text-gray-700 hover:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href || '/'}
                                        className={cn(
                                            "px-3 py-2 text-[16px] font-medium border-b-2 border-transparent hover:border-current transition-colors duration-300",
                                            isHomePage || scrolled
                                                ? "text-gray-700 hover:text-green-600"
                                                : "text-gray-700 hover:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {item.submenu && (
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 pt-7 w-screen min-w-[20px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                                        style={{
                                            width: `${(!item.submenu[0].items ? 1 : item.submenu.length) * 150}px`,
                                            height: `20px`
                                        }}
                                    >
                                        <div className="bg-white rounded-lg shadow-xl border border-gray-100">
                                            <div className={`px-6 py-4 ${item.submenu.length >= 2 ? 'grid grid-flow-col grid-rows-2' : 'flex'} gap-4`}>
                                                {item.submenu.map((section) => (
                                                    <div key={section.title}>
                                                        {section.items ? (
                                                            <Link
                                                                href={isProductNavItem(item)
                                                                    ? `/products?category=${encodeURIComponent(section.title)}`
                                                                    : section.href || '/'}
                                                                onClick={(e) => {
                                                                    if (isProductNavItem(item)) {
                                                                        // Khi click vào tab cha như "UPS Power Supply"
                                                                        try {
                                                                            const { setProductCategoryEvent } = require('./ProductSidebar');
                                                                            // Kích hoạt cả hai sự kiện để đảm bảo xử lý nhất quán
                                                                            setProductCategoryEvent(section.title, null);
                                                                            // Kích hoạt sự kiện productCategorySelected để cập nhật UI
                                                                            const productCategoryEvent = new CustomEvent('productCategorySelected', {
                                                                                detail: { category: section.title, subcategory: null },
                                                                                bubbles: true,
                                                                                composed: true
                                                                            });
                                                                            window.dispatchEvent(productCategoryEvent);
                                                                            // Kích hoạt sự kiện categorySelected để cập nhật danh sách sản phẩm
                                                                            const categoryEvent = new CustomEvent('categorySelected', {
                                                                                detail: { category: section.title, subcategory: null },
                                                                                bubbles: true,
                                                                                composed: true
                                                                            });
                                                                            window.dispatchEvent(categoryEvent);
                                                                            e.preventDefault();
                                                                            router.push(`/products?category=${encodeURIComponent(section.title)}`);
                                                                        } catch (error) {
                                                                            console.error('Error importing setProductCategoryEvent:', error);
                                                                        }
                                                                    } else {
                                                                        // Xử lý cho các tab cha khác (Solution, Service Support)
                                                                    }
                                                                }}
                                                            >
                                                                <h3 className="font-semibold text-gray-900 pb-2 text-green-600 text-ellipsis overflow-hidden whitespace-nowrap hover:underline">
                                                                    {section.title}
                                                                </h3>
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={section.href || '/'}
                                                                className="text-sm text-gray-600 hover:text-green-600 block transition-colors duration-200 hover:underline"
                                                            >
                                                                {section.title}
                                                            </Link>
                                                        )}
                                                        <ul className="space-y-2">
                                                            {section.items?.map((subItem) => (
                                                                <li key={subItem.name}>
                                                                    <Link
                                                                        href={isProductNavItem(item)
                                                                            ? `/products?category=${encodeURIComponent(section.title)}&subcategory=${(subItem.name || '').replace(/ /g, '%20')}`
                                                                            : subItem.href || '/'}
                                                                        className="text-sm text-gray-600 hover:text-green-600 block transition-colors duration-200 hover:underline"
                                                                        onClick={(e) => {
                                                                            if (isProductNavItem(item)) {
                                                                                // Đồng bộ với ProductSidebar
                                                                                try {
                                                                                    const { setProductCategoryEvent } = require('./ProductSidebar');
                                                                                    // Truyền tên subcategory thay vì id
                                                                                    setProductCategoryEvent(section.title, subItem.name || null);
                                                                                } catch (error) {
                                                                                    console.error('Error importing setProductCategoryEvent:', error);
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700"
                        >
                            <span className="sr-only">Open menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white border-t overflow-y-auto">
                        <div className="container mx-auto px-4 py-4">
                            {navigation.map((item) => (
                                <div key={item.name} className="border-b">
                                    {item.submenu ? (
                                        <button
                                            onClick={() => toggleSection(item.name)}
                                            className="flex items-center justify-between w-full px-4 py-3 text-left"
                                        >
                                            <span className="text-gray-900 font-medium">{item.name}</span>
                                            <ChevronRight
                                                className={`h-5 w-5 transform transition-transform ${expandedSections.includes(item.name) ? 'rotate-90' : ''}`}
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href || '/'}
                                            className="flex items-center justify-between w-full px-4 py-3 text-left"
                                        >
                                            <span className="text-gray-900 font-medium">{item.name}</span>
                                        </Link>
                                    )}

                                    {item.submenu && expandedSections.includes(item.name) && (
                                        <div className="bg-gray-50">
                                            {item.submenu.map((section) => (
                                                <div key={section.title} className="px-4 py-2">
                                                    <Link href={section.href || '/'}>
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-2 hover:text-green-600">
                                                            {section.title}
                                                        </h3>
                                                    </Link>
                                                    <ul className="space-y-1">
                                                        {section.items?.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    href={subItem.href || '/'}
                                                                    className="block py-2 text-sm text-gray-600 hover:text-green-600"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navigation;