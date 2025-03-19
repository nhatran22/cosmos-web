'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import TabNavigation from './tab-navigation';
import { navigation } from './mock/header-navigation';

interface BreadcrumbItemType {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

export default function Breadcrumb() {
    const pathname = usePathname();
    const router = useRouter();

    // Không hiện breadcrumb ở trang chủ
    if (pathname === '/') {
        return null;
    }

    const paths = pathname.split('/').filter(Boolean);
    const isProductPage = pathname.startsWith('/products');
    const isSolutionPage = pathname.startsWith('/solutions');
    const isAboutPage = pathname.startsWith('/about');

    // Xử lý đặc biệt cho trang sản phẩm hoặc giải pháp
    if (isProductPage || isSolutionPage) {
        console.log(isProductPage);
        console.log(isSolutionPage);
        const breadcrumbItems: BreadcrumbItemType[] = [];

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

            // Nếu là trang chi tiết sản phẩm (có nhiều hơn 1 segment)
            if (paths.length > 1) {
                const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');

                if (productNav?.submenu) {
                    // Tìm danh mục và sản phẩm hiện tại
                    const currentProductUrl = `/${paths.slice(0, 2).join('/')}`;
                    let foundCategory = null;
                    let foundProduct = null;

                    // Tìm kiếm trong danh mục và sản phẩm
                    for (const category of productNav.submenu) {
                        if (category.items) {
                            // Tìm sản phẩm trong danh mục này
                            const product = category.items.find(item => item.href === currentProductUrl);
                            if (product) {
                                foundCategory = category;
                                foundProduct = product;
                                break;
                            }
                        }
                    }

                    // Thêm danh mục nếu tìm thấy
                    if (foundCategory) {
                        breadcrumbItems.push({
                            name: foundCategory.title,
                            href: foundCategory.href || '/products'
                        });
                    }

                    // Thêm sản phẩm nếu tìm thấy
                    if (foundProduct) {
                        breadcrumbItems.push({
                            name: foundProduct.name,
                            href: foundProduct.href || '/products'
                        });
                    }
                }
            }
        } else if (isSolutionPage) {
            // Thêm Solutions vào breadcrumb
            breadcrumbItems.push({
                name: 'Solutions',
                href: '/solutions'
            });

            // Nếu là trang chi tiết giải pháp (có nhiều hơn 1 segment)
            if (paths.length > 1) {
                const solutionNav = navigation.find(item => item.name === 'Solution' || item.href === '/solutions');

                if (solutionNav?.submenu) {
                    // Tìm danh mục và giải pháp hiện tại
                    const currentSolutionUrl = `/${paths.slice(0, 2).join('/')}`;
                    let foundCategory = null;
                    let foundSolution = null;

                    // Tìm kiếm trong danh mục và giải pháp
                    for (const category of solutionNav.submenu) {
                        if (category.items) {
                            // Tìm giải pháp trong danh mục này
                            const solution = category.items.find(item => item.href === currentSolutionUrl);
                            if (solution) {
                                foundCategory = category;
                                foundSolution = solution;
                                break;
                            }
                        }
                    }

                    // Thêm danh mục nếu tìm thấy
                    if (foundCategory) {
                        breadcrumbItems.push({
                            name: foundCategory.title,
                            href: foundCategory.href || '/solutions'
                        });
                    }

                    // Thêm giải pháp nếu tìm thấy
                    if (foundSolution) {
                        breadcrumbItems.push({
                            name: foundSolution.name,
                            href: foundSolution.href || '/solutions'
                        });
                    }
                }
            }
        }

        // Hiển thị breadcrumb kiểu sản phẩm/giải pháp
        return (
            <div className="bg-gray-100 py-3 rounded-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {breadcrumbItems.map((item, index) => (
                            <div key={index} className="flex items-center">
                                {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
                                <Link
                                    href={item.href}
                                    className={`flex items-center hover:text-blue-600 transition-colors`}
                                >
                                    {item.icon && <span className="mr-1">{item.icon}</span>}
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        console.log(paths);
        // Xử lý cho các trang khác không phải sản phẩm hoặc giải pháp
        const generalBreadcrumbs = paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
            return { href, label };
        });

        // Hiển thị TabNavigation cho trang About
        const shouldShowTabNav = isAboutPage && paths.length > 0;

        // Tìm các tab của About để hiển thị ngay cả khi ở trang con
        let aboutTabs = null;
        if (isAboutPage) {
            const aboutNav = navigation.find(item => item.name === 'About Us');
            if (aboutNav?.submenu) {
                aboutTabs = (
                    <div>
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-8">
                                {aboutNav.submenu.map((tab, index) => (
                                    <div
                                        key={index}
                                        onClick={() => router.push(tab.href || '/about')}
                                        className={`
                                            font-medium px-4 py-2 cursor-pointer transition-all duration-200 rounded-md relative
                                            ${pathname.includes(tab.href || '')
                                                ? 'text-blue-600 bg-white shadow-md'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-200'
                                            }
                                        `}
                                    >
                                        {tab.title}
                                        {pathname.includes(tab.href || '') && (
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-b-md"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="flex justify-between px-20">
                <div className="flex justify-between items-center px-20">
                    <div className="flex flex-row py-4">
                        <div className="mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Link href="/" className="hover:text-blue-600">
                                    <Home className="h-4 w-4" />
                                </Link>
                                {generalBreadcrumbs.map((breadcrumb, index) => (
                                    <div key={breadcrumb.href} className="flex items-center">
                                        <ChevronRight className="h-4 w-4 mx-2" />
                                        <Link
                                            href={breadcrumb.href}
                                            className={`hover:text-blue-600 ${index === generalBreadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''
                                                }`}
                                        >
                                            {breadcrumb.label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hiển thị tab navigation cho trang About */}
                {aboutTabs}
            </div>
        );
    }
} 