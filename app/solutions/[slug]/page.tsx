"use client";

import React, { useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, Zap, Settings } from 'lucide-react';
import { RelatedProductsCarousel } from './RelatedProductsCarousel';
import { Advantage, Solution } from '@/app/interface/solutions';
import { getSolutionBySlug } from '@/data/solution-data';
import { motion } from 'framer-motion';

// Mock data for advantages
const advantages: Advantage[] = [
    {
        id: 'advantage-1',
        icon: <Zap className="h-12 w-12 text-green-500" />,
        description: 'Integrating PV and energy storage, support lead-acid/lithium battery, configuration diversification.',
    },
    {
        id: 'advantage-2',
        icon: <Settings className="h-12 w-12 text-green-500" />,
        description: 'Reliable and stable, IP66, -25~60 °C working temperature, stronger adaptability',
    },
    {
        id: 'advantage-3',
        icon: <CheckCircle className="h-12 w-12 text-green-500" />,
        description: 'Intelligent switching, off-grid switching time <10ms, to ensure the continuous operation of key loads',
    },
    {
        id: 'advantage-4',
        icon: <ShieldCheck className="h-12 w-12 text-green-500" />,
        title: '',
        description: 'Support insulation, leakage current, ground fault detection, with lightning protection, input reverse connection, AC overvoltage/overcurrent/short',
    },
];

// Detail page component
export default function SolutionDetail({ params }: { params: { slug: string } }) {
    // State for animation
    const [isAdvantageVisible, setIsAdvantageVisible] = useState(false);
    const advantageRef = useRef<HTMLDivElement>(null);

    // Add page transition effect
    useEffect(() => {
        // Page entry animation
        const mainContent = document.querySelector('.solution-container');
        if (mainContent) {
            mainContent.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => {
                mainContent.classList.remove('opacity-0', 'translate-y-4');
                mainContent.classList.add('opacity-100', 'translate-y-0');
            }, 100);
        }

        // Setup page transition on navigation
        const handleRouteChange = () => {
            const mainContent = document.querySelector('.solution-container');
            if (mainContent) {
                mainContent.classList.remove('opacity-100', 'translate-y-0');
                mainContent.classList.add('opacity-0', 'translate-y-4');
            }
        };

        // Clean up event listener on unmount
        return () => {
            handleRouteChange();
        };
    }, []);

    // Observe advantage section for animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAdvantageVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2 // Trigger when 20% of the element is visible
            }
        );

        if (advantageRef.current) {
            observer.observe(advantageRef.current);
        }

        return () => {
            if (advantageRef.current) {
                observer.unobserve(advantageRef.current);
            }
        };
    }, []);

    // Animation variants
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
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

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
    };

    // Get solution from slug
    const solution = getSolutionBySlug(params.slug);

    // If solution not found, redirect to 404
    if (!solution) {
        notFound();
    }

    return (
        <div className="solution-container transition-all duration-500 transform container mx-auto px-4 py-8">
            {/* Section 1: Solution Overview */}
            <div className="mb-20 transition-all duration-500 hover:shadow-xl rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-[32px] font-bold mb-4 text-gray-800">{solution.title}</h2>
                        <p className="text-[16px] text-gray-700 leading-relaxed text-pretty">
                            {solution.textContent}
                        </p>
                    </div>
                    <div className="flex justify-center transition-all duration-500 transform hover:scale-105">
                        <div className="relative w-full h-[400px]">
                            <Image
                                src={solution.representiveImage!}
                                alt={solution.title || ''}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Our Advantages */}
            <div ref={advantageRef} className="mb-20 transition-all duration-500 hover:shadow-xl rounded-lg p-6">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12 text-gray-800"
                    initial="hidden"
                    animate={isAdvantageVisible ? "visible" : "hidden"}
                    variants={titleVariants}
                >
                    Our advantages
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate={isAdvantageVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {advantages.map((advantage) => (
                        <motion.div
                            key={advantage.id}
                            className="flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-md p-4 rounded-lg"
                            variants={itemVariants}
                        >
                            <div className="mb-4">
                                {advantage.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                            <p className="text-gray-600">{advantage.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Section 3: Solution System Chart */}
            <div className="mb-20 transition-all duration-500 hover:shadow-xl rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Solution System Chart</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:border-blue-300">
                    <div className="relative h-[700px] w-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src={solution.image}
                                alt={solution.id}
                                width={1134}
                                height={400}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Related Products */}
            {solution.relatedProducts && solution.relatedProducts.length > 0 && (
                <div className="mb-10 transition-all duration-500 hover:shadow-xl rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Related Products</h2>
                    <RelatedProductsCarousel products={solution.relatedProducts} />
                </div>
            )}
        </div>
    );
} 