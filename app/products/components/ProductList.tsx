'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ProductAPI } from '@/app/services/api';
import { useProduct } from '../contexts/ProductContext';
import { useCategories } from '@/app/contexts/CategoriesContext';
import ProductSlider from './ProductSlider';
import { useState, useEffect } from 'react';

export default function ProductList() {
    const searchParams = useSearchParams();
    const { cachedProducts, addCachedProducts } = useProduct();
    const { categories, navigation } = useCategories();

    // Lấy thông tin category và subcategory từ URL
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');

    // Log để debug
    useEffect(() => {
        // Ghi lại tất cả các network requests
        const originalFetch = window.fetch;
        window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
            const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
            return originalFetch(input, init);
        };

        return () => {
            // Restore original fetch
            window.fetch = originalFetch;
        };
    }, [categoryParam, subcategoryParam]);

    // Xác định categoryId để fetch data
    const categoryId = subcategoryParam || categoryParam || '';
    const isParentCategory = !!categoryParam && !subcategoryParam;

    // State để lưu trữ title
    const [title, setTitle] = useState<string>('');
    const [categoryData, setCategoryData] = useState<any>(null);

    // Update title và categoryData khi params thay đổi
    useEffect(() => {
        // Tìm thông tin category từ navigation context
        if (navigation && navigation.length > 0) {
            const productNavItem = navigation.find(item => item.name === 'Product' || item.href === '/products');

            if (productNavItem?.submenu) {
                if (subcategoryParam) {
                    // Tìm subcategory
                    for (const category of productNavItem.submenu) {
                        if (category.items) {
                            const subcategory = category.items.find(
                                item => item.id === subcategoryParam
                            );
                            if (subcategory) {
                                setTitle(subcategory.name);
                                setCategoryData(subcategory);
                                break;
                            }
                        }
                    }
                } else if (categoryParam) {
                    // Tìm category
                    const category = productNavItem.submenu.find(
                        cat => cat.title === categoryParam
                    );
                    if (category) {
                        setTitle(`${category.title} Products`);
                        setCategoryData(category);
                    }
                } else {
                    setTitle('All Products');
                    setCategoryData(null);
                }
            }
        }
    }, [categoryParam, subcategoryParam, navigation]);

    // Fetch sản phẩm bằng React Query
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: async () => {
            try {
                const data = await ProductAPI.getProductsList(categoryId);

                // Cache data
                if (data) {
                    addCachedProducts(categoryId, data);
                }

                return data;
            } catch (error) {
                console.error('[ProductList] Error fetching products:', error);
                throw error;
            }
        },
        // Sử dụng dữ liệu từ cache nếu có
        initialData: () => {
            const cached = categoryId ? cachedProducts.get(categoryId) : undefined;
            return cached;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
        enabled: !!categoryId // Chỉ fetch khi có categoryId
    });

    // Hiển thị loading state
    if (isLoading) {
        return (
            <div className="py-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-lg p-4 h-80 animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Đã xảy ra lỗi</h3>
                <p>Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    // Hiển thị thông báo khi chưa chọn danh mục
    if (!categoryId) {
        return (
            <div className="bg-gray-50 p-8 rounded-md text-center">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Vui lòng chọn danh mục</h3>
                <p className="text-gray-500">
                    Hãy chọn một danh mục sản phẩm từ menu bên trái để xem sản phẩm.
                </p>
            </div>
        );
    }

    // Hiển thị thông báo nếu không có sản phẩm
    if (!products || products.length === 0) {
        return (
            <div className="bg-gray-50 p-8 rounded-md text-center">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Không có sản phẩm</h3>
                <p className="text-gray-500">
                    Không tìm thấy sản phẩm nào trong danh mục này.
                </p>
            </div>
        );
    }

    // Hiển thị danh sách sản phẩm
    return (
        <div className="py-4">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>
            <ProductSlider products={products} isParentCategory={isParentCategory} />
        </div>
    );
} 