'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import {
  findCategoryFromUrl,
  getRepresentativeProductsForPage,
  findSubcategoryById,
  getProductsBySubcategoryId
} from '@/components/mock/adapter-utils';
import { navigationData, headerNavigationData, tabNavigationData } from '@/components/navigation-data';
import { setCategoryEvent } from '@/components/product-sidebar';

export default function ProductsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialLoadRef = useRef(true);

  // State cho tiêu đề trang và danh mục hiện tại
  const [pageTitle, setPageTitle] = useState<string>("Sản phẩm");
  const [pageDescription, setPageDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);

  // State cho danh sách sản phẩm hiển thị
  const [products, setProducts] = useState<any[]>([]);

  // Lắng nghe sự kiện từ CategoryTabs trong breadcrumb.tsx
  useEffect(() => {
    const handleCategoryTabChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.tabId) {
        // Cập nhật tab được chọn
        handleTabSelect(customEvent.detail.tabId);

        // Kích hoạt sự kiện cập nhật sidebar
        if (customEvent.detail.name) {
          setCategoryEvent(customEvent.detail.name);
        }
      }
    };

    window.addEventListener('categoryTabChange', handleCategoryTabChange);
    return () => {
      window.removeEventListener('categoryTabChange', handleCategoryTabChange);
    };
  }, []);

  // Kiểm tra xem đang ở trang sản phẩm cấp 3 hay không
  const isLevel3ProductPage = () => {
    const urlParts = pathname.split('/').filter(Boolean);
    return urlParts.length > 3 && urlParts[0] === 'products';
  };

  // Kiểm tra xem một subcategory có phải là trang sản phẩm chi tiết không
  const isDetailPage = (categoryId: string, subcategoryId: string) => {
    // Tìm category từ ID
    const category = navigationData.find(cat => cat.id === categoryId);
    if (!category) return false;

    // Tìm subcategory từ ID
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    if (!subcategory) return false;

    // Kiểm tra nếu subcategory chỉ có 1 sản phẩm thì đây là trang chi tiết (trường hợp 1)
    return subcategory.products.length === 1;
  };

  // Thay đổi hàm getRepresentativeProductsForPage để hiển thị danh sách sản phẩm đại diện từ mỗi subcategory
  const getRepresentativeProductsForPage = (categoryId: string | null) => {
    if (!categoryId) return [];

    // Tìm category từ navigationData
    const category = navigationData.find(cat => cat.id === categoryId);
    if (!category) return [];

    // Lấy sản phẩm đại diện từ mỗi subcategory
    const representativeProducts: any[] = [];

    category.subcategories.forEach(subcategory => {
      // Tìm sản phẩm đại diện trong mỗi subcategory
      const representativeProduct = subcategory.products.find(product => product.isRepresentative) ||
        subcategory.products[0]; // Nếu không có sản phẩm đánh dấu là đại diện, lấy sản phẩm đầu tiên

      if (representativeProduct) {
        representativeProducts.push({
          id: representativeProduct.id,
          name: representativeProduct.name,
          image: representativeProduct.image || `https://via.placeholder.com/300x200?text=${subcategory.name}`,
          description: representativeProduct.shortDescription || `Sản phẩm đại diện cho ${subcategory.name}`,
          href: representativeProduct.href,
          subcategoryId: subcategory.id,
          subcategoryName: subcategory.name
        });
      }
    });

    return representativeProducts;
  };

  // Xử lý URL cho các cấp độ khác nhau
  useEffect(() => {
    const urlParts = pathname.split('/').filter(Boolean);

    // Nếu chỉ là đường dẫn gốc "/products"
    if (urlParts.length === 1 && urlParts[0] === 'products') {
      // Mặc định mở tab đầu tiên
      const firstTab = tabNavigationData[0];
      if (firstTab) {
        setCategoryId(firstTab.id);
        setPageTitle(firstTab.name);

        // Tìm thông tin chi tiết
        const categoryData = navigationData.find(cat => cat.id === firstTab.id);
        if (categoryData) {
          setPageDescription(categoryData.description || "");
        }

        // Lấy sản phẩm đại diện từ các subcategory
        const representativeProducts = getRepresentativeProductsForPage(firstTab.id);
        setProducts(representativeProducts);

        // Cập nhật URL
        window.history.pushState({}, '', firstTab.href);

        // Cập nhật breadcrumb
        if (categoryData) {
          updateBreadcrumb(categoryData.name, categoryData.href);
        }
      }
      initialLoadRef.current = false;
      return;
    }

    // Nếu là URL cấp độ 1 (ví dụ: /products/ups-power-supply)
    if (urlParts.length === 2 && urlParts[0] === 'products') {
      const categorySlug = urlParts[1];

      // Tìm category từ navigationData
      const matchingCategory = navigationData.find(category => {
        const catSlug = category.href.split('/').filter(Boolean).pop();
        return catSlug === categorySlug;
      });

      if (matchingCategory) {
        // Cập nhật state cho tab được chọn
        setCategoryId(matchingCategory.id);
        setPageTitle(matchingCategory.name);
        setPageDescription(matchingCategory.description || "");
        setSelectedSubcategoryId(null); // Reset selected subcategory

        // Lấy sản phẩm đại diện từ các subcategory
        const representativeProducts = getRepresentativeProductsForPage(matchingCategory.id);
        setProducts(representativeProducts);

        // Cập nhật breadcrumb
        updateBreadcrumb(matchingCategory.name, matchingCategory.href);
      } else {
        // Nếu không tìm thấy category, chuyển hướng đến trang lỗi 404
        router.push('/404');
      }
      initialLoadRef.current = false;
      return;
    }

    // Nếu là URL cấp độ 2 (ví dụ: /products/ups-power-supply/acm-series)
    if (urlParts.length === 3 && urlParts[0] === 'products') {
      const categorySlug = urlParts[1];
      const subcategorySlug = urlParts[2];

      // Tìm category từ slug
      const matchingCategory = navigationData.find(cat => {
        const catSlug = cat.href.split('/').filter(Boolean).pop();
        return catSlug === categorySlug;
      });

      if (matchingCategory) {
        // Cập nhật category
        setCategoryId(matchingCategory.id);

        // Tìm subcategory từ slug
        const subcategory = matchingCategory.subcategories.find(sub => {
          const subSlug = sub.href.split('/').filter(Boolean).pop();
          return subSlug === subcategorySlug;
        });

        if (subcategory) {
          // Cập nhật thông tin subcategory
          setPageTitle(subcategory.name);
          setPageDescription(subcategory.description || "");
          setSelectedSubcategoryId(subcategory.id);

          // Lấy tất cả sản phẩm của subcategory này
          setProducts(subcategory.products.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image || `https://via.placeholder.com/300x200?text=${product.name}`,
            description: product.shortDescription || `Mô tả cho ${product.name}`,
            href: product.href
          })));

          // Cập nhật breadcrumb - chỉ hiển thị đến category theo yêu cầu
          updateBreadcrumb(matchingCategory.name, matchingCategory.href);
        } else {
          // Nếu không tìm thấy subcategory, hiển thị sản phẩm đại diện của category
          setPageTitle(matchingCategory.name);
          setPageDescription(matchingCategory.description || "");
          setSelectedSubcategoryId(null);

          // Lấy sản phẩm đại diện từ các subcategory
          const representativeProducts = getRepresentativeProductsForPage(matchingCategory.id);
          setProducts(representativeProducts);

          // Cập nhật breadcrumb
          updateBreadcrumb(matchingCategory.name, matchingCategory.href);
        }
      } else {
        // Nếu không tìm thấy category, chuyển hướng đến trang lỗi 404
        router.push('/404');
      }
      initialLoadRef.current = false;
      return;
    }

    // Nếu là URL cấp độ 3 (ví dụ: /products/ups-power-supply/acm-series/acm-series-1)
    if (urlParts.length === 4 && urlParts[0] === 'products') {
      const categorySlug = urlParts[1];
      const subcategorySlug = urlParts[2];
      const productSlug = urlParts[3];

      // Tìm category từ slug
      const matchingCategory = navigationData.find(cat => {
        const catSlug = cat.href.split('/').filter(Boolean).pop();
        return catSlug === categorySlug;
      });

      if (matchingCategory) {
        // Tìm subcategory từ slug
        const subcategory = matchingCategory.subcategories.find(sub => {
          const subSlug = sub.href.split('/').filter(Boolean).pop();
          return subSlug === subcategorySlug;
        });

        if (subcategory) {
          // Tìm product từ slug
          const product = subcategory.products.find(prod => {
            const prodSlug = prod.href.split('/').filter(Boolean).pop();
            return prodSlug === productSlug;
          });

          if (product) {
            // Đây là trang chi tiết sản phẩm - chuyển hướng đến trang chi tiết
            // Cập nhật breadcrumb đầy đủ cho trang chi tiết sản phẩm
            const breadcrumbData = {
              category: {
                name: matchingCategory.name,
                href: matchingCategory.href
              },
              showSubcategory: true,
              subcategory: {
                name: subcategory.name,
                href: subcategory.href
              },
              product: {
                name: product.name,
                href: product.href
              }
            };
            sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

            // Kích hoạt custom event để thông báo breadcrumb đã thay đổi
            window.dispatchEvent(new Event('breadcrumbUpdate'));

            router.push(pathname);
          } else {
            // Không tìm thấy sản phẩm, hiển thị danh sách sản phẩm của subcategory
            setPageTitle(subcategory.name);
            setPageDescription(subcategory.description || "");
            setSelectedSubcategoryId(subcategory.id);
            setCategoryId(matchingCategory.id);

            // Lấy tất cả sản phẩm của subcategory này
            setProducts(subcategory.products.map(product => ({
              id: product.id,
              name: product.name,
              image: product.image || `https://via.placeholder.com/300x200?text=${product.name}`,
              description: product.shortDescription || `Mô tả cho ${product.name}`,
              href: product.href
            })));

            // Cập nhật breadcrumb - chỉ hiển thị đến category
            updateBreadcrumb(matchingCategory.name, matchingCategory.href);
          }
        } else {
          // Không tìm thấy subcategory, hiển thị sản phẩm đại diện của category
          router.push(`/products/${categorySlug}`);
        }
      } else {
        // Không tìm thấy category, chuyển hướng đến trang lỗi 404
        router.push('/404');
      }
      initialLoadRef.current = false;
      return;
    }

    // Xử lý các đường dẫn không khớp
    if (urlParts.length > 0 && !urlParts.includes('products')) {
      // Chuyển hướng đến trang not found
      router.push('/404');
    }

    initialLoadRef.current = false;
  }, [pathname, router]);

  // Xử lý khi chọn tab
  const handleTabSelect = (tabId: string) => {
    // Reset selected subcategory
    setSelectedSubcategoryId(null);

    // Tìm thông tin chi tiết về category
    const categoryData = navigationData.find(cat => cat.id === tabId);
    if (categoryData) {
      // Cập nhật category ID và thông tin
      setCategoryId(tabId);
      setPageTitle(categoryData.name);
      setPageDescription(categoryData.description || "");

      // Lấy sản phẩm đại diện từ các subcategory
      const representativeProducts = getRepresentativeProductsForPage(tabId);
      setProducts(representativeProducts);

      // Cập nhật URL - chỉ hiển thị đến cấp 1
      window.history.pushState({}, '', categoryData.href);

      // Cập nhật breadcrumb thông qua sessionStorage
      updateBreadcrumb(categoryData.name, categoryData.href);
    }
  };

  // Xử lý khi chọn category từ sidebar
  const handleCategorySelect = (selectedCategoryId: string) => {
    // Nếu đã chọn category này rồi thì không làm gì
    if (selectedCategoryId === categoryId) return;

    // Reset selected subcategory
    setSelectedSubcategoryId(null);

    // Tìm thông tin chi tiết về category
    const categoryData = navigationData.find(cat => cat.id === selectedCategoryId);
    if (categoryData) {
      // Cập nhật category ID và thông tin
      setCategoryId(selectedCategoryId);
      setPageTitle(categoryData.name);
      setPageDescription(categoryData.description || "");

      // Lấy sản phẩm đại diện từ các subcategory
      const representativeProducts = getRepresentativeProductsForPage(selectedCategoryId);
      setProducts(representativeProducts);

      // Cập nhật URL - chỉ hiển thị đến cấp 1
      window.history.pushState({}, '', categoryData.href);

      // Cập nhật breadcrumb thông qua sessionStorage
      updateBreadcrumb(categoryData.name, categoryData.href);
    }
  };

  // Xử lý khi chọn subcategory từ sidebar
  const handleSubcategorySelect = (subcategoryId: string, subcategoryProducts: any[], subcategoryName: string) => {
    // Tìm thông tin subcategory
    const subcategoryInfo = findSubcategoryById(subcategoryId);

    if (subcategoryInfo && subcategoryInfo.subcategory) {
      // Cập nhật thông tin
      setSelectedSubcategoryId(subcategoryId);
      setPageTitle(subcategoryName);
      setPageDescription(subcategoryInfo.subcategory.description || "");

      // Tìm tất cả sản phẩm của subcategory này từ navigationData
      const products = subcategoryInfo.subcategory.products.map(product => ({
        id: product.id,
        name: product.name,
        image: product.image || `https://via.placeholder.com/300x200?text=${product.name}`,
        description: product.shortDescription || `Mô tả cho ${product.name}`,
        href: product.href
      }));

      setProducts(products);

      // Cập nhật URL - vẫn giữ cấp 2 trong URL nhưng breadcrumb chỉ hiển thị đến cấp 1
      window.history.pushState({}, '', subcategoryInfo.subcategory.href);

      // Cập nhật breadcrumb thông qua sessionStorage - chỉ hiển thị đến category
      updateBreadcrumb(subcategoryInfo.category.name, subcategoryInfo.category.href);
    }
  };

  // Xử lý quay lại danh sách sản phẩm đại diện
  const handleBackToRepresentative = () => {
    showRepresentativeProducts(categoryId);

    // Cập nhật tiêu đề và mô tả
    const categoryData = navigationData.find(cat => cat.id === categoryId);
    if (categoryData) {
      setPageTitle(categoryData.name);
      setPageDescription(categoryData.description || "");

      // Cập nhật URL
      window.history.pushState({}, '', categoryData.href);
    }
  };

  // Hàm hiển thị sản phẩm đại diện
  const showRepresentativeProducts = (categoryId: string | null) => {
    setSelectedSubcategoryId(null);
    const representativeProducts = getRepresentativeProductsForPage(categoryId);
    setProducts(representativeProducts);
  };

  // Kiểm tra query parameter khi component được mount
  useEffect(() => {
    if (!initialLoadRef.current && searchParams) {
      const subcategoryParam = searchParams.get('subcategory');

      if (subcategoryParam && categoryId) {
        // Tìm thông tin subcategory dựa vào ID
        const categoryData = navigationData.find(cat => cat.id === categoryId);
        if (categoryData) {
          const subcategory = categoryData.subcategories.find(sub => sub.id === subcategoryParam);

          if (subcategory) {
            // Sử dụng đúng href từ subcategory để cập nhật URL
            if (subcategory.href) {
              window.history.pushState({}, '', subcategory.href);
            }

            // Hiển thị sản phẩm của subcategory
            const subcategoryProducts = getProductsBySubcategoryId(subcategoryParam);
            handleSubcategorySelect(subcategoryParam, subcategoryProducts, subcategory.name);
          }
        }
      }
    }
  }, [categoryId, searchParams, initialLoadRef]);

  // Hàm cập nhật breadcrumb
  const updateBreadcrumb = (categoryName: string, categoryHref: string) => {
    // Lưu thông tin vào sessionStorage để BreadcrumbNavigation component có thể sử dụng
    const breadcrumbData = {
      category: {
        name: categoryName,
        href: categoryHref
      },
      showSubcategory: false, // Mặc định không hiển thị subcategory trong breadcrumb
      subcategory: null,
      product: null
    };

    sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));

    // Kích hoạt custom event để thông báo breadcrumb đã thay đổi
    window.dispatchEvent(new Event('breadcrumbUpdate'));
  };

  // Nếu đang tải trang
  if (initialLoadRef.current) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <CategorySidebar
            onSubcategorySelect={handleSubcategorySelect}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{pageTitle}</h1>

            {pageDescription && (
              <p className="text-gray-600 mb-8">{pageDescription}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isRepresentative={!selectedSubcategoryId}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}