import { Suspense } from 'react';
import { ProductAPI } from '@/app/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Download, Phone } from 'lucide-react';
import ProductIntroductionClient from './ProductIntroductionClient';

interface ProductDetailPageProps {
    params: {
        productId: string;
    };
}

// Thiết lập cấu hình dynamic cho route này
// Chú ý: Với output: export, bạn cần chọn:
// - 'auto' - sẽ render tĩnh các route được liệt kê trong generateStaticParams
// - 'error' - sẽ báo lỗi nếu có route không được liệt kê trong generateStaticParams
// - 'force-static' - tất cả các route sẽ được render tĩnh
export const dynamicParams = false; // Không cho phép các tham số ngoài generateStaticParams
export const dynamic = 'error'; // Báo lỗi nếu truy cập route không trong generateStaticParams

// Hàm này sẽ được sử dụng khi output là 'export'
export async function generateStaticParams() {
    try {
        // Cách 1: Hardcode các ID sản phẩm cụ thể cần thiết
        const staticProductIds = [
            '6c6acd4a-e7a3-4aad-a98e-bc18a2439c4f',
            // Thêm các ID sản phẩm khác nếu cần
        ];

        // Trả về mảng các tham số
        return staticProductIds.map(id => ({
            productId: id
        }));

        /* 
        // Cách 2: Lấy từ API (comment lại để tránh lỗi khi API không hoạt động)
        const categoryId = ''; // Để lấy tất cả sản phẩm
        const allProducts = await ProductAPI.getProductsList(categoryId);
        
        if (!allProducts || allProducts.length === 0) {
            // Nếu API không trả về sản phẩm, sử dụng danh sách hardcode
            return staticProductIds.map(id => ({ productId: id }));
        }
        
        return allProducts.map(product => ({
            productId: product.id,
        }));
        */
    } catch (error) {
        console.error('Error generating static params:', error);
        // Trong trường hợp lỗi, vẫn trả về ID cụ thể
        return [
            { productId: '6c6acd4a-e7a3-4aad-a98e-bc18a2439c4f' }
        ];
    }
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
    try {
        const product = await ProductAPI.getProductDetail(params.productId);
        return {
            title: `${product.name} | Cosmos`,
            description: product.description,
        };
    } catch (error) {
        return {
            title: 'Product Detail | Cosmos',
            description: 'Product details',
        };
    }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const product = await ProductAPI.getProductDetail(params.productId);

    return (
        <div className="min-h-screen flex flex-col w-full">
            {/* Phần 1: Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-blue-950 via-blue-900 to-red-900 text-white">
                <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {product.name}
                        </h1>
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                {product.powerRange}
                            </span>
                            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                online double-conversion
                            </span>
                            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                high efficency ≥96%
                            </span>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative h-[300px] md:h-[400px]">
                        <Image
                            src={product.image || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
                <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-no-repeat bg-cover opacity-15 mix-blend-overlay"></div>
            </section>

            {/* Phần 2: Product Introduction */}
            <ProductIntroductionClient product={product} />

            {/* Phần 3: Performance Characteristics */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Performance Characteristics</h2>

                    {product.performanceCharacteristics?.length > 0 ? (
                        <>
                            {/* Top row - always 3 items */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                                {product.performanceCharacteristics.slice(0, 3).map((char, index) => (
                                    <div
                                        key={`top-${index}`}
                                        className="bg-white rounded-lg p-6 lg:p-8 shadow-sm flex flex-col items-center transition-all hover:shadow-md"
                                    >
                                        {char.icon && (
                                            <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                                <Image
                                                    src={char.icon}
                                                    alt={char.title || 'Feature icon'}
                                                    width={64}
                                                    height={64}
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold mb-2">{char.title}</h3>
                                        <p className="text-gray-600 text-center">-</p>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom row - up to 2 items if they exist */}
                            {product.performanceCharacteristics.length > 3 && (
                                <div className="flex justify-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl w-full">
                                        {product.performanceCharacteristics.slice(3, 5).map((char, index) => (
                                            <div
                                                key={`bottom-${index}`}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-green-50'} rounded-lg p-6 lg:p-8 shadow-sm flex flex-col items-center transition-all hover:shadow-md`}
                                            >
                                                {char.icon && (
                                                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                                        <Image
                                                            src={char.icon}
                                                            alt={char.title || 'Feature icon'}
                                                            width={64}
                                                            height={64}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                )}
                                                <h3 className="text-lg font-semibold mb-2">{char.title}</h3>
                                                <p className="text-gray-600 text-center">-</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex justify-center">
                            <div className="bg-white rounded-lg p-8 shadow-sm text-center max-w-lg w-full">
                                <p className="text-gray-500">No performance characteristics available</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Phần 4: Power Module Diagram */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Power Module Diagram</h2>

                    <div className="flex justify-center">
                        {product.diagrams && product.diagrams.length > 0 ? (
                            <Image
                                src={product.diagrams[0].image}
                                alt="Power Module Diagram"
                                height={400}
                                width={400}
                                className="object-contain"
                            />
                        ) : (
                            <div className="bg-gray-100 rounded-lg p-8 text-center max-w-2xl w-full">
                                <p className="text-gray-500">No diagram available</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Phần 5: Technical Parameters */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Technical Parameters</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="md:col-span-2">
                            <div className="flex justify-center mb-8">
                                <span className="inline-block py-2 px-8 border-2 border-white rounded-full text-xl">{product.powerRange}</span>
                            </div>
                            <hr className="border-t border-white/20 mb-8" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl mb-4">Power</h3>
                            <p>{product.powerRange}</p>
                            <hr className="border-t border-white/20 mt-6" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl mb-4">Working way</h3>
                            <p>3/3, online double conversion</p>
                            <hr className="border-t border-white/20 mt-6" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl mb-4">Installation method</h3>
                            <p>Tower</p>
                            <hr className="border-t border-white/20 mt-6" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl mb-4">Device-level protection</h3>
                            <p>Extreme reliability, more adaptable</p>
                            <hr className="border-t border-white/20 mt-6" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl mb-4">Large smart color touch screen</h3>
                            <p>Friendly man-machine interface</p>
                            <hr className="border-t border-white/20 mt-6" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl mb-4">High power density</h3>
                            <p>Easy installation and maintenance</p>
                            <hr className="border-t border-white/20 mt-6" />
                        </div>

                        <div className="md:col-span-2 mt-8">
                            <h3 className="text-xl mb-4">Application scenario:</h3>
                            <p className="text-sm md:text-base">government, finance, telecommunications, education, transportation, meteorology, radio and television, industrial and commercial taxation, medical and health, energy and power and other industries.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16 border-t border-white/20 pt-8">
                        <a href="#" className="flex items-center text-white hover:text-blue-300 transition-colors">
                            <Download className="mr-2" size={20} />
                            <span>Data Download</span>
                        </a>
                        <a href="#" className="flex items-center text-white hover:text-blue-300 transition-colors">
                            <Phone className="mr-2" size={20} />
                            <span>Contact Us</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
} 