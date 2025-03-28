"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryAPI } from '../services/api';
import { AdditionalHeader, NavBar } from '../interface/navigation';
import { mapHeaderNavigation } from '@/lib/utils';
import { baseNavigation } from '@/data/navigation-data';

// Keys sử dụng cho localStorage
const CATEGORIES_STORAGE_KEY = 'cosmos_categories_data';
const NAVIGATION_STORAGE_KEY = 'cosmos_navigation_data';
const LAST_FETCH_TIME_KEY = 'cosmos_categories_last_fetch';

// Thời gian cache hợp lệ (24 giờ tính bằng milliseconds)
const CACHE_VALIDITY_PERIOD = 24 * 60 * 60 * 1000;

interface CategoriesContextType {
    categories: AdditionalHeader[];
    navigation: NavBar[];
    loading: boolean;
    refreshing: boolean;
    error: string | null;
    refreshCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<AdditionalHeader[]>([]);
    const [navigation, setNavigation] = useState<NavBar[]>(baseNavigation);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Lưu dữ liệu vào localStorage
    const saveDataToStorage = (categoriesData: AdditionalHeader[], navigationData: NavBar[]) => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categoriesData));
            localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(navigationData));
            localStorage.setItem(LAST_FETCH_TIME_KEY, Date.now().toString());
        } catch (e) {
            console.error('Lỗi khi lưu dữ liệu vào localStorage:', e);
        }
    };

    // Đọc dữ liệu từ localStorage
    const loadDataFromStorage = (): {
        categoriesData: AdditionalHeader[] | null,
        navigationData: NavBar[] | null,
        isValid: boolean
    } => {
        if (typeof window === 'undefined') {
            return { categoriesData: null, navigationData: null, isValid: false };
        }

        try {
            const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
            const storedNavigation = localStorage.getItem(NAVIGATION_STORAGE_KEY);
            const lastFetchTime = localStorage.getItem(LAST_FETCH_TIME_KEY);

            // Kiểm tra tính hợp lệ của cache
            const isValid = !!lastFetchTime &&
                (Date.now() - parseInt(lastFetchTime)) < CACHE_VALIDITY_PERIOD;

            return {
                categoriesData: storedCategories ? JSON.parse(storedCategories) : null,
                navigationData: storedNavigation ? JSON.parse(storedNavigation) : null,
                isValid
            };
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu từ localStorage:', e);
            return { categoriesData: null, navigationData: null, isValid: false };
        }
    };

    // Fetch dữ liệu từ API
    const fetchCategories = async (forceRefresh = false) => {
        try {
            // Nếu đây là lần tải đầu tiên, set loading, nếu không thì set refreshing
            if (!forceRefresh && categories.length === 0) {
                setLoading(true);
            } else {
                setRefreshing(true);
            }

            // Chỉ thử lấy từ localStorage nếu đã mount ở client và không phải refresh
            if (!forceRefresh && isMounted) {
                const { categoriesData, navigationData, isValid } = loadDataFromStorage();

                if (isValid && categoriesData && navigationData) {
                    setCategories(categoriesData);
                    setNavigation(navigationData);
                    setLoading(false);
                    setRefreshing(false);
                    return;
                }
            }

            // Nếu không có dữ liệu trong localStorage hoặc cache đã hết hạn hoặc buộc phải refresh
            const categoriesData = await CategoryAPI.getCategories();

            if (categoriesData && categoriesData.length > 0) {
                setCategories(categoriesData);

                // Map categories to navigation and store the result
                const mappedNavigation = mapHeaderNavigation(baseNavigation, categoriesData);
                setNavigation(mappedNavigation);

                // Lưu dữ liệu vào localStorage nếu đã ở phía client
                if (isMounted) {
                    saveDataToStorage(categoriesData, mappedNavigation);
                }
            } else if (isMounted) {
                const { categoriesData, navigationData } = loadDataFromStorage();
                if (categoriesData && navigationData) {
                    setCategories(categoriesData);
                    setNavigation(navigationData);
                }
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Có lỗi xảy ra khi tải danh mục sản phẩm');

            // Trong trường hợp lỗi, vẫn thử sử dụng dữ liệu từ localStorage nếu có và đã ở client
            if (isMounted) {
                const { categoriesData, navigationData } = loadDataFromStorage();
                if (categoriesData && navigationData) {
                    setCategories(categoriesData);
                    setNavigation(navigationData);
                }
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handler cho sự kiện refresh
    const handleRefresh = async () => {
        await fetchCategories(true); // Gọi API với force refresh
    };

    // Chỉ fetch dữ liệu khi component được mount lần đầu ở phía client
    useEffect(() => {
        setIsMounted(true);
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                navigation,
                loading,
                refreshing,
                error,
                refreshCategories: handleRefresh
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoriesContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoriesProvider');
    }
    return context;
}