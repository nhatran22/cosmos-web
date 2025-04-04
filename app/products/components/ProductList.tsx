'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { ProductAPI } from '@/app/services/api';
import { useProduct } from '../contexts/ProductContext';
import { useCategories } from '@/app/contexts/CategoriesContext';
import ProductSlider from './ProductSlider';
import { useState, useEffect } from 'react';
import { IProductListItem } from '@/app/interface/product';

interface NavigationItem {
    name: string;
    href: string;
    submenu?: {
        title: string;
        items?: {
            id?: string;
            name: string;
            image?: string;
            fullName?: string;
        }[];
    }[];
}

interface CategoryItem {
    id?: string;
    name: string;
    image?: string;
    fullName?: string;
}

// Helper functions
const getSafeTitle = (value: string | null, defaultValue: string = 'Products'): string => value || defaultValue;
const normalizeParam = (param: string | null): string | null =>
    param ? decodeURIComponent(param).replace(/\+/g, ' ') : null;

const createProductFromItem = (item: CategoryItem, category: string): IProductListItem => ({
    id: item.id || item.name.replace(/\s+/g, '-').toLowerCase(),
    name: item.name,
    image: item.image || '/images/default-product.jpg',
    description: item.fullName || item.name,
    catalogue: category,
    originalItem: item
});

const findProductNavItem = (navigation: NavigationItem[]): NavigationItem | undefined =>
    navigation.find(item => item.name === 'Products' || item.name === 'Product' || item.href === '/products');

const hasValidSubmenu = (productNavItem: NavigationItem | undefined): boolean =>
    !!productNavItem?.submenu && productNavItem.submenu.length > 0;

