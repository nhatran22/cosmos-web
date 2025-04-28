'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function ProductSection() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            {
                threshold: 0.2 // Trigger when 20% of the element is visible
            }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        }
    }

    const titleVariants = {
        hidden: { y: -30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    return (
        <section ref={sectionRef} className="py-8 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-20">
                <motion.div
                    className="text-center mb-8 md:mb-12"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={titleVariants}
                >
                    <span className="text-sm md:text-base text-gray-400 uppercase tracking-wider">PRODUCTS</span>
                    <h2 className="text-2xl md:text-4xl font-bold mt-2">Product Center</h2>
                    <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto mt-2 md:mt-4"></div>
                </motion.div>
                {/* Block Content 1 */}
                <motion.div
                    className="flex flex-col md:flex-row gap-4 md:h-[500px] text-center font-semibold text-green-500"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full md:w-[500px]"
                        variants={itemVariants}
                    >
                        <div className="p-4 md:p-8">
                            <h3 className="text-xl md:text-[26px] mb-4 md:mb-8">UPS Power Supply</h3>
                            <Link
                                href="/products?category=UPS%20Power%20Supply"
                                className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                            >
                                {'Learn more ->'}
                            </Link>
                        </div>
                        <div className="relative h-48 md:h-64">
                            <Image
                                src="/products/ups-power-supply.png?height=300&width=500"
                                alt="UPS Power Supply"
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-rows-2 gap-4 md:h-[500px] flex-1">
                        <motion.div
                            className="flex flex-col md:flex-row items-center gap-x-1 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 p-4 md:p-0"
                            variants={itemVariants}
                        >
                            <div className="p-4 md:p-8 text-center md:text-left">
                                <h3 className="text-xl md:text-[26px] font-semibold text-green-500 mb-4 md:mb-8">Hybrid Inverter</h3>
                                <Link
                                    href="/products?category=Residental%20Hybrid%20Inverter"
                                    className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                >
                                    {'Learn more ->'}
                                </Link>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-0">
                                <Image
                                    src="/products/hybrid-inverter-1.png"
                                    width={160}
                                    height={120}
                                    alt="Hybrid Inverter 1"
                                    className="object-contain"
                                />
                                <Image
                                    src="/products/hybrid-inverter-2.png"
                                    width={140}
                                    height={40}
                                    alt="Hybrid Inverter 2"
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex flex-col md:flex-row items-center gap-4 md:gap-x-1 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 p-4 md:p-0"
                            variants={itemVariants}
                        >
                            <div className="md:pl-8">
                                <Image
                                    src="/products/industrial-converter.png"
                                    width={100}
                                    height={40}
                                    alt="Industrial Converter"
                                    className="object-contain"
                                />
                            </div>
                            <div className="p-4 md:p-8 grid gap-y-1 text-center md:text-left">
                                <h3 className="text-xl md:text-[26px] font-semibold text-green-500">Industrial and Commercial Hybrid Inverter</h3>
                                <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-x-15 mt-4 md:mt-0">
                                    <Image
                                        src="/products/commercial-hybrid-converter.png"
                                        width={200}
                                        height={160}
                                        alt="Commercial Hybrid Converter"
                                        className="object-contain"
                                    />
                                    <Link
                                        href="/products?category=Industrial%2520and%2520Commercial%2520Hybrid"
                                        className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                    >
                                        {'Learn more ->'}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Block Content 2 */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[300px] text-center font-semibold text-green-500"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div
                        className="mt-8 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-x-10 p-4 md:p-0">
                            <div className="relative h-48 w-full md:h-64 md:w-auto">
                                <Image
                                    src="/products/modular-data-center.png"
                                    height={300}
                                    width={240}
                                    alt="Modular Data Center"
                                    className="object-contain mx-auto"
                                />
                            </div>
                            <div className="py-4 md:py-8">
                                <h3 className="text-xl md:text-[26px] font-semibold text-green-500 mb-4 md:mb-8">Modula Data Center</h3>
                                <Link
                                    href="/products?category=Modular%20Data%20Center"
                                    className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                >
                                    {'Learn more ->'}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="mt-8 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-x-10 p-4 md:p-0">
                            <div className="relative h-48 w-full md:h-64 md:w-auto">
                                <Image
                                    src="/products/precision-cooling.png"
                                    height={280}
                                    width={120}
                                    alt="Precision Cooling"
                                    className="object-contain mx-auto"
                                />
                            </div>
                            <div className="py-4 md:py-8">
                                <h3 className="text-xl md:text-[26px] font-semibold text-green-500 mb-4 md:mb-8">Precision Cooling</h3>
                                <Link
                                    href="/products?category=Precision%20Cooling"
                                    className="inline-flex text-[14px] items-center text-green-500 hover:text-green-600 hover:underline"
                                >
                                    {'Learn more ->'}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}