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
        <div className="relative h-[300px] w-full">
          <Image
            src="/other/background.png"
            alt="Main Background"
            fill
            className="object-cover"
            priority
          />
          <Navigation />
        </div>
      )}
    </div>
  );
};

export default Header;