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
import { createPortal } from 'react-dom';

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

    // Check if an item is a Product navigation item
    const isProductNavItem = (item: any) => {
        return item.name === 'Products' || item.name === 'Product' || item.href === '/products';
    };

    // Render mobile menu bằng portal để tránh bị che bởi header bo góc
    const mobileMenu = isOpen && typeof window !== 'undefined'
        ? createPortal(
            <div className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 left-0 right-0 bg-white border-t overflow-y-auto z-[999]">
                <div className="container mx-auto px-4 py-4">
                    {navigation.map((item) => (
                        <div key={item.name} className="border-b">
                            {item.submenu ? (
                                <button
                                    onClick={() => toggleSection(item.name)}
                                    className="flex items-center justify-between w-full px-4 py-3 text-left"
                                >
                                    <span className="text-base text-gray-900 font-medium">{item.name}</span>
                                    <ChevronRight
                                        className={`h-5 w-5 transform transition-transform ${expandedSections.includes(item.name) ? 'rotate-90' : ''}`}
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={item.href || '/'}
                                    className="block px-4 py-3 text-base text-gray-900 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )}

                            {item.submenu && expandedSections.includes(item.name) && (
                                <div className="pl-4 pb-3">
                                    {item.submenu.map((section) => (
                                        <div key={section.title} className="mb-4">
                                            <Link
                                                href={isProductNavItem(item)
                                                    ? `/products?category=${encodeURIComponent(section.title)}`
                                                    : section.href || (section.title === 'Our Company'
                                                        ? '/about/overview'
                                                        : section.title === 'Join Us'
                                                            ? '/about/join-us'
                                                            : '/')}
                                                className="block px-4 py-2 font-medium text-green-600 text-sm hover:underline"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {section.title}
                                            </Link>
                                            {section.items && (
                                                <ul className="space-y-1 pl-4">
                                                    {section.items.map((subItem) => (
                                                        <li key={subItem.name}>
                                                            <Link
                                                                href={isProductNavItem(item)
                                                                    ? `/products?category=${encodeURIComponent(section.title)}&subcategory=${encodeURIComponent(subItem.name || '')}`
                                                                    : subItem.href || '/'}
                                                                className="block px-4 py-2 text-sm text-gray-700"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>,
            document.body
        ) : null;

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100]",
                isHomePage ? "" : "flex justify-center w-full",
                isHomePage || scrolled ? "" : "py-2"
            )}
        >
            <div
                className={cn(
                    "w-full px-4 sm:px-6 lg:px-8 relative",
                    isHomePage
                        ? "bg-white shadow-md"
                        : scrolled
                            ? "bg-white shadow-md transition-colors duration-300"
                            : "w-[95%] md:max-w-[90%] lg:max-w-[80%] bg-[#EEE]/60 bg-opacity-40 backdrop-blur-sm rounded-2xl",
                )}
            >
                <div className={cn(
                    "flex h-16 md:h-20 items-center",
                    (!isHomePage && !scrolled) ? "justify-between" : "justify-between"
                )}>
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/other/cosmos-web-logo.png"
                                width={200}
                                height={60}
                                alt="Cosmos Logo"
                                className="object-contain h-8 md:h-12 w-auto"
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
                                                                        // When clicking on a parent tab like "UPS Power Supply"
                                                                        try {
                                                                            const { setProductCategoryEvent } = require('./ProductSidebar');
                                                                            // Trigger both events to ensure consistent handling
                                                                            setProductCategoryEvent(section.title, null);
                                                                            // Trigger productCategorySelected event to update UI
                                                                            const productCategoryEvent = new CustomEvent('productCategorySelected', {
                                                                                detail: { category: section.title, subcategory: null },
                                                                                bubbles: true,
                                                                                composed: true
                                                                            });
                                                                            window.dispatchEvent(productCategoryEvent);
                                                                            // Trigger categorySelected event to update product list
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
                                                                        // Handle other parent tabs (Solution, Service Support)
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
                                                                                // Sync with ProductSidebar
                                                                                try {
                                                                                    const { setProductCategoryEvent } = require('./ProductSidebar');
                                                                                    // Pass subcategory name instead of id
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
            </div>
            {mobileMenu}
        </header>
    );
};

export default Navigation;