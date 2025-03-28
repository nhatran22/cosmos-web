import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategories } from '../contexts/CategoriesContext';
import ProductSidebar from '@/components/ProductSidebar';
import ProductAPI from '../services/api/product.api';
import { RefreshCw, AlertCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
    const { loading, error, refreshing, refreshCategories, navigation } = useCategories();
    const [isClient, setIsClient] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Phân trang
    const [currentPage, setCurrentPage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const productsPerPage = 3;

    // Đảm bảo chỉ render ở phía client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Mở tab đầu tiên và cập nhật breadcrumb khi component được load
    useEffect(() => {
        if (!isClient || !navigation || navigation.length === 0) return;

        const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
        if (productNav?.submenu && productNav.submenu.length > 0) {
            const firstCategory = productNav.submenu[0];
            const categoryFromQuery = searchParams.get('category');

            // Nếu có category trong URL, sử dụng nó, nếu không sử dụng tab đầu tiên
            const categoryToActivate = categoryFromQuery || firstCategory.title;

            // Set active category
            setActiveCategory(categoryToActivate);

            // Cập nhật URL nếu cần
            if (!categoryFromQuery) {
                router.push(`/products?category=${encodeURIComponent(categoryToActivate)}`, { scroll: false });
            }

            // Cập nhật breadcrumb
            updateBreadcrumb(categoryToActivate);

            // Load sản phẩm của category đầu tiên
            loadInitialProducts(categoryToActivate);
        }
    }, [isClient, navigation]);

    // Xử lý thay đổi trang
    const handlePageChange = useCallback((newPage: number) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 400);
        }, 300);
    }, [isTransitioning]);

    // Tính toán số lượng trang dựa trên số lượng sản phẩm
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Lấy sản phẩm của trang hiện tại - sử dụng useMemo để tối ưu hiệu suất
    const currentProducts = useMemo(() => {
        return products.slice(
            currentPage * productsPerPage,
            (currentPage * productsPerPage) + productsPerPage
        );
    }, [products, currentPage, productsPerPage]);

    // Tự động chuyển trang mỗi 3 giây
    useEffect(() => {
        // Nếu đang tạm dừng hoặc chỉ có 1 trang thì không tự động chuyển
        if (isPaused || totalPages <= 1) return;

        const timer = setInterval(() => {
            const nextPage = (currentPage + 1) % totalPages;
            handlePageChange(nextPage);
        }, 3000);

        // Xóa interval khi component unmount
        return () => clearInterval(timer);
    }, [currentPage, totalPages, isPaused, handlePageChange]);

    // Listen for category selection from product-sidebar
    useEffect(() => {
        const handleCategorySelected = (event: CustomEvent) => {
            const eventData = event.detail;

            // Kiểm tra cấu trúc dữ liệu event mới
            if (eventData === null) {
                setActiveCategory(null);
                setProducts([]);
                return;
            }

            // Phiên bản mới - có thể có cả category và subcategory
            if (typeof eventData === 'object' && eventData.category) {
                const { category: categoryName, subcategory: subcategoryId } = eventData;

                // Luôn cập nhật activeCategory nếu có
                if (categoryName) {
                    setActiveCategory(categoryName);
                    setCurrentPage(0); // Reset về trang đầu tiên khi chuyển category

                    // Nếu chỉ có category mà không có subcategory
                    if (!subcategoryId) {
                        // Tải danh sách sản phẩm của category
                        if (navigation && navigation.length > 0) {
                            const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
                            if (!productNav?.submenu) return;

                            const category = productNav.submenu.find(cat => cat.title === categoryName);
                            if (!category) return;

                            setLoadingProducts(true);

                            // Tạm thời trả về danh sách mẫu dựa trên các items của category
                            if (category.items && category.items.length > 0) {
                                setProducts(category.items);
                            } else {
                                setProducts([]);
                            }

                            setLoadingProducts(false);
                        }
                    } else {
                        // Nếu có cả subcategory, gọi API để lấy danh sách sản phẩm của subcategory
                        loadProductsBySubcategory(subcategoryId);
                    }
                }
            } else {
                // Phiên bản cũ (tương thích ngược) - chỉ có category
                const categoryName = eventData;

                // Kiểm tra nếu categoryName là null hoặc rỗng (đóng tab)
                if (!categoryName) {
                    setActiveCategory(null);
                    setProducts([]);
                    return;
                }

                setActiveCategory(categoryName);
                setCurrentPage(0); // Reset về trang đầu tiên khi chuyển category

                // Tải danh sách sản phẩm của category
                if (navigation && navigation.length > 0) {
                    const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
                    if (!productNav?.submenu) return;

                    const category = productNav.submenu.find(cat => cat.title === categoryName);
                    if (!category) return;

                    setLoadingProducts(true);

                    // Tạm thời trả về danh sách mẫu dựa trên các items của category
                    if (category.items && category.items.length > 0) {
                        setProducts(category.items);
                    } else {
                        setProducts([]);
                    }

                    setLoadingProducts(false);
                }
            }
        };

        window.addEventListener('categorySelected', handleCategorySelected as EventListener);

        return () => {
            window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
        };
    }, [navigation]); // Thêm navigation lại vào dependencies

    // Cập nhật breadcrumb
    const updateBreadcrumb = (categoryName: string) => {
        // Tìm category từ navigation
        const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
        if (!productNav?.submenu) return;

        const category = productNav.submenu.find(cat => cat.title === categoryName);
        if (!category) return;

        // Sử dụng format URL với query params
        const categoryHref = `/products?category=${encodeURIComponent(categoryName)}`;

        // Tạo breadcrumb data với đúng tên hiển thị cho UPS Supply và ACM Series
        let displayName = categoryName;

        // Tinh chỉnh hiển thị cho breadcrumb tùy theo tab được chọn
        if (categoryName === "UPS Supply") {
            displayName = "UPS Supply";
        } else if (categoryName === "ACM Series") {
            displayName = "ACM Series";
        }

        const breadcrumbData = {
            category: {
                name: displayName,
                href: categoryHref
            },
            showSubcategory: false,
            subcategory: null,
            product: null
        };

        try {
            sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

            // Trigger breadcrumbUpdate event
            if (typeof window !== 'undefined') {
                const event = new CustomEvent('breadcrumbUpdate');
                window.dispatchEvent(event);
            }
        } catch (e) {
            console.error('Error interacting with sessionStorage:', e);
        }
    };

    // Load sản phẩm ban đầu dựa vào category
    const loadInitialProducts = async (categoryName: string) => {
        try {
            setLoadingProducts(true);

            // Tìm category từ navigation
            const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
            if (!productNav?.submenu) {
                setLoadingProducts(false);
                return;
            }

            const category = productNav.submenu.find(cat => cat.title === categoryName);

            if (!category) {
                setLoadingProducts(false);
                return;
            }

            // Tạm thời trả về danh sách mẫu dựa trên các items của category
            if (category.items && category.items.length > 0) {
                setProducts(category.items);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    // Load sản phẩm dựa vào subcategory
    const loadProductsBySubcategory = async (subcategoryId: string) => {
        try {
            setLoadingProducts(true);
            // Call API here
            const productsData = await ProductAPI.getProductsList(subcategoryId);
            setProducts(productsData);
            setCurrentPage(0); // Reset về trang đầu tiên khi load sản phẩm mới
        } catch (error) {
            console.error("Error loading products:", error);
            // Hiển thị dữ liệu mẫu nếu API thất bại
            setProducts([
                {
                    id: "1",
                    name: "Sản phẩm mẫu 1",
                    description: "Mô tả sản phẩm mẫu 1",
                    image: "https://via.placeholder.com/300"
                },
                {
                    id: "2",
                    name: "Sản phẩm mẫu 2",
                    description: "Mô tả sản phẩm mẫu 2",
                    image: "https://via.placeholder.com/300"
                }
            ]);
        } finally {
            setLoadingProducts(false);
        }
    };

    // Xử lý khi chọn subcategory từ URL params
    useEffect(() => {
        if (!isClient || !navigation) return;

        const subcategoryId = searchParams.get('subcategory');
        const categoryName = searchParams.get('category');

        if (categoryName) {
            setActiveCategory(categoryName);
            setCurrentPage(0); // Reset về trang đầu tiên khi chuyển category/subcategory

            if (subcategoryId) {
                // Nếu có subcategory, gọi API để lấy danh sách sản phẩm của subcategory
                loadProductsBySubcategory(subcategoryId);

                // Cập nhật breadcrumb với subcategory
                const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');
                if (!productNav?.submenu) return;

                const category = productNav.submenu.find(cat => cat.title === categoryName);
                if (!category?.items) return;

                const subcategory = category.items.find(item => item.id === subcategoryId);
                if (!subcategory) return;

                // Cập nhật breadcrumb với subcategory
                const breadcrumbData = {
                    category: {
                        name: categoryName,
                        href: `/products?category=${encodeURIComponent(categoryName)}`
                    },
                    showSubcategory: true,
                    subcategory: {
                        name: subcategory.name,
                        href: `/products?category=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(subcategoryId)}`
                    },
                    product: null
                };

                try {
                    sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

                    // Trigger breadcrumbUpdate event
                    const event = new CustomEvent('breadcrumbUpdate');
                    window.dispatchEvent(event);
                } catch (e) {
                    console.error('Error interacting with sessionStorage:', e);
                }
            } else {
                // Nếu chỉ có category, load danh sách sản phẩm của category đó
                loadInitialProducts(categoryName);
            }
        }
    }, [searchParams, navigation, isClient]);

    // Nếu chưa phải client, hiển thị một loading skeleton đơn giản
    if (!isClient) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="w-full">
                    <div className="h-8 bg-gray-200 w-1/3 mb-6 rounded-md"></div>
                    <div className="h-64 bg-gray-100 rounded-md"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                {activeCategory ?
                    searchParams.get('subcategory') ?
                        (() => {
                            const subcategoryId = searchParams.get('subcategory');
                            const category = navigation?.find(item => item.name === 'Product' || item.href === '/products');
                            const currentCategory = category?.submenu?.find(cat => cat.title === activeCategory);
                            const subcategory = currentCategory?.items?.find(item => item.id === subcategoryId);

                            return subcategory
                                ? `${activeCategory} - ${subcategory.name}`
                                : activeCategory;
                        })()
                        : activeCategory
                    : ''
                }
            </h1>
            <div className="mx-auto px-4 py-8 h-full">
                {error ? (
                    <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
                        <AlertCircle size={20} />
                        <span>Lỗi: {error}</span>
                    </div>
                ) : loadingProducts ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg shadow-sm p-4 h-80">
                                <div className="h-48 bg-gray-200 animate-pulse mb-4"></div>
                                <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
                                <div className="h-4 bg-gray-200 animate-pulse mb-4 w-1/2"></div>
                                <div className="h-8 bg-gray-200 animate-pulse w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div
                        className="items-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div
                            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-x-4 scale-98' : 'opacity-100 transform translate-x-0 scale-100'
                                }`}
                        >
                            {currentProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isRepresentative={index === 0} // Ưu tiên sản phẩm đầu tiên
                                    buttonType={searchParams.get('subcategory') ? 'viewDetail' : 'loadMore'}
                                    onButtonClick={searchParams.get('subcategory')
                                        ? () => {
                                            router.push(`/products/${product.id}`);
                                        }
                                        : () => router.push(`/products?category=${encodeURIComponent(activeCategory || '')}&subcategory=${encodeURIComponent(product.id)}`)
                                    }
                                />
                            ))}
                        </div>

                        {/* Pagination indicator với trạng thái hiện tại */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <div className="flex space-x-2">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-125 ${index === currentPage ? 'bg-green-500 scale-110' : 'bg-gray-300'
                                                }`}
                                            onClick={() => handlePageChange(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-8 bg-gray-50 rounded-md text-center">
                        <p className="text-gray-600 mb-2">Không có sản phẩm nào trong danh mục này</p>
                        <p className="text-sm text-gray-500">Vui lòng chọn danh mục khác</p>
                    </div>
                )}
            </div>
        </div>
    );
}