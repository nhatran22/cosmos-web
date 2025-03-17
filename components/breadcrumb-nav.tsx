'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return { href, label };
  });

  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                href={breadcrumb.href}
                className={`hover:text-blue-600 ${
                  index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''
                }`}
              >
                {breadcrumb.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}