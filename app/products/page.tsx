import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbNav from '@/components/breadcrumb-nav';

export default function PowerSolutions() {
  return (
    <div className="pt-20">
      <BreadcrumbNav />
      <div className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2940&auto=format&fit=crop"
          alt="Power Solutions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Power Solutions</h1>
              <p className="text-xl">Innovative power solutions for a sustainable future</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1579847188804-2d57d73d3995?q=80&w=2940&auto=format&fit=crop"
                alt="Residential Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Residential Hybrid Inverter</h3>
              <p className="text-gray-600 mb-4">Advanced power solutions for residential applications</p>
              <Link href="/products/sh-series" className="text-blue-600 hover:text-blue-800">Learn more →</Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2940&auto=format&fit=crop"
                alt="Industrial Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Industrial & Commercial</h3>
              <p className="text-gray-600 mb-4">Robust power solutions for business needs</p>
              <Link href="/products/csh-series" className="text-blue-600 hover:text-blue-800">Learn more →</Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2940&auto=format&fit=crop"
                alt="UPS Solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">UPS Power Supply</h3>
              <p className="text-gray-600 mb-4">Reliable uninterruptible power supply systems</p>
              <Link href="/products/acm-series" className="text-blue-600 hover:text-blue-800">Learn more →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}