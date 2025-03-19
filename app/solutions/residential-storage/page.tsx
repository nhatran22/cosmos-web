'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Battery, Info, Zap, Shield, Settings, Clock } from 'lucide-react';

export default function ResidentialStoragePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Residential Storage Hybrid Inverter</h1>

            {/* Hero Section */}
            <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                <Image
                    src="/images/residential-storage.jpg"
                    alt="Residential Storage Hybrid Inverter"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Residential Energy Storage Solution
                            </h2>
                            <p className="text-white text-lg mb-6">
                                Optimize energy consumption, reduce electricity bills, and increase energy independence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-green-600 pl-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-700 mb-4">
                            Our Residential Hybrid Energy Storage System provides a comprehensive solution to optimize renewable energy usage and reduce electricity costs for households.
                        </p>
                        <p className="text-gray-700 mb-4">
                            The smart hybrid inverter with high-performance energy storage batteries allows excess energy from solar systems to be stored for use at night or during grid outages. Its compact design and easy installation make this solution suitable for any home.
                        </p>
                        <p className="text-gray-700">
                            With intelligent monitoring and control capabilities via mobile app, homeowners can easily track energy usage, optimize consumption, and minimize electricity bills while contributing to environmental protection.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">Key Benefits</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Optimize solar energy usage, reducing electricity bills by up to 80%</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Backup power during grid outages, enhancing energy reliability</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Smart monitoring and control through mobile application</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Simple installation and seamless integration with existing systems</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Reduce carbon emissions, contributing to environmental protection</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Features and Specifications */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-green-600 pl-4">Features & Specifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Zap className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Hybrid Inverter</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Power range from 5kW to 10kW</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Conversion efficiency {">"} 98%</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Smart energy management capabilities</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Integration with both grid and off-grid systems</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>UPS function with {"<"} 10ms transfer time</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Battery className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Battery System</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>High-performance Lithium-Ion/LiFePO4 batteries</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Capacity from 5kWh to 20kWh, expandable</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Lifecycle {">"} 6000 cycles</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Intelligent Battery Management System (BMS)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Modular design, easy to upgrade</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Settings className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Monitoring & Management</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Intuitive mobile app for monitoring</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Energy usage pattern analysis</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Customizable energy usage priorities</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Built-in Wi-Fi/4G connectivity</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Real-time alerts and notifications</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Applications */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-green-600 pl-4">Applications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="font-semibold mb-2 text-green-600">Urban Homes</h3>
                        <p className="text-gray-700">Reduce electricity bills and provide backup power for homes in urban areas.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="font-semibold mb-2 text-green-600">Rural Areas</h3>
                        <p className="text-gray-700">Provide stable power solutions for areas with unstable grid or frequent outages.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="font-semibold mb-2 text-green-600">Smart Homes</h3>
                        <p className="text-gray-700">Integrate with smart home systems to optimize energy usage and enhance comfort.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="font-semibold mb-2 text-green-600">Vacation Homes</h3>
                        <p className="text-gray-700">Provide independent energy solutions for vacation homes in remote areas.</p>
                    </div>
                </div>
            </div>

            {/* Product Models */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-green-600 pl-4">Product Models</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Model</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Inverter Power</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Battery Capacity</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">PV Input Voltage</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Special Features</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 text-gray-800 font-medium">SH-5K</td>
                                <td className="py-3 px-4 text-gray-700">5kW</td>
                                <td className="py-3 px-4 text-gray-700">5-10kWh</td>
                                <td className="py-3 px-4 text-gray-700">150-500V DC</td>
                                <td className="py-3 px-4 text-gray-700">Integrated UPS function</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 text-gray-800 font-medium">SH-7K</td>
                                <td className="py-3 px-4 text-gray-700">7kW</td>
                                <td className="py-3 px-4 text-gray-700">7-14kWh</td>
                                <td className="py-3 px-4 text-gray-700">150-500V DC</td>
                                <td className="py-3 px-4 text-gray-700">Advanced energy management</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 text-gray-800 font-medium">SH-10K</td>
                                <td className="py-3 px-4 text-gray-700">10kW</td>
                                <td className="py-3 px-4 text-gray-700">10-20kWh</td>
                                <td className="py-3 px-4 text-gray-700">150-600V DC</td>
                                <td className="py-3 px-4 text-gray-700">Multi-MPPT, Yield optimization</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Ready for your smart home?</h2>
                        <p className="text-gray-700">Contact us to learn more about our residential energy storage solutions.</p>
                    </div>
                    <Link href="/support/technical" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center transition-colors">
                        <span className="font-medium">Contact Now</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 