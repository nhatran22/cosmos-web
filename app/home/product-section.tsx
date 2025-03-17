import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ProductSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-gray-400 uppercase tracking-wider">PRODUCTS</span>
                    <h2 className="text-4xl font-bold mt-2">Product Center</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="p-8">
                            <h3 className="text-2xl font-semibold text-green-500 mb-8">UPS Power Supply</h3>
                            <Link href="/product/ups" className="inline-flex items-center text-green-500 hover:text-green-600">
                                Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                        <div className="relative h-64">
                            <Image
                                src="/placeholder.svg?height=300&width=500"
                                alt="UPS Power Supply"
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="p-8">
                            <h3 className="text-2xl font-semibold text-green-500 mb-8">Hybrid Inverter</h3>
                            <Link
                                href="/product/hybrid-inverter"
                                className="inline-flex items-center text-green-500 hover:text-green-600"
                            >
                                Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                        <div className="relative h-64">
                            <Image
                                src="/placeholder.svg?height=300&width=500"
                                alt="Hybrid Inverter"
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8">
                            <h3 className="text-2xl font-semibold text-green-500 mb-8">Industrial and Commercial Hybrid Inverter</h3>
                            <Link
                                href="/product/industrial-inverter"
                                className="inline-flex items-center text-green-500 hover:text-green-600"
                            >
                                Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                        <div className="relative h-64">
                            <Image
                                src="/placeholder.svg?height=300&width=500"
                                alt="Industrial Hybrid Inverter"
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}