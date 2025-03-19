'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Battery, Globe, BarChart, PieChart, Network } from 'lucide-react';

export default function UtilityScaleStoragePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Utility-Scale Energy Storage Solutions</h1>

            {/* Hero Section */}
            <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                <Image
                    src="/images/utility-storage.jpg"
                    alt="Utility-Scale Energy Storage"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Utility-Scale Energy Storage Systems
                            </h2>
                            <p className="text-white text-lg mb-6">
                                Optimal solutions for grid stability, renewable energy integration, and grid support services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-700 mb-4">
                            Our Utility-Scale Energy Storage Systems provide comprehensive solutions designed for power utilities, renewable energy developers, and grid operators.
                        </p>
                        <p className="text-gray-700 mb-4">
                            With deployment capabilities ranging from several MW to hundreds of MW, our systems deliver efficient, reliable, and scalable energy storage solutions to meet the growing challenges of modern power grids.
                        </p>
                        <p className="text-gray-700">
                            Our advanced technology enables effective renewable energy integration, load balancing, peak shaving, and diverse grid support services, while optimizing the economic performance of power systems.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Key Benefits</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Effective integration of solar and wind energy into the grid</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Provide stable power capacity and backup for the grid</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Reduce peak electricity consumption and frequency regulation</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Participate in energy markets and generate revenue from ancillary services</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Defer grid and substation upgrades</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Grid congestion prevention and black start capabilities</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-4">Technical Specifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Zap className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Power Conversion System</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Capacity: 1MW - 500MW+</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Conversion efficiency: {">"} 98.8%</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Full grid interface compliance</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Utility-scale inverter systems</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Instant response {"<"} 100ms</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>IEEE-1547, IEC standards compliance</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <Battery className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Energy Storage System</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Technology: Lithium-Ion / Flow Battery</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Capacity: 1MWh - 2GWh+</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Lifecycle: {">"} 8,000 cycles (at 80% DoD)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Advanced Battery Management System (BMS)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Modular design, high scalability</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Integrated cooling and safety systems</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <div className="flex justify-center mb-6">
                            <BarChart className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Control & Monitoring</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Fully integrated SCADA system</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Advanced energy optimization algorithms</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Remote monitoring and real-time control</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Demand forecasting and optimization</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Energy management system integration</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Open APIs for system integration</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Applications */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-4">Applications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Globe className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-blue-600 text-center">Renewable Energy Integration</h3>
                        <p className="text-gray-700 mb-4">
                            Optimize the integration of variable renewable energy such as solar and wind into the grid by:
                        </p>
                        <ul className="space-y-2 text-gray-700 pl-5 list-disc">
                            <li>Minimizing production fluctuation impacts</li>
                            <li>Storing excess energy during high production periods</li>
                            <li>Shifting energy for use during high demand periods</li>
                            <li>Providing forecasting and output smoothing services</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <Network className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-blue-600 text-center">Grid Support Services</h3>
                        <p className="text-gray-700 mb-4">
                            Provide essential ancillary services to the grid:
                        </p>
                        <ul className="space-y-2 text-gray-700 pl-5 list-disc">
                            <li>Frequency regulation and frequency response</li>
                            <li>Spinning and non-spinning reserves</li>
                            <li>Voltage control and reactive power supply</li>
                            <li>Black start capability and grid restoration support</li>
                            <li>Capacity firming and grid stability</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <PieChart className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-blue-600 text-center">Infrastructure Optimization</h3>
                        <p className="text-gray-700 mb-4">
                            Optimize existing and future grid infrastructure:
                        </p>
                        <ul className="space-y-2 text-gray-700 pl-5 list-disc">
                            <li>Defer transmission and distribution line upgrades</li>
                            <li>Minimize grid congestion</li>
                            <li>Provide peak capacity</li>
                            <li>Enhance grid reliability at endpoints</li>
                            <li>Optimize efficiency and operation of power systems</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center mb-4">
                            <BarChart className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-blue-600 text-center">Energy Market Participation</h3>
                        <p className="text-gray-700 mb-4">
                            Maximize returns through energy market participation:
                        </p>
                        <ul className="space-y-2 text-gray-700 pl-5 list-disc">
                            <li>Energy price arbitrage</li>
                            <li>Capacity services and ancillary market bidding</li>
                            <li>Demand charge and system usage fee reduction</li>
                            <li>Demand response program participation</li>
                            <li>Support capacity shortfall avoidance in the system</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Case Studies */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-4">Featured Projects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">100MW Solar Integration Project</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Location: Southern Vietnam</p>
                            <p className="text-sm text-gray-500">Capacity: 100MW / 200MWh</p>
                            <p className="text-sm text-gray-500">Completed: 2023</p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            A 100MW energy storage system deployed in conjunction with a 300MW solar farm to stabilize output and shift energy to evening peak hours. The project increased revenue by 25% and improved system reliability.
                        </p>
                        <p className="text-gray-700">
                            Our solution provides enhanced power forecasting capability, frequency regulation, and reserve services, while significantly reducing curtailment due to grid constraints.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">50MW Island Power Station</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Location: Phu Quoc Island</p>
                            <p className="text-sm text-gray-500">Capacity: 50MW / 150MWh</p>
                            <p className="text-sm text-gray-500">Completed: 2022</p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            A 50MW energy storage system deployed to stabilize the island grid and optimize renewable energy integration, reducing dependence on diesel generators and enhancing reliability.
                        </p>
                        <p className="text-gray-700">
                            The project reduced diesel fuel consumption by 40%, decreased outage time by 60%, and provided black start capability for the island power system, while supporting the transition to clean energy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Delivery & Implementation */}
            <div className="mb-16 bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-4">Delivery & Implementation</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 font-bold text-xl">1</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Consultation & Assessment</h3>
                        <p className="text-gray-700">
                            Our expert team will assess your needs, goals, and technical requirements. We provide detailed analysis of technical performance and economic benefits of the project.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 font-bold text-xl">2</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Design & Engineering</h3>
                        <p className="text-gray-700">
                            We develop detailed optimal design for the project, including specifications, operational models, and system integration. Our designs comply with all applicable standards and regulations.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 font-bold text-xl">3</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">System Integration</h3>
                        <p className="text-gray-700">
                            We ensure seamless integration with existing systems, including the grid, renewable energy sources, and energy management systems. All interfaces are designed for efficient operation.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 font-bold text-xl">4</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Deployment & Construction</h3>
                        <p className="text-gray-700">
                            Our deployment team handles all aspects of system construction and installation, ensuring adherence to schedule, budget, and the highest quality standards.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 font-bold text-xl">5</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Operation & Maintenance</h3>
                        <p className="text-gray-700">
                            We provide comprehensive operation and maintenance services, including remote monitoring, preventive maintenance, and 24/7 technical support, to ensure optimal performance and maximum system lifespan.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <span className="text-blue-600 font-bold text-xl">6</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Performance Optimization</h3>
                        <p className="text-gray-700">
                            We continuously analyze system performance data, implement software upgrades, and optimize operational strategies to maximize return on investment and technical efficiency.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Transform your energy infrastructure</h2>
                        <p className="text-gray-700">Contact us to learn how utility-scale energy storage solutions can benefit your project.</p>
                    </div>
                    <Link href="/support/technical" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center transition-colors">
                        <span className="font-medium">Schedule Consultation</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 