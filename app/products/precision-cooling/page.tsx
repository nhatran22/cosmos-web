'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PrecisionCoolingPage() {
    return (
        <div className="product-detail">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Precision Cooling Systems</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Advanced Cooling Solutions</h2>
                    <p className="text-gray-600 mb-6">
                        Our precision cooling systems provide precise temperature and humidity control for critical environments.
                        Designed with efficiency and reliability in mind, these systems ensure optimal conditions for sensitive
                        equipment and processes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Key Features</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Precise temperature control (±0.5°C)</li>
                                <li>Humidity management (30-80% RH)</li>
                                <li>Energy-efficient operation</li>
                                <li>Remote monitoring capabilities</li>
                                <li>Redundant systems available</li>
                                <li>Low noise operation</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Applications</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Data centers</li>
                                <li>Server rooms</li>
                                <li>Telecom installations</li>
                                <li>Medical facilities</li>
                                <li>Industrial processes</li>
                                <li>Laboratories</li>
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
                                title: "In-Row Cooling",
                                description: "Direct cooling for high-density server environments.",
                                capacity: "10-70 kW"
                            },
                            {
                                title: "Ceiling-Mounted Units",
                                description: "Space-saving solution for rooms with limited floor space.",
                                capacity: "5-30 kW"
                            },
                            {
                                title: "Floor-Standing Units",
                                description: "Traditional solution with powerful cooling capacity.",
                                capacity: "20-150 kW"
                            }
                        ].map((product, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">{product.title}</h3>
                                <p className="text-gray-600 mb-3">{product.description}</p>
                                <p className="text-sm font-medium text-green-600">Cooling capacity: {product.capacity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Eco-Friendly Technology</h2>
                    <p className="text-gray-600 mb-4">
                        Our precision cooling systems incorporate the latest eco-friendly technologies:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Low GWP Refrigerants</h4>
                                <p className="text-sm text-gray-600">Environmentally friendly refrigerants with low global warming potential.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Variable Speed Compressors</h4>
                                <p className="text-sm text-gray-600">Adjust capacity to match demand, reducing energy consumption.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Smart Controls</h4>
                                <p className="text-sm text-gray-600">AI-powered operations to optimize efficiency based on load patterns.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700">Free Cooling Technology</h4>
                                <p className="text-sm text-gray-600">Utilizes outside air when conditions permit to reduce mechanical cooling.</p>
                            </div>
                        </div>
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