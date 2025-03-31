'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { ProductAPI } from '@/app/services/api';
import { useProduct } from '../contexts/ProductContext';
import { useCategories } from '@/app/contexts/CategoriesContext';
import ProductSlider from './ProductSlider';
import { useState, useEffect } from 'react';
import { IProductListItem } from '@/app/interface/product';

export default function ProductList() {
    const searchParams = useSearchParams();
    const { cachedProducts, addCachedProducts } = useProduct();
    const { categories, navigation } = useCategories();

    // Lấy thông tin category và subcategory từ URL
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');

    // Xác định có phải đang ở tab cha không (có category nhưng không có subcategory)
    const isParentCategory = !!categoryParam && !subcategoryParam;

    // Xác định categoryId để fetch data
    const categoryId = subcategoryParam || categoryParam || '';

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

    // Xử lý sự kiện từ ProductSidebar
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleCategorySelected = (event: CustomEvent) => {
            const { category, isSubcategory, isParentCategory } = event.detail;

            if (isParentCategory) {
                const data = navigation.find(item => item.name === 'Products')?.submenu?.find(item => item.title === category);
                const allProducts = data?.items?.map((item) => {
                    return {
                        id: item.id!,
                        name: item.fullName,
                        catalogue: category,
                        image: item.image,
                    } as IProductListItem;
                });
                addCachedProducts(category, allProducts!);
            } else if (isSubcategory) {
                console.log(1);
            }
        };

        // Đăng ký event listener
        window.addEventListener('categorySelected', handleCategorySelected as EventListener);

        return () => {
            window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
        };
    }, [navigation, addCachedProducts]);

    // Fetch sản phẩm bằng React Query
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: async () => {
            try {
                // Nếu đang ở tab cha, kiểm tra cache trước
                if (isParentCategory && categoryParam) {
                    const cachedParentProducts = cachedProducts.get(categoryParam);
                    if (cachedParentProducts && cachedParentProducts.length > 0) {
                        return cachedParentProducts;
                    }
                } else {
                    // Nếu không có trong cache hoặc không phải tab cha, fetch từ API
                    const data = await ProductAPI.getProductsList(categoryId);

                    // Cache data
                    if (data) {
                        const getProductName = (id: string) => {
                            const data = navigation.find(item => item.name === 'Products')?.submenu?.find(item => item.title === categoryParam)?.items?.find(item => item.id === subcategoryParam);
                            return data?.fullName;
                        }
                        const productData = data.map((item) => {
                            return {
                                id: item.id!,
                                name: getProductName(item.id!),
                                image: item.image,
                                description: item.name,
                            } as IProductListItem;
                        })

                        addCachedProducts(categoryId, productData);
                        return productData;
                    } else {
                        return data;
                    }
                }

            } catch (error) {
                console.error('[ProductList] Error fetching products:', error);
                throw error;
            }
        },
        // Sử dụng dữ liệu từ cache nếu có
        initialData: () => {
            // Nếu đang ở tab cha, kiểm tra cache cho categoryParam
            if (isParentCategory && categoryParam) {
                const cachedParentProducts = cachedProducts.get(categoryParam);
                if (cachedParentProducts && cachedParentProducts.length > 0) {
                    return cachedParentProducts;
                }
            }

            // Nếu không, kiểm tra cache thông thường
            const cached = categoryId ? cachedProducts.get(categoryId) : undefined;
            return cached;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
        // Kích hoạt query trong mọi trường hợp, kể cả khi không có categoryId
        // Điều này cho phép hiển thị dữ liệu từ cache cho tab cha 
        enabled: !isParentCategory ? !!categoryId : true
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