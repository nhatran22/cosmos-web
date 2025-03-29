'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IProduct } from '@/app/services/api';

interface ProductContextType {
    cachedProducts: Map<string, IProduct[]>;
    addCachedProducts: (categoryId: string, products: IProduct[]) => void;
    clearCache: () => void;
}

const ProductContext = createContext<ProductContextType>({
    cachedProducts: new Map(),
    addCachedProducts: () => { },
    clearCache: () => { },
});

export function ProductProvider({ children }: { children: ReactNode }) {
    const [cachedProducts, setCachedProducts] = useState<Map<string, IProduct[]>>(new Map());

    const addCachedProducts = useCallback((categoryId: string, products: IProduct[]) => {
        setCachedProducts(prev => {
            const newMap = new Map(prev);
            newMap.set(categoryId, products);
            return newMap;
        });
    }, []);

    const clearCache = useCallback(() => {
        setCachedProducts(new Map());
    }, []);

    return (
        <ProductContext.Provider
            value={{
                cachedProducts,
                addCachedProducts,
                clearCache
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export const useProduct = () => useContext(ProductContext); 