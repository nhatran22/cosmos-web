'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
    powerRange: string;
    workingWay: string;
    suitableArea: string;
}

interface ProductIntroductionClientProps {
    product: Product;
}

export default function ProductIntroductionClient({ product }: ProductIntroductionClientProps) {
    const [activeTab, setActiveTab] = useState<'power-range' | 'working-way' | 'application-areas'>('power-range');

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Product Introduction</h2>

                <div className="w-full">
                    {/* Phần 1: Tab navigation */}
                    <div className="flex border-b border-gray-200">
                        <div
                            className="tab-item group relative cursor-pointer flex-1 text-center"
                            onMouseOver={() => setActiveTab('power-range')}
                        >
                            <div className={`py-4 px-2 md:px-6 font-medium border-b-2 transition-all duration-300 ${activeTab === 'power-range'
                                ? 'text-green-600 border-green-500'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}>
                                Power Range
                            </div>
                        </div>

                        <div
                            className="tab-item group relative cursor-pointer flex-1 text-center"
                            onMouseOver={() => setActiveTab('working-way')}
                        >
                            <div className={`py-4 px-2 md:px-6 font-medium border-b-2 transition-all duration-300 ${activeTab === 'working-way'
                                ? 'text-blue-600 border-blue-500'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}>
                                Working Way
                            </div>
                        </div>

                        <div
                            className="tab-item group relative cursor-pointer flex-1 text-center"
                            onMouseOver={() => setActiveTab('application-areas')}
                        >
                            <div className={`py-4 px-2 md:px-6 font-medium border-b-2 transition-all duration-300 ${activeTab === 'application-areas'
                                ? 'text-purple-600 border-purple-500'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}>
                                Application Areas
                            </div>
                        </div>
                    </div>

                    {/* Phần 2: Tab content */}
                    <div className="bg-white overflow-hidden transition-all duration-500">
                        {/* Power Range Content */}
                        {activeTab === 'power-range' && (
                            <div className="tab-content transition-all duration-300 ease-in-out">
                                <div className="p-8 flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                                            <Image
                                                src="/images/power-icon.svg"
                                                alt="Power Range Icon"
                                                width={56}
                                                height={56}
                                                className="opacity-80"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 md:pl-8">
                                        <h3 className="text-xl font-semibold text-green-600 mb-3">Power Range</h3>
                                        <p className="text-gray-700 mb-3">{product.powerRange}</p>
                                        <p className="text-gray-600">
                                            UPS có dải công suất rộng để đáp ứng các nhu cầu từ văn phòng nhỏ đến trung tâm
                                            dữ liệu lớn. Dải công suất từ 50kVA đến 600kVA giúp bạn linh hoạt lựa chọn
                                            giải pháp phù hợp nhất với hệ thống hiện tại.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Working Way Content */}
                        {activeTab === 'working-way' && (
                            <div className="tab-content transition-all duration-300 ease-in-out">
                                <div className="p-8 flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                                            <Image
                                                src="/images/working-icon.svg"
                                                alt="Working Way Icon"
                                                width={56}
                                                height={56}
                                                className="opacity-80"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 md:pl-8">
                                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Working Way</h3>
                                        <p className="text-gray-700 mb-3">{product.workingWay}</p>
                                        <p className="text-gray-600">
                                            UPS online double-conversion chuyển đổi điện AC thành DC và ngược lại, loại bỏ
                                            hoàn toàn các sự cố điện như sụt áp, xung điện và nhiễu. Công nghệ này cung cấp
                                            nguồn điện sạch liên tục và bảo vệ thiết bị nhạy cảm một cách tối ưu.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Application Areas Content */}
                        {activeTab === 'application-areas' && (
                            <div className="tab-content transition-all duration-300 ease-in-out">
                                <div className="p-8 flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                                        <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center">
                                            <Image
                                                src="/images/application-icon.svg"
                                                alt="Application Areas Icon"
                                                width={56}
                                                height={56}
                                                className="opacity-80"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 md:pl-8">
                                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Application Areas</h3>
                                        <p className="text-gray-700 mb-3">{product.suitableArea}</p>
                                        <p className="text-gray-600">
                                            Dòng UPS này thích hợp cho nhiều lĩnh vực từ trung tâm dữ liệu, cơ sở hạ tầng
                                            viễn thông, ngành y tế, ngân hàng tài chính đến các ứng dụng công nghiệp.
                                            Độ tin cậy cao và khả năng mở rộng giúp bảo vệ các hệ thống quan trọng.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 