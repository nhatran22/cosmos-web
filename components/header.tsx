'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const navigation = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'About Us',
      href: '/about',
      submenu: [
        {
          title: 'Our Company',
          items: [
            { name: 'Overview', href: '/about/overview' },
            { name: 'Leadership', href: '/about/leadership' },
            { name: 'History', href: '/about/history' },
          ]
        },
        {
          title: 'Join Us',
          items: [
            { name: 'Careers', href: '/careers' },
            { name: 'Culture', href: '/about/culture' },
            { name: 'Benefits', href: '/about/benefits' },
          ]
        }
      ]
    },
    {
      name: 'Product',
      href: '#',
      submenu: [
        {
          title: 'Residental Hybrid Inverter',
          items: [
            { name: 'SH Series Residental PCS', href: '/products/sh-series' },
            { name: 'TH Series Residental PCS', href: '/products/th-series' },
          ]
        },
        {
          title: 'Industrial & commercial',
          items: [
            { name: 'CSH Series Industrial & comm...', href: '/products/csh-series' },
            { name: 'CSR Series Industrial & comm...', href: '/products/csr-series' },
            { name: 'CST Series Industrial & comm...', href: '/products/cst-series' },
          ]
        },
        {
          title: 'UPS Power Supply',
          items: [
            { name: 'ACM Series Modular UPS', href: '/products/acm-series' },
            { name: 'ACT Series Three-Phase UPS', href: '/products/act-series' },
            { name: 'ACM Series Modular UPS(480V)', href: '/products/acm-series-480v' },
            { name: 'ACM Series Modular UPS(208V)', href: '/products/acm-series-208v' },
            { name: 'ACS Tower Series', href: '/products/acs-tower' },
            { name: 'ACS Rack Series', href: '/products/acs-rack' },
          ]
        },
        {
          title: 'Modular Data Center',
          items: [
            { name: 'AC5000 Series MDC', href: '/products/ac5000-series' },
          ]
        },
        {
          title: 'Precision Cooling',
          items: [
            { name: 'HA Series In-row cooling', href: '/products/ha-series' },
            { name: 'BA Series Room Cooling', href: '/products/ba-series' },
            { name: 'MA Series Large Room Cooling', href: '/products/ma-series' },
          ]
        }
      ]
    },
    {
      name: 'Solution',
      href: '#',
      submenu: [
        {
          title: 'Data Center Critical Infrastructure',
          items: [
            { name: 'Intelligent Modular Data Center', href: '/solutions/data-center' },
          ]
        },
        {
          title: 'New Energy Storage System',
          items: [
            { name: 'Residential Storage Hybrid Inverter', href: '/solutions/residential-storage' },
            { name: 'Industrial & commercial Storage', href: '/solutions/commercial-storage' },
          ]
        }
      ]
    },
    {
      name: 'Service Support',
      href: '#',
      submenu: [
        {
          title: 'Contact Us',
          items: [
            { name: 'Technical Support', href: '/support/technical' },
            { name: 'Sales Inquiry', href: '/support/sales' },
            { name: 'Service Locations', href: '/support/locations' },
          ]
        }
      ]
    }
  ];

  return (
    <header className="fixed w-full bg-white z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/other/cosmos-web-logo.png"
                width={250}
                height={150}
                alt="Cosmos Logo"
                className="object-cover"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-4 py-2 text-[18px] text-gray-700 hover:text-gray-900 font-medium"
                  onClick={(e) => {
                    if (item.submenu) {
                      // e.preventDefault();
                    }
                  }}
                >
                  {item.name}
                </Link>

                {item.submenu && (
                  <div className="absolute left-1/2 -translate-x-1/2 pt-7 w-screen min-w-[20px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100">
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {item.submenu.map((section) => (
                          <div key={section.title} className="space-y-4">
                            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 text-green-600">
                              {section.title}
                            </h3>
                            <ul className="space-y-2">
                              {section.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="text-sm text-gray-600 hover:text-green-600 block transition-colors duration-200"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white border-t overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name} className="border-b">
                  <button
                    onClick={() => toggleSection(item.name)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left"
                  >
                    <span className="text-gray-900 font-medium">{item.name}</span>
                    {item.submenu && (
                      <ChevronRight
                        className={`h-5 w-5 transform transition-transform ${expandedSections.includes(item.name) ? 'rotate-90' : ''
                          }`}
                      />
                    )}
                  </button>

                  {item.submenu && expandedSections.includes(item.name) && (
                    <div className="bg-gray-50">
                      {item.submenu.map((section) => (
                        <div key={section.title} className="px-4 py-2">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">
                            {section.title}
                          </h3>
                          <ul className="space-y-1">
                            {section.items.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className="block py-2 text-sm text-gray-600 hover:text-green-600"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;