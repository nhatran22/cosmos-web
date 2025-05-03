import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | COSMOS RF',
  description: 'Learn about COSMOS RF - A Canadian-based professional manufacturer specializing in high-performance RF products.',
};

const AboutContent = () => (
  <div className="prose max-w-none text-gray-600 space-y-4">
    <p className="text-sm md:text-base">
      <span className='font-bold'>Cosmos RF Inc.</span> is a Canada-based high-tech company with a global outlook, dedicated to delivering state-of-the-art digital infrastructure and energy storage solutions for industrial and commercial applications. Guided by our mission, "Innovating for a Sustainable Digital Future," we provide reliable, scalable, and eco-conscious systems to meet the growing demands of smart energy and digital transformation worldwide.
    </p>
    <p className="text-sm md:text-base">
      Our team of seasoned professionals combines robust R&D capabilities with strategic global partnerships. Cosmos RF holds numerous core technologies and patents in intelligent power management, energy efficiency, and data infrastructure design. Our key offerings include modular data center infrastructure, smart power backup systems, intelligent monitoring and cooling solutions, and advanced commercial energy storage systems.
    </p>
    <p className="text-sm md:text-base">
      Committed to excellence, <span className='font-bold'>Cosmos RF</span> adheres to international standards such as ISO 9001 and ISO 14001, supported by a robust management framework powered by CRM, ERP, and MES systems. Our global supply chain and marketing network enable us to respond swiftly and effectively to the needs of partners across North America, Europe, and Asia-Pacific.
    </p>
    <p className="text-sm md:text-base">
      We take pride in delivering tailored, cost-effective solutions backed by exceptional technical support and a dedicated global service team. Through sustained investment in innovation and sustainability, Cosmos RF is driving a smarter, greener, and more connected future.
    </p>
    <p className="text-sm md:text-base">
      Rooted in a culture of "co-creation, collaboration, and shared value," we embrace our social responsibility, contribute to carbon neutrality, and champion the growth of a low-carbon, diverse, and digital energy industry.
    </p>
  </div>
);

const AboutImage = () => (
  <div className="relative h-[300px] md:h-[600px] rounded-lg overflow-hidden shadow-xl mt-6 md:mt-0">
    <Image
      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
      alt="Corporate Building"
      fill
      className="object-cover"
      priority
    />
  </div>
);

export default function Overview() {
  return (
    <div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">About Us</h1>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Cosmos RF Inc.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          <AboutContent />
          <AboutImage />
        </div>
      </div>
    </div>
  );
}