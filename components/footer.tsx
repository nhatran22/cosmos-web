'use client';

import Link from 'next/link';
import Image from 'next/image';
import { navigation } from './mock/header-navigation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <footer className="bg-gray-50 text-black">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[18px] font-normal mb-4">About Us</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about" className="hover:text-green-600">Our Company</Link></li>
              <li><Link href="/projects" className="hover:text-green-600">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Product Center</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/products?category=UPS%20Power%20Supply" className="hover:text-green-600 text-left">UPS Power Supply</Link></li>
              <li><Link href="/products?category=Modular%20Data%20Center" className="hover:text-green-600 text-left">Modular Data Center</Link></li>
              <li><Link href="/products?category=Precision%20Cooling" className="hover:text-green-600 text-left">Precision Cooling</Link></li>
              <li><Link href="/products?category=Residental%20Hybrid%20Inverter" className="hover:text-green-600 text-left">Household Hybrid Inverter</Link></li>
              <li><Link href="/products?category=Industrial%20%26%20commercial" className="hover:text-green-600 text-left">Industrial Hybrid Inverter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Solution</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/solutions?category=Data%20Center%20Critical%20Infrastructure" className="hover:text-green-600">Data Center Critical Infrastructure</Link></li>
              <li><Link href="/solutions?category=New%20Energy%20Storage%20System" className="hover:text-green-600">New Energy Storage System Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Service Support</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about" className="hover:text-green-600">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Cosmos Web. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;