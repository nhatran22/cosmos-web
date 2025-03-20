import { navigation } from './header-navigation';
import {
    navigationData,
    Category,
    SubCategory,
    ProductItem,
    HeaderNavItem
} from './navigation-data';

/**
 * Chuyển đổi từ cấu trúc dữ liệu mới sang cấu trúc dữ liệu cũ
 * Điều này cho phép sử dụng dữ liệu mới với các component hiện tại
 */
export function convertNewDataToOldFormat() {
    const convertedData = navigationData.map(category => ({
        name: category.name,
        href: category.href,
        submenu: category.subcategories.map(subcategory => ({
            title: subcategory.name,
            href: subcategory.href,
            fullName: subcategory.name,
            image: subcategory.image || '/images/placeholder.jpg',
            items: subcategory.products.map(product => ({
                name: product.name,
                href: product.href,
                fullName: product.name
            }))
        }))
    }));

    // Thêm các mục menu khác từ navigation cũ (Home, About Us, Service Support)
    const otherMenuItems = navigation.filter(item =>
        !['Product', 'Solution'].includes(item.name)
    );

    return [...otherMenuItems, ...convertedData];
}

/**
 * Tìm thông tin danh mục từ URL
 */
export const findCategoryFromUrl = (pathname: string) => {
    // Xử lý path - lấy phần sau "/products/"
    const urlParts = pathname.split('/').filter(Boolean);

    // Trường hợp "/products" hoặc "/"
    if (urlParts.length === 0 || (urlParts.length === 1 && urlParts[0] === 'products')) {
        return null;
    }

    // Lấy slug của category từ URL
    const categorySlug = urlParts.length >= 2 && urlParts[0] === 'products' ? urlParts[1] : null;

    if (!categorySlug) return null;

    // Tìm category trong navigationData
    const category = navigationData.find((cat) => {
        // Kiểm tra slug
        const catHref = cat.href || '';
        const catSlug = catHref.split('/').filter(Boolean).pop();
        return catSlug === categorySlug;
    });

    // Nếu tìm thấy, trả về thông tin danh mục
    if (category) {
        return {
            id: category.id,
            name: category.name
        };
    }

    // Trường hợp không tìm thấy, trả về danh mục mặc định
    return null;
};

/**
 * Xử lý khi click vào subcategory
 */
export const processSubcategoryClick = (href: string) => {
    // Tách URL để lấy categorySlug và subcategorySlug
    const parts = href.split('/').filter(Boolean);
    if (parts.length < 3) {
        return {
            shouldRedirect: false,
            products: []
        };
    }

    const categorySlug = parts[1];
    const subcategorySlug = parts[2];

    // Tìm category từ slug
    const category = navigationData.find(cat => {
        const catSlug = cat.href.split('/').filter(Boolean).pop();
        return catSlug === categorySlug;
    });

    if (!category) {
        return {
            shouldRedirect: false,
            products: []
        };
    }

    // Tìm subcategory từ slug
    const subcategory = category.subcategories.find(sub => {
        const subSlug = sub.href.split('/').filter(Boolean).pop();
        return subSlug === subcategorySlug;
    });

    if (!subcategory) {
        return {
            shouldRedirect: false,
            products: []
        };
    }

    // Kiểm tra nếu subcategory chỉ có 1 sản phẩm
    if (subcategory.products.length === 1) {
        // Chuyển hướng đến trang chi tiết sản phẩm duy nhất
        return {
            shouldRedirect: true,
            redirectUrl: subcategory.products[0].href
        };
    } else {
        // Trả về tất cả sản phẩm trong subcategory
        return {
            shouldRedirect: false,
            products: subcategory.products.map(product => ({
                id: product.id,
                name: product.name,
                image: product.image || `https://via.placeholder.com/300x200?text=${product.name}`,
                description: product.shortDescription || `Mô tả cho ${product.name}`,
                href: product.href
            }))
        };
    }
};

