import Image from "next/image"
import Link from "next/link"
import { Database, Battery } from "lucide-react"

export default function SolutionSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container !max-w-full">
                <div className="text-center mb-12">
                    <span className="text-gray-400 uppercase tracking-wider">SOLUTION</span>
                    <h2 className="text-4xl font-bold mt-2">Solution</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-2">
                    {/* First solution item */}
                    <div className="relative h-[400px]">
                        {/* Background image (1) */}
                        <Image
                            src="/solution-bg-1.jpg?height=404&width=606"
                            alt="Data Center Background"
                            fill
                            className="object-cover"
                        />

                        {/* Hoverable square block (2) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Link
                                href="/solutions?category=Data%20Center%20Critical%20Infrastructure"
                                className="group relative w-[298px] h-[305px] border border-white flex flex-col items-center justify-center text-white bg-black/30 transition-all duration-300 hover:bg-black/30 hover:border-transparent hover:shadow-lg hover:transform hover:translate-y-[-3px]"
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col w-full gap-y-5">
                                    <div className="w-[66px] h-[71px] flex justify-center items-center border border-white transition-all duration-300">
                                        <Image
                                            src="/icons/data-icon.png"
                                            height={46}
                                            width={46}
                                            alt="Data Icon"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-center font-semibold">
                                        <h3 className="text-[20px]">Data Center Critical</h3>
                                        <h3 className="text-[20px]">Infrastructure System</h3>
                                        <h3 className="text-[20px]">Solutions</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Second solution item */}
                    <div className="relative h-[400px]">
                        {/* Background image (1) */}
                        <Image
                            src="/solution-bg-2.jpg?height=404&width=606"
                            alt="Energy Storage Background"
                            fill
                            className="object-cover"
                        />

                        {/* Hoverable square block (2) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Link
                                href="/solutions?category=New%20Energy%20Storage%20System"
                                className="group relative w-[298px] h-[305px] border border-white flex flex-col items-center justify-center text-white bg-black/30 transition-all duration-300 hover:bg-black/30 hover:border-transparent hover:shadow-lg hover:transform hover:translate-y-[-3px]"
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col w-full gap-y-5">
                                    <div className="w-[66px] h-[71px] flex justify-center items-center border border-white transition-all duration-300">
                                        <Image
                                            src="/icons/energy-icon.png"
                                            height={46}
                                            width={46}
                                            alt="Energy Icon"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-center font-semibold">
                                        <h3 className="text-[20px]">New Energy Storage</h3>
                                        <h3 className="text-[20px]">System Solution</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