export default function ProductList() {
    const searchParams = useSearchParams();
    const { cachedProducts, addCachedProducts, activeParentTab, setActiveParentTab } = useProduct();
    const { categories, navigation } = useCategories();

    // URL params
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    const normalizedCategoryParam = normalizeParam(categoryParam);
    const normalizedSubcategoryParam = normalizeParam(subcategoryParam);

    // States
    const [title, setTitle] = useState<string>('');
    const [categoryData, setCategoryData] = useState<any>(null);
    const [effectiveId, setEffectiveId] = useState<string>(subcategoryParam || normalizedCategoryParam || '');

    // Derived states
    const isParentCategory = !!normalizedCategoryParam && !subcategoryParam;
    const categoryId = subcategoryParam || normalizedCategoryParam || '';

    // Update title and categoryData
    useEffect(() => {
        if (!categories?.length) return;

        const productNavItem = findProductNavItem(navigation);
        if (!hasValidSubmenu(productNavItem)) return;

        if (subcategoryParam) {
            const category = normalizedCategoryParam
                ? productNavItem?.submenu?.find(cat => cat.title === normalizedCategoryParam)
                : null;

            const subcategory = category?.items?.find(
                item => item.name === normalizedSubcategoryParam || item.id === normalizedSubcategoryParam
            ) || productNavItem?.submenu?.flatMap(cat => cat.items || [])
                .find(item => item.name === normalizedSubcategoryParam || item.id === normalizedSubcategoryParam);

            if (subcategory) {
                setTitle(getSafeTitle(subcategory.name, normalizedSubcategoryParam || undefined));
                setCategoryData(subcategory);
            } else {
                setTitle(getSafeTitle(normalizedSubcategoryParam));
                setCategoryData(null);
            }
        } else if (normalizedCategoryParam) {
            const category = productNavItem?.submenu?.find(cat => cat.title === normalizedCategoryParam);
            if (category) {
                setTitle(`${getSafeTitle(category.title)} Products`);
                setCategoryData(category);
            } else {
                setTitle(getSafeTitle(normalizedCategoryParam));
                setCategoryData(null);
            }
        } else {
            setTitle('All Products');
            setCategoryData(null);
        }
    }, [normalizedCategoryParam, subcategoryParam, navigation, categories]);

    // Handle product category selection
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleProductCategorySelected = (event: Event) => {
            const { category, subcategory } = (event as CustomEvent).detail || {};
            const normalizedCategory = normalizeParam(category);
            const normalizedSubcategory = normalizeParam(subcategory);

            if (normalizedCategory && !normalizedSubcategory) {
                // Update activeParentTab when selecting parent tab
                setActiveParentTab(normalizedCategory);

                const productNavItem = findProductNavItem(navigation);
                if (!hasValidSubmenu(productNavItem)) return;

                const selectedCategory = productNavItem?.submenu?.find(cat => cat.title === normalizedCategory);
                const products = selectedCategory?.items?.length
                    ? selectedCategory.items.map(item => createProductFromItem(item, normalizedCategory))
                    : [];

                addCachedProducts(normalizedCategory, products);
            }
        };

        window.addEventListener('productCategorySelected', handleProductCategorySelected as EventListener, true);
        if (normalizedCategoryParam) {
            window.dispatchEvent(new CustomEvent('productCategorySelected', {
                detail: { category: normalizedCategoryParam, subcategory: null },
                bubbles: true
            }));
        }

        return () => window.removeEventListener('productCategorySelected', handleProductCategorySelected as EventListener, true);
    }, [navigation, addCachedProducts, normalizedCategoryParam, categories, setActiveParentTab]);

    // Handle sidebar category selection
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleCategorySelected = (event: CustomEvent) => {
            const { category, subcategory } = event.detail;
            const normalizedCategory = normalizeParam(category);
            const normalizedSubcategory = normalizeParam(subcategory);

            if (normalizedCategory && !normalizedSubcategory) {
                // Update activeParentTab when selecting parent tab from sidebar
                setActiveParentTab(normalizedCategory);

                const productNavItem = findProductNavItem(navigation);
                if (!hasValidSubmenu(productNavItem)) return;

                const selectedCategory = productNavItem?.submenu?.find(cat => cat.title === normalizedCategory);
                const products = selectedCategory?.items?.length
                    ? selectedCategory.items.map(item => createProductFromItem(item, normalizedCategory))
                    : [];

                addCachedProducts(normalizedCategory, products);
            }
        };

        window.addEventListener('categorySelected', handleCategorySelected as EventListener);
        return () => window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
    }, [navigation, addCachedProducts, categories, setActiveParentTab]);

    // Update effectiveId
    useEffect(() => {
        if (subcategoryParam) {
            const productNavItem = findProductNavItem(navigation);
            if (hasValidSubmenu(productNavItem) && normalizedCategoryParam) {
                const category = productNavItem?.submenu?.find(cat => cat.title === normalizedCategoryParam);
                const subcategory = category?.items?.find(
                    item => item.name === normalizedSubcategoryParam
                );
                if (subcategory?.id) {
                    setEffectiveId(subcategory.id);
                    return;
                }
            }
        }
        setEffectiveId(categoryId);
    }, [subcategoryParam, categoryId, navigation, normalizedCategoryParam]);

    // Fetch products with modified logic
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', effectiveId, normalizedCategoryParam, categories, activeParentTab],
        queryFn: async () => {
            try {
                // If there's no activeParentTab and no normalizedCategoryParam,
                // we are on the main product page with no parent tab selected
                if (!activeParentTab && !normalizedCategoryParam && !subcategoryParam) {
                    return []; // Return empty array to display blank page
                }

                if (isParentCategory && normalizedCategoryParam) {
                    const cachedParentProducts = cachedProducts.get(normalizedCategoryParam);
                    if (cachedParentProducts?.length) return cachedParentProducts;

                    const productNavItem = findProductNavItem(navigation);
                    if (!hasValidSubmenu(productNavItem)) return [];

                    const selectedCategory = productNavItem?.submenu?.find(cat => cat.title === normalizedCategoryParam);
                    if (selectedCategory?.items?.length) {
                        const products = selectedCategory.items.map(item => createProductFromItem(item, normalizedCategoryParam));
                        addCachedProducts(normalizedCategoryParam, products);
                        return products;
                    }
                    return [];
                }

                const cachedData = cachedProducts.get(effectiveId);
                if (cachedData?.length) return cachedData;

                const data = await ProductAPI.getProductsList(effectiveId);
                if (data?.length) {
                    const productData = data.map(item => ({
                        id: item.id!,
                        name: title,
                        image: item.image,
                        description: item.name,
                    } as IProductListItem));
                    addCachedProducts(effectiveId, productData);
                    return productData;
                }
                return [];
            } catch (error) {
                console.error('[ProductList] Error fetching products:', error);
                return [];
            }
        },
        initialData: () => {
            if (!categories?.length) return undefined;
            if (isParentCategory && normalizedCategoryParam) {
                return cachedProducts.get(normalizedCategoryParam);
            }
            return effectiveId ? cachedProducts.get(effectiveId) : undefined;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!categories
    });

    // Display UI when no tab is selected
    if (products?.length === 0 && !isLoading && !activeParentTab && !normalizedCategoryParam && !subcategoryParam) {
        return (
            <div className="w-full py-12 text-center">
                <h1 className="text-2xl font-semibold mb-6">{title || 'Products'}</h1>
                <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-blue-500 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-lg mb-2 font-medium text-blue-700">Please select a product category</p>
                    <p className="text-blue-600">Choose a product category from the left menu to view corresponding products.</p>
                </div>
            </div>
        );
    }

    // Loading state
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

    // Product list
    return (
        <div className="py-4">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>
            <ProductSlider products={products!} isParentCategory={isParentCategory} />
        </div>
    );
} 