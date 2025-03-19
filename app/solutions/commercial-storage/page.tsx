'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Building, Server, Shield, Factory, Database } from 'lucide-react';

export default function CommercialStoragePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Industrial & Commercial Energy Storage Solutions</h1>

            {/* Hero Section */}
            <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                <Image
                    src="/images/commercial-storage.jpg"
                    alt="Industrial & Commercial Energy Storage"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Industrial & Commercial Energy Storage Systems
                            </h2>
                            <p className="text-white text-lg mb-6">
                                Optimize energy costs, ensure continuous operations, and enhance energy management.
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
                            Our Industrial & Commercial Energy Storage Solutions are designed to meet the robust and reliable energy needs of businesses, manufacturing facilities, and commercial premises.
                        </p>
                        <p className="text-gray-700 mb-4">
                            With large-scale energy storage capabilities, our systems help businesses optimize electricity usage, reduce peak demand charges, provide backup power, and efficiently integrate with renewable energy sources such as solar power.
                        </p>
                        <p className="text-gray-700">
                            The solution features a highly scalable modular design, allowing businesses to flexibly adjust storage capacity according to needs, while the intelligent energy management system optimizes performance and extends system lifespan.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">Key Benefits</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Reduce peak electricity costs and demand charges</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Ensure backup power and continuity for critical business operations</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Optimize usage of solar power and renewable energy sources</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Smart energy management system with real-time monitoring</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Grid services integration and energy market participation</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Modular design for easy expansion and upgrades</span>
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
                        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Inverter System</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Power range from 50kW to 1MW+</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>High conversion efficiency {">"} 98.5%</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Parallel operation capability</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Integrated monitoring & control</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Dynamic power adjustment capabilities</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Shield className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Battery System</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Industrial LiFePO4/Lithium-Ion technology</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Capacity from 100kWh to multiple MWh</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Lifecycle {">"} 6000 cycles</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Safe modular design with fire protection</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Advanced cooling, stable operation</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Database className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">Management & Integration</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Integrated SCADA, intuitive HMI interface</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Real-time control and optimization</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Demand forecasting & energy optimization</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Smart grid integration capabilities</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Advanced data analytics capabilities</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Commercial Applications */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-green-600 pl-4">Commercial Applications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Building className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Shopping Centers</h3>
                        <p className="text-gray-700">Reduce operating costs, ensure continuous operation and improve energy efficiency in commercial centers.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Building className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Office Buildings</h3>
                        <p className="text-gray-700">Optimize energy usage and provide backup power for office buildings and commercial spaces.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Building className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Hotels & Resorts</h3>
                        <p className="text-gray-700">Ensure seamless customer experience with stable power and reduced peak electricity costs.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Building className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Healthcare Facilities</h3>
                        <p className="text-gray-700">Provide reliable backup power for critical medical equipment and essential operations.</p>
                    </div>
                </div>
            </div>

            {/* Industrial Applications */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-green-600 pl-4">Industrial Applications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Factory className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Manufacturing Facilities</h3>
                        <p className="text-gray-700">Reduce peak electricity charges and ensure continuous operation for production processes, avoiding losses due to power outages.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Server className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Data Centers</h3>
                        <p className="text-gray-700">Provide backup power for servers and critical IT systems, ensuring maximum uptime.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Factory className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Mining Operations</h3>
                        <p className="text-gray-700">Support mining operations in areas far from the grid or with unstable power supply.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Factory className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2 text-green-600 text-center">Agricultural Facilities</h3>
                        <p className="text-gray-700">Provide stable energy for farming facilities, greenhouses, and automated irrigation systems.</p>
                    </div>
                </div>
            </div>

            {/* Product Series */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-green-600 pl-4">Product Series</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Product Series</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Power</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Storage Capacity</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Suitable Applications</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Special Features</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 text-gray-800 font-medium">CSH Series</td>
                                <td className="py-3 px-4 text-gray-700">50-250kW</td>
                                <td className="py-3 px-4 text-gray-700">100-500kWh</td>
                                <td className="py-3 px-4 text-gray-700">Offices, Shopping Centers</td>
                                <td className="py-3 px-4 text-gray-700">PV integration, Peak optimization</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 text-gray-800 font-medium">CSR Series</td>
                                <td className="py-3 px-4 text-gray-700">100-500kW</td>
                                <td className="py-3 px-4 text-gray-700">250kWh-1MWh</td>
                                <td className="py-3 px-4 text-gray-700">Medium Industry, Large Hotels</td>
                                <td className="py-3 px-4 text-gray-700">Fast response, Grid services</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4 text-gray-800 font-medium">CST Series</td>
                                <td className="py-3 px-4 text-gray-700">500kW-2MW</td>
                                <td className="py-3 px-4 text-gray-700">1MWh-5MWh+</td>
                                <td className="py-3 px-4 text-gray-700">Large Factories, Power Stations</td>
                                <td className="py-3 px-4 text-gray-700">High scalability, Smart grid integration</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Optimize your business operations</h2>
                        <p className="text-gray-700">Contact us to learn more about our industrial and commercial energy storage solutions.</p>
                    </div>
                    <Link href="/support/technical" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center transition-colors">
                        <span className="font-medium">Request Consultation</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 