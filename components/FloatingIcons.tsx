'use client';

import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function FloatingIcons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <ArrowUp className="w-[30px] h-[30px] text-white" />
        </button>
      )}
    </div>
  );
}