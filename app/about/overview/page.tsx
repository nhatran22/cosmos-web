import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | COSMOS RF',
  description: 'Learn about COSMOS RF - A Canadian-based professional manufacturer specializing in high-performance RF products.',
};

const AboutContent = () => (
  <div className="prose max-w-none text-gray-600 space-y-4">
    <p>
      <span className='font-bold'>COSMOS RF</span> is a Canadian-based professional manufacturer specializing in high-performance, full-featured radio frequency (RF) products designed to mitigate unwanted interference in an increasingly crowded radio spectrum. As today's higher data rates demand improved radio signal-to-noise ratios, COSMOS RF's high-linearity RF components meet this critical need. Our innovative RF solutions address the evolving requirements of a wide range of applications, including indoor and outdoor cellular telecommunications systems, microwave systems, and more.
    </p>
    <h3 className='font-bold'>Research and Designing</h3>
    <p>
      Located in a leading hub for telecom research, development, and business, COSMOS RF is committed to delivering innovative and high-quality RF products to our clients. Our exceptional team of RF experts combines research expertise with industry experience. We also maintain extensive cooperative programs with scientific research institutes, universities, and centers in Canada and the United States to stay at the forefront of telecom technologies, particularly RF-related products. All COSMOS RF state-of-the-art products are designed and rigorously tested in our advanced laboratories before mass production.
    </p>
    <h3 className='font-bold'>Production</h3>
    <p>
      To deliver exceptional value to our customers through high-quality yet affordable products, we have adopted a mass production strategy in China. Our carefully selected production partners are verified through long-term collaboration. We transfer our designs and expertise to these partners, who leverage their highly skilled personnel, advanced production lines, and sophisticated testing equipment to create outstanding products that meet the needs of customers worldwide. Furthermore, all COSMOS RF products undergo stringent quality control processes and are tested under extreme conditions to ensure the highest standards. This rigorous approach has earned COSMOS RF products a reputation for stability and reliability in projects deployed globally.
    </p>
    <h3 className='font-bold'>Flexibility – Custom-Made for Local Markets</h3>
    <p>
      With our robust design capabilities and large production base, we offer exceptional flexibility to meet the specific requirements of customers across diverse markets.
    </p>
    <h3 className='font-bold'>Technical Support</h3>
    <p>
      Customers using COSMOS RF products benefit from technical support provided not only by our skilled in-house team but also by our partners and local distributors in various markets.
    </p>
  </div>
);

const AboutImage = () => (
  <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AboutContent />
          <AboutImage />
        </div>
      </div>
    </div>
  );
}