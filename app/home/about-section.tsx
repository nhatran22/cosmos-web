import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-gray-400 uppercase tracking-wider">ABOUT US</span>
                    <h2 className="text-4xl font-bold mt-2">About Us</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-medium text-center mb-8">For the green digital world</h3>

                    <p className="text-gray-700 text-center mb-8 leading-relaxed">
                        Shenzhen ACwatt Power Co., Ltd. (abbreviation: ACwatt), with the mission of "For the green digital world",
                        has gathered a group of well-known power electronics technology experts in the industry and a team of senior
                        engineers who are masters and PhDs with 20 years of development experiences, focusing on the technical
                        research and product development of critical infrastructure with integrated solutions in data centers and
                        new energy storage system solutions, has continued intensive cultivation, committed to providing global
                        customers with highly reliable, high-quality solutions and a full range of quality services, through the
                        innovative integration of digital and energy, enabling the transformation of the global energy structure and
                        driving the creation of a zero-carbon future.
                    </p>

                    <div className="text-center">
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center h-10 px-6 font-medium rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                            <ArrowRight className="mr-2 h-5 w-5" /> more
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

