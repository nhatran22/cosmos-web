'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { IProductListItem } from '@/app/interface/product';
import { useSearchParams } from 'next/navigation';

interface ProductContextType {
    cachedProducts: Map<string, IProductListItem[]>;
    addCachedProducts: (categoryId: string, products: IProductListItem[]) => void;
    clearCache: () => void;
    activeParentTab: string | null;
    setActiveParentTab: (tabId: string | null) => void;
}

const ProductContext = createContext<ProductContextType>({
    cachedProducts: new Map(),
    addCachedProducts: () => { },
    clearCache: () => { },
    activeParentTab: null,
    setActiveParentTab: () => { }
});

export function ProductProvider({ children }: { children: ReactNode }) {
    const [cachedProducts, setCachedProducts] = useState<Map<string, IProductListItem[]>>(new Map());
    const [activeParentTab, setActiveParentTab] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const addCachedProducts = useCallback((categoryId: string, products: IProductListItem[]) => {
        setCachedProducts(prev => {
            const newMap = new Map(prev);
            newMap.set(categoryId, products);
            return newMap;
        });
    }, []);

    const clearCache = useCallback(() => {
        setCachedProducts(new Map());
    }, []);

    // Track URL params changes to update activeParentTab
    useEffect(() => {
        const categoryParam = searchParams.get('category');

        if (categoryParam) {
            setActiveParentTab(decodeURIComponent(categoryParam).replace(/\+/g, ' '));
        } else {
            // If there's no category in URL, and activeParentTab has a value
            // This means the parent tab has been closed
            if (activeParentTab) {
                setActiveParentTab(null);
                // Clear product list when parent tab is closed and no other parent tab is open
                clearCache();
            }
        }
    }, [searchParams, activeParentTab, clearCache]);

    return (
        <ProductContext.Provider
            value={{
                cachedProducts,
                addCachedProducts,
                clearCache,
                activeParentTab,
                setActiveParentTab
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export const useProduct = () => useContext(ProductContext); 