/**
 * Tìm subcategory theo ID
 */
export const findSubcategoryById = (subcategoryId: string) => {
    // Tìm qua tất cả các category
    for (const category of navigationData) {
        // Tìm subcategory trong category
        const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);

        if (subcategory) {
            return {
                category,
                subcategory
            };
        }
    }

    return null;
};

/**
 * Lấy sản phẩm theo subcategory ID
 */
export const getProductsBySubcategoryId = (subcategoryId: string) => {
    // Tìm subcategory từ ID
    const subcategoryInfo = findSubcategoryById(subcategoryId);
    if (subcategoryInfo && subcategoryInfo.subcategory) {
        // Trả về danh sách sản phẩm thực từ navigationData
        return subcategoryInfo.subcategory.products.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image || `https://via.placeholder.com/300x200?text=${product.name}`,
            description: product.shortDescription || `Mô tả cho ${product.name}`,
            href: product.href
        }));
    }

    // Nếu không tìm thấy, trả về mảng rỗng
    return [];
};

/**
 * Lấy sản phẩm đại diện cho trang
 */
export const getRepresentativeProductsForPage = (categoryId: string | null) => {
    // Giả lập danh sách sản phẩm đại diện
    const count = categoryId ? (categoryId.length % 3) + 3 : 3; // 3-5 sản phẩm đại diện
    const categorySlug = categoryId || 'default';

    return Array.from({ length: count }).map((_, index) => ({
        id: `representative-${categorySlug}-${index}`,
        name: `${categoryId || 'Sản phẩm'} ${index + 1}`,
        image: `https://via.placeholder.com/300x200?text=${categoryId || 'Product'}+${index + 1}`,
        description: `Mô tả sản phẩm đại diện ${index + 1} cho danh mục ${categoryId || 'mặc định'}`,
        href: `/products/${categorySlug}/product-${index + 1}`
    }));
};

/**
 * Tìm subcategory từ slug trong URL
 */
export const findSubcategoryFromUrl = (pathname: string) => {
    const urlParts = pathname.split('/').filter(Boolean);

    // Cần ít nhất 3 phần: "products", "category-slug", "subcategory-slug"
    if (urlParts.length < 3 || urlParts[0] !== 'products') {
        return null;
    }

    const categorySlug = urlParts[1];
    const subcategorySlug = urlParts[2];

    // Tìm category từ slug
    const category = navigationData.find((cat) => {
        const catHref = cat.href || '';
        const catSlug = catHref.split('/').filter(Boolean).pop();
        return catSlug === categorySlug;
    });

    if (!category) {
        return null;
    }

    // Tìm subcategory từ slug
    const subcategory = category.subcategories.find((sub) => {
        const subHref = sub.href || '';
        const subSlug = subHref.split('/').filter(Boolean).pop();
        return subSlug === subcategorySlug;
    });

    if (!subcategory) {
        return null;
    }

    return {
        category,
        subcategory
    };
};

/**
 * Kết hợp dữ liệu cũ và mới cho menu điều hướng
 */
export function getCombinedNavigationData() {
    // Lấy các mục không phải Product/Solution từ navigation cũ
    const nonProductItems = navigation.filter(item =>
        !['Product', 'Solution'].includes(item.name)
    );

    // Chuyển đổi cấu trúc mới sang định dạng tương thích
    const productAndSolutionItems = navigationData.map(category => ({
        name: category.name,
        href: category.href,
        submenu: category.subcategories.map(subcategory => ({
            title: subcategory.name,
            href: subcategory.href,
            fullName: subcategory.name,
            image: subcategory.image || '/images/placeholder.jpg',
            items: subcategory.products.map(product => ({
                name: product.name,
                href: product.href,
                fullName: product.name
            }))
        }))
    }));

    // Kết hợp hai mảng
    return [...nonProductItems, ...productAndSolutionItems];
} 