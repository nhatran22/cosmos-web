'use client';

import Link from 'next/link';
import Image from 'next/image';
import { navigation } from './mock/header-navigation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const handleProductClick = (category: string) => {
    // Lưu category đã chọn vào localStorage để sử dụng sau khi chuyển trang
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedProductCategory', category);
    }
    router.push('/products');
  };

  const handleSolutionClick = (category: string) => {
    // Lưu category đã chọn vào localStorage để sử dụng sau khi chuyển trang
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSolutionCategory', category);
    }
    router.push('/solutions');
  };

  return (
    <footer className="bg-gray-50 text-black">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[18px] font-normal mb-4">About Us</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about/overview" className="hover:text-green-600">Our Company</Link></li>
              <li><Link href="/about/join-us" className="hover:text-green-600">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Product Center</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><button onClick={() => handleProductClick('UPS Power Supply')} className="hover:text-green-600 text-left">UPS Power Supply</button></li>
              <li><button onClick={() => handleProductClick('Modular Data Center')} className="hover:text-green-600 text-left">Modular Data Center</button></li>
              <li><button onClick={() => handleProductClick('Precision Cooling')} className="hover:text-green-600 text-left">Precision Cooling</button></li>
              <li><button onClick={() => handleProductClick('Residental Hybrid Inverter')} className="hover:text-green-600 text-left">Household Hybrid Inverter</button></li>
              <li><button onClick={() => handleProductClick('Industrial & commercial')} className="hover:text-green-600 text-left">Industrial Hybrid Inverter</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Solution</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><button onClick={() => handleSolutionClick('Data Center Critical Infrastructure')} className="hover:text-green-600 text-left">Data Center Critical Infrastructure</button></li>
              <li><button onClick={() => handleSolutionClick('New Energy Storage System')} className="hover:text-green-600 text-left">New Energy Storage System Solutions</button></li>
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