'use client';

import { useState, useEffect } from 'react';
import { ProductAPI } from '@/app/services/api';
import { IProduct } from '@/app/services/api/product.api';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Download, Phone } from 'lucide-react';
import ProductIntroductionClient from './ProductIntroductionClient';

export default function ProductDetailPage() {
    // Sử dụng useParams hook để lấy productId từ URL
    const params = useParams();
    const productId = params?.productId as string;

    // State để lưu product data
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch product data ở client-side
    useEffect(() => {
        async function fetchProductData() {
            if (!productId) return;

            try {
                setLoading(true);
                const data = await ProductAPI.getProductDetail(productId);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchProductData();
    }, [productId]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-green-500 rounded-full border-t-transparent"></div>
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md">
                    <h2 className="text-xl font-semibold mb-3">Error</h2>
                    <p>{error || 'Product not found'}</p>
                </div>
            </div>
        );
    }

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