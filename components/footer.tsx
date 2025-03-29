'use client';

import { useCategories } from '@/app/contexts/CategoriesContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const { navigation } = useCategories();

  // Tìm các mục menu chính từ navigation
  const aboutSection = navigation.find(item => item.name === 'About Us');
  const productsSection = navigation.find(item => item.name === 'Products');
  const solutionSection = navigation.find(item => item.name === 'Solution');
  const supportSection = navigation.find(item => item.name === 'Service Support');

  return (
    <footer className="bg-gray-50 text-black">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-[18px] font-normal mb-4">About Us</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              {aboutSection?.submenu?.map(item => (
                <li key={item.title}>
                  <Link href={item.href || '/'} className="hover:text-green-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Center Section */}
          <div>
            <h3 className="text-[18px] font-normal mb-4">Product Center</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              {productsSection?.submenu?.map(category => (
                <li key={category.title}>
                  <Link
                    href={`/products?category=${encodeURIComponent(category.title)}`}
                    className="hover:text-green-600 text-left"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Section */}
          <div>
            <h3 className="text-[18px] font-normal mb-4">Solution</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              {solutionSection?.submenu?.map(solution => (
                <li key={solution.title}>
                  <Link
                    href={`/solutions?category=${encodeURIComponent(solution.title)}`}
                    className="hover:text-green-600"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Support Section */}
          <div>
            <h3 className="text-[18px] font-normal mb-4">Service Support</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              {supportSection?.submenu?.map(item => (
                <li key={item.title}>
                  <Link href={item.href || '/'} className="hover:text-green-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-6 text-center text-gray-400">
        <p>&copy; Copyright ©{new Date().getFullYear()} by COSMOS RF TECHNOLOGIES LP.All Rights Reserved | 45B West Wilmost st. - Richmond Hill City - Ontario - Canada.</p>
      </div>
    </footer>
  );
};

export default Footer;