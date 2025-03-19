'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function UPSPowerSupplyPage() {
    return (
        <div className="product-detail">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">UPS Power Supply</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Reliable Power Solutions</h2>
                    <p className="text-gray-600 mb-6">
                        Our UPS Power Supply systems provide uninterrupted power for critical applications.
                        With advanced technology and robust design, they ensure your operations continue
                        without interruption even during power outages.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Key Features</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Continuous power protection</li>
                                <li>Voltage regulation</li>
                                <li>Surge protection</li>
                                <li>Battery backup</li>
                                <li>Remote monitoring</li>
                                <li>Scalable solutions</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Applications</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Data centers</li>
                                <li>Telecommunications</li>
                                <li>Healthcare facilities</li>
                                <li>Industrial automation</li>
                                <li>Network infrastructure</li>
                                <li>Security systems</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Product Range</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Single-Phase UPS",
                                description: "Ideal for small to medium businesses and home offices.",
                                power: "1-20 kVA"
                            },
                            {
                                title: "Three-Phase UPS",
                                description: "Perfect for data centers and industrial applications.",
                                power: "10-500 kVA"
                            },
                            {
                                title: "Modular UPS",
                                description: "Scalable solutions for growing infrastructure needs.",
                                power: "25-1500 kVA"
                            }
                        ].map((product, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">{product.title}</h3>
                                <p className="text-gray-600 mb-3">{product.description}</p>
                                <p className="text-sm font-medium text-green-600">Power range: {product.power}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Contact Sales
                </Link>
            </div>
        </div>
    );
} 