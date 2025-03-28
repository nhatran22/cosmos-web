import { AdditionalHeader, NavBar } from "@/app/interface/navigation"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapHeaderNavigation(baseHeader: NavBar[], additionalHeader: AdditionalHeader[]) {
  const combinedData = [...baseHeader];

  // Tìm mục Product trong baseHeader
  const productIndex = combinedData.findIndex(item => item.name === 'Product' || item.name === 'Products');

  // Nếu không tìm thấy mục Product, sử dụng mục mặc định
  if (productIndex === -1) {
    console.warn('Không tìm thấy mục Product trong baseHeader');
    return combinedData;
  }

  // Đảm bảo mục Product có submenu
  if (!combinedData[productIndex].submenu) {
    combinedData[productIndex].submenu = [];
  }

  // Thêm các danh mục sản phẩm vào submenu của Product
  additionalHeader.sort((a, b) => b.subCategory.length - a.subCategory.length).forEach(header => {
    const subMenuHref = `/products/${header.name.toLowerCase().replace(/\s+/g, '-')}`;
    combinedData[productIndex].submenu?.push({
      id: header.id,
      title: header.name,
      fullName: header.name,
      href: subMenuHref,
      items: header.subCategory.map(category => ({
        id: category.id,
        name: category.name,
        href: `${subMenuHref}/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
        fullName: category.description,
        image: category.image
      }))
    });
  });

  console.log(combinedData);

  return combinedData;
}