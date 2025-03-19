import Image from 'next/image';

export default function AcmSeriesPage() {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                        <div className="relative h-[400px] rounded-lg overflow-hidden">
                            <Image
                                src="/other/product-ups-detail.jpg"
                                alt="ACM Series Modular UPS"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">ACM Series Modular UPS</h1>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mb-6">
                            UPS Power Supply
                        </div>

                        <p className="text-gray-700 mb-6">
                            The ACM Series Modular UPS delivers exceptional reliability and efficiency for critical power applications.
                            Designed with modularity in mind, this system allows for easy scalability and maintenance without disrupting
                            operations.
                        </p>

                        <div className="border-t border-gray-200 pt-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>Hot-swappable power modules for zero downtime maintenance</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>Up to 96% efficiency in online double conversion mode</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>Compact footprint with high power density</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>Advanced battery management for extended life</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>Intelligent cooling system for optimal performance</span>
                                </li>
                            </ul>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                <div>
                                    <p className="font-medium">Capacity Range</p>
                                    <p>10kVA - 500kVA</p>
                                </div>
                                <div>
                                    <p className="font-medium">Input Voltage</p>
                                    <p>380/400/415VAC</p>
                                </div>
                                <div>
                                    <p className="font-medium">Input Frequency</p>
                                    <p>50/60Hz</p>
                                </div>
                                <div>
                                    <p className="font-medium">Efficiency</p>
                                    <p>Up to 96%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 