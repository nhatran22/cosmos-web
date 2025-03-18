'use client';

import { usePathname } from 'next/navigation';
import Navigation from './navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div>
      {isHomePage && (
        <header className="fixed w-full bg-white z-50 shadow-sm rounded-full">
          <Navigation />
        </header>
      )}
      {!isHomePage && (
        <div className="relative h-[500px] w-full">
          <Image
            src="/other/sub-bg.png"
            alt="Main Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-opacity-50">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-full text-white">
                <h1 className="text-[60px] font-medium mb-6 ml-20">
                  For the green Digital World
                </h1>
              </div>
            </div>
          </div>
          <Navigation />
        </div>
      )}
    </div>
  );
};

export default Header;