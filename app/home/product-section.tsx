import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ProductSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-20">
                <div className="text-center mb-12">
                    <span className="text-gray-400 uppercase tracking-wider">PRODUCTS</span>
                    <h2 className="text-4xl font-bold mt-2">Product Center</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
                </div>
                {/* Block Content 1 */}
                <div className="flex gap-4 h-[500px] text-center font-semibold text-green-500">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-[500px]">
                        <div className="p-8">
                            <h3 className="text-[26px] mb-8">UPS Power Supply</h3>
                            <Link
                                href="/products?category=UPS%20Power%20Supply"
                                className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                            >
                                {'Learn more ->'}
                            </Link>
                        </div>
                        <div className="relative h-64">
                            <Image
                                src="/products/ups-power-supply.png?height=300&width=500"
                                alt="UPS Power Supply"
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-rows-2 gap-4 h-[500px] flex-1">
                        <div className="flex items-center gap-x-1 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="p-8">
                                <h3 className="text-[26px] font-semibold text-green-500 mb-8">Hybrid Inverter</h3>
                                <Link
                                    href="/products?category=Residental%20Hybrid%20Inverter"
                                    className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                >
                                    {'Learn more ->'}
                                </Link>
                            </div>
                            <div className="flex gap-x-4">
                                <Image
                                    src="/products/household-inverter/th-series.png"
                                    width={200}
                                    height={150}
                                    alt="Hybrid Inverter 1"
                                    className="object-contain"
                                />
                                <Image
                                    src="/products/household-inverter/sh-series.png"
                                    width={180}
                                    height={50}
                                    alt="Hybrid Inverter 2"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-1 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="pl-8">
                                <Image
                                    src="product/industrial-commercial/csh-series.png"
                                    width={120}
                                    height={50}
                                    alt="Industrial Converter"
                                    className="object-contain"
                                />
                            </div>
                            <div className="p-8 grid gap-y-1">
                                <h3 className="text-[26px] font-semibold text-green-500">Industrial and Commercial Hybrid Inverter</h3>
                                <div className="flex justify-center gap-x-15">
                                    <Image
                                        src="product/industrial-commercial/csr-series.png"
                                        width={250}
                                        height={200}
                                        alt="Commercial Hybrid Converter"
                                        className="object-contain"
                                    />
                                    <Link
                                        href="/products?category=Industrial%20%26%20commercial"
                                        className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                    >
                                        {'Learn more ->'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Block Content 2 */}
                <div className="grid md:grid-cols-2 gap-4 h-[300px] text-center font-semibold text-green-500">
                    <div className="mt-8 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center gap-x-10">
                            <div className="relative h-64">
                                <Image
                                    src="/products/modular/ac500.png"
                                    height={400}
                                    width={300}
                                    alt="Modular Data Center"
                                    className="object-contain"
                                />
                            </div>
                            <div className="py-8">
                                <h3 className="text-[26px] font-semibold text-green-500 mb-8">Modula Data Center</h3>
                                <Link
                                    href="/products?category=Modular%20Data%20Center"
                                    className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                >
                                    {'Learn more ->'}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center items-center gap-x-10">
                            <div className="relative h-64">
                                <Image
                                    src="/products/precision-cooling/ha-series.png"
                                    height={350}
                                    width={150}
                                    alt="Modular Data Center"
                                    className="object-contain"
                                />
                            </div>
                            <div className="py-8">
                                <h3 className="text-[26px] font-semibold text-green-500 mb-8">Precision Cooling</h3>
                                <Link
                                    href="/products?category=Precision%20Cooling"
                                    className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                >
                                    {'Learn more ->'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}