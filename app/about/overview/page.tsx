import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | COSMOS RF',
  description: 'Learn about COSMOS RF - A Canadian-based professional manufacturer specializing in high-performance RF products.',
};

const AboutContent = () => (
  <div className="prose max-w-none text-gray-600 space-y-4">
    <p className="text-sm md:text-base">
      <span className='font-bold'>Cosmos RF Inc.</span> is a Canada-based high-tech enterprise with a global vision, committed to providing cutting-edge digital infrastructure integration solutions and energy storage system solutions for industrial and commercial applications. With the mission of "Innovating for a Sustainable Digital Future," Cosmos RF focuses on delivering reliable, scalable, and environmentally responsible systems to support the evolving demands of smart energy and digital transformation across the globe.
    </p>
    <p className="text-sm md:text-base">
      Our company possesses a seasoned professional team, and we combine strong R&D capability with strategic global partnerships. Cosmos RF holds multiple core technologies and patents in intelligent power management, energy efficiency, and data infrastructure design. Our core solutions include modular data center infrastructure, smart power backup systems, intelligent monitoring & cooling systems, and advanced commercial energy storage systems.
    </p>
    <p className="text-sm md:text-base">
      To ensure optimal quality and efficiency, Cosmos RF follows international quality standards, including ISO 9001 and ISO 14001, and operates a robust management framework supported by CRM, ERP, and MES systems. Our global supply chain and marketing network allow us to respond quickly and effectively to the needs of our partners in North America, Europe, and Asia-Pacific.
    </p>
    <p className="text-sm md:text-base">
      We pride ourselves on delivering professional, customized, and cost-effective solutions, backed by strong technical support and a global service team. Through continuous investment in innovation and sustainability, Cosmos RF is committed to enabling a smarter, greener, and more connected future.
    </p>
    <p className="text-sm md:text-base">
      Upholding a corporate culture of "co-creation, collaboration, and shared value," we actively embrace our social responsibility, contribute to carbon neutrality goals, and promote the development of a low-carbon, diversified, and digital energy industry.
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