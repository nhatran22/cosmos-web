'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { navigation } from '@/components/mock/header-navigation';

// Mỗi trang hiển thị 3 sản phẩm
const ITEMS_PER_PAGE = 3;

// Cấu trúc dữ liệu sản phẩm
interface Product {
  series: string;
  capacity: string;
  image: string;
  link: string;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Power");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const currentProducts = allProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage * ITEMS_PER_PAGE) + ITEMS_PER_PAGE
  );

  // Hàm chuyển trang với hiệu ứng
  const goToPage = useCallback((pageIndex: number) => {
    if (isAnimating) return; // Không cho phép chuyển trang khi đang chạy hiệu ứng

    setIsAnimating(true);

    // Xác định hướng trượt
    if (pageIndex < 0) {
      setSlideDirection('left');
      setTimeout(() => {
        setCurrentPage(totalPages - 1);
      }, 300); // Đợi hoàn thành hiệu ứng trượt ra trước khi chuyển trang
    } else if (pageIndex >= totalPages) {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentPage(0);
      }, 300);
    } else {
      // Xác định hướng dựa trên trang hiện tại và trang đích
      setSlideDirection(pageIndex > currentPage ? 'right' : 'left');
      setTimeout(() => {
        setCurrentPage(pageIndex);
      }, 300);
    }

    // Kết thúc hiệu ứng
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Tổng thời gian hiệu ứng
  }, [totalPages, currentPage, isAnimating]);

  // Hàm chuyển trang tiếp theo
  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  // Hàm chuyển trang trước đó
  const goToPrevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Xử lý tự động chuyển trang
  useEffect(() => {
    // Chỉ tự động chuyển khi có nhiều hơn 3 sản phẩm (nhiều hơn 1 trang)
    if (!paused && !isAnimating && totalPages > 1) {
      autoPlayRef.current = setInterval(() => {
        goToNextPage();
      }, 2000); // 2 giây mỗi lần chuyển
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [goToNextPage, paused, isAnimating, totalPages]);

  // Xử lý lắng nghe sự kiện chuyển danh mục
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail);
    };

    window.addEventListener('categorySelected', handleCategoryChange as EventListener);

    // Thiết lập sản phẩm ban đầu dựa trên danh mục
    updateProductsByCategory(selectedCategory);

    return () => {
      window.removeEventListener('categorySelected', handleCategoryChange as EventListener);
    };
  }, []);

  useEffect(() => {
    updateProductsByCategory(selectedCategory);
    // Reset về trang đầu tiên khi chuyển danh mục
    setCurrentPage(0);
  }, [selectedCategory]);

  const updateProductsByCategory = (categoryTitle: string | null) => {
    // Tìm danh mục sản phẩm trong navigation
    const productNav = navigation.find(item => item.name === 'Product' || item.href === '/products');

    if (!productNav?.submenu) {
      setAllProducts([]);
      setCategoryTitle("");
      setTotalPages(0);
      return;
    }

    // Tìm submenu dựa trên category được chọn
    const selectedSubmenu = productNav.submenu.find(submenu => submenu.title === categoryTitle);

    if (!selectedSubmenu) {
      // Nếu không tìm thấy, dùng submenu đầu tiên làm mặc định
      const defaultSubmenu = productNav.submenu[0];
      setCategoryTitle(defaultSubmenu.title);

      // Chuyển đổi items thành sản phẩm
      const products: Product[] = defaultSubmenu.items?.map(item => ({
        series: item.name,
        capacity: generateCapacityFromName(item.name),
        image: "/placeholder-ups.png",
        link: item.href
      })) || [];

      setAllProducts(products);
      setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
      return;
    }

    setCategoryTitle(selectedSubmenu.title);

    // Chuyển đổi items thành sản phẩm
    const products: Product[] = selectedSubmenu.items?.map(item => ({
      series: item.name,
      capacity: generateCapacityFromName(item.name),
      image: categoryImagePath(selectedSubmenu.title),
      link: item.href
    })) || [];

    setAllProducts(products);
    setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
  };

  // Tạo thông tin capacity từ tên sản phẩm
  const generateCapacityFromName = (name: string): string => {
    if (name.includes('ACM Series')) return "50 ~ 600kVA Modular UPS";
    if (name.includes('SH Series')) return "10 ~ 20kVA Tower UPS";
    if (name.includes('Tower')) return "1 ~ 10kVA Tower UPS";
    if (name.includes('Rack')) return "1 ~ 10kVA Rack UPS";
    if (name.includes('Precision Cooling')) return "10 ~ 100kW In-row Cooling";
    if (name.includes('In-Row')) return "20 ~ 80kW Row-based Cooling";
    if (name.includes('Ceiling')) return "5 ~ 30kW Ceiling-mounted Cooling";
    if (name.includes('Room')) return "30 ~ 150kW Room Cooling";
    if (name.includes('PDU')) return "100A ~ 600A";
    if (name.includes('Transfer Switch')) return "100A ~ 1200A";
    if (name.includes('Distribution')) return "400A ~ 1600A";

    // Mặc định dựa vào danh mục
    return "Capacity information";
  };

  // Xác định đường dẫn ảnh dựa vào danh mục
  const categoryImagePath = (category: string): string => {
    if (category.includes('Power')) return "/placeholder-ups.png";
    if (category.includes('Cooling')) return "/placeholder-cooling.png";
    if (category.includes('Distribution')) return "/placeholder-pdu.png";
    return "/placeholder-ups.png";
  };

  // Tạm dừng tự động chuyển khi người dùng tương tác
  const handleUserInteraction = () => {
    setPaused(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Sau 5 giây không có tương tác, tiếp tục tự động chuyển
    setTimeout(() => {
      setPaused(false);
    }, 5000);
  };

  // Xác định lớp CSS cho hiệu ứng
  const getSlideClass = () => {
    if (!isAnimating) return '';

    return slideDirection === 'right'
      ? 'animate-slide-out-left'
      : 'animate-slide-out-right';
  };

  // Hiển thị thông báo nếu không có sản phẩm
  if (allProducts.length === 0) {
    return (
      <div className="mb-24">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{categoryTitle || "Products"}</h1>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{categoryTitle}</h1>

      {/* Product slider */}
      <div className="py-8 relative overflow-hidden">
        {/* Sản phẩm */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300 ${getSlideClass()}`}>
          {currentProducts.map((product, index) => (
            <Link href={product.link} key={index} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-5px] h-[400px] flex flex-col">
                <div className="h-60 relative">
                  {/* Vùng hiển thị ảnh sản phẩm */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
                    <div className="text-5xl text-green-600 font-light group-hover:text-green-500 group-hover:scale-110 transition-all duration-300">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-gray-100 flex flex-col flex-grow">
                  <h3 className="text-xl text-green-600 font-semibold mb-1 group-hover:text-green-500 line-clamp-2 min-h-[56px]">
                    {product.series}
                  </h3>
                  <p className="text-gray-700 mb-4 min-h-[24px]">
                    {product.capacity}
                  </p>
                  <div className="flex items-center text-green-600 group-hover:text-green-500 transition-colors mt-auto">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chỉ báo trang - chỉ hiển thị khi có nhiều hơn 3 sản phẩm */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  handleUserInteraction();
                  goToPage(index);
                }
              }}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentPage === index
                ? 'bg-green-600'
                : isAnimating
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-gray-300 hover:bg-green-300'
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-10%); opacity: 0; }
        }
        
        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(10%); opacity: 0; }
        }
        
        @keyframes slideInLeft {
          0% { transform: translateX(10%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          0% { transform: translateX(-10%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .animate-slide-out-left {
          animation: slideOutLeft 0.3s forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.3s forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.3s forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s forwards;
        }
      `}</style>
    </div>
  );
}