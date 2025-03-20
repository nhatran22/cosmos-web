import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load các section components
const AboutSection = dynamic(() => import('@/app/home/about-section'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>
});

const ProductSection = dynamic(() => import('./home/product-section'), {
  loading: () => <div className="h-96 bg-white animate-pulse"></div>
});

const SolutionSection = dynamic(() => import('./home/solution-section'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-x-5">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/other/background.png"
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-full text-white">
              <h1 className="text-[60px] font-medium mb-6 text-shadow-lg">
                For the Green Digital World
              </h1>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse"></div>}>
        <section className="bg-gray-50">
          <SolutionSection />
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse"></div>}>
        <section>
          <ProductSection />
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse"></div>}>
        <section>
          <AboutSection />
        </section>
      </Suspense>
    </div>
  );
}