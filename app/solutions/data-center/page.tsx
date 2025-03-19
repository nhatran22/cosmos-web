'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function DataCenterSolutionPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Intelligent Modular Data Center</h1>

            {/* Hero Section */}
            <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                <Image
                    src="/images/data-center-solution.jpg"
                    alt="Intelligent Modular Data Center"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Intelligent Modular Data Center Solution
                            </h2>
                            <p className="text-white text-lg mb-6">
                                Optimize performance, enhance reliability, and reduce operational costs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-green-600 pl-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-700 mb-4">
                            Our Intelligent Modular Data Center solution provides a comprehensive system designed to optimize operational performance, enhance scalability, and improve reliability for your IT infrastructure.
                        </p>
                        <p className="text-gray-700 mb-4">
                            With advanced modular design, our solution enables rapid deployment, easy expansion, and cost efficiency. Integrated UPS systems, precision cooling, and intelligent management systems ensure your data center operates at optimal performance.
                        </p>
                        <p className="text-gray-700">
                            Whether it's a small, medium, or enterprise-scale data center, our solution can be customized to meet your specific needs while providing maximum reliability and energy efficiency.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">Key Benefits</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Modular design allows for rapid and flexible expansion</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Integrated backup power systems with high-capacity UPS</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Precision cooling systems for optimal energy efficiency</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Intelligent remote monitoring and management systems</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Rapid deployment, reducing time to operation</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Reduced operational and maintenance costs</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Features and Specifications */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-green-600 pl-4">Features & Specifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">Power Systems</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• High-capacity modular UPS with {">"}96% efficiency</li>
                            <li>• Integrated power distribution system</li>
                            <li>• Automatic transfer switches</li>
                            <li>• Advanced backup battery systems</li>
                            <li>• Integrated generators (optional)</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">Cooling Systems</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• In-row precision cooling</li>
                            <li>• Precise temperature and humidity control</li>
                            <li>• Hot/cold aisle containment design</li>
                            <li>• Free cooling economics (optional)</li>
                            <li>• Redundant cooling water systems</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">Monitoring & Management</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Centralized DCIM management system</li>
                            <li>• Real-time environmental monitoring</li>
                            <li>• Early warning alerts and notifications</li>
                            <li>• Energy performance analytics</li>
                            <li>• User-friendly interface</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Applications */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-green-600 pl-4">Applications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold mb-2 text-green-600">Enterprise Data Centers</h3>
                        <p className="text-gray-700 text-sm">Comprehensive solution for enterprise-grade IT infrastructure with high availability and scalability.</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold mb-2 text-green-600">Edge Computing</h3>
                        <p className="text-gray-700 text-sm">Compact data centers at distributed locations to reduce latency and improve application performance.</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold mb-2 text-green-600">Telecommunications Infrastructure</h3>
                        <p className="text-gray-700 text-sm">Support telecom and network systems with reliable and efficient infrastructure.</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold mb-2 text-green-600">Temporary Data Centers</h3>
                        <p className="text-gray-700 text-sm">Rapid deployment solutions for temporary or mobile data processing needs.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-50 p-8 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Ready to upgrade your infrastructure?</h2>
                        <p className="text-gray-700">Contact us to learn more about our Intelligent Modular Data Center solution.</p>
                    </div>
                    <Link href="/support/technical" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center transition-colors">
                        <span className="font-medium">Contact Us</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 