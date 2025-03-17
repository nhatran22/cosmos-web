import Image from 'next/image';
import AboutSection from '@/app/home/about-section';
import ProductSection from './home/product-section';
import SolutionSection from './home/solution-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-x-5">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/other/main-bg.png"
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-full text-white">
              <h1 className="text-[60px] font-medium mb-6">
                For the green Digital World
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50">
        <SolutionSection />
      </section>

      {/* Services Section */}
      <section>
        <ProductSection />
      </section>
      <section>
        <AboutSection />
      </section>
    </div>
  );
}