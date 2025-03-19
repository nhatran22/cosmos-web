import Image from 'next/image';

export default function SHSeries() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">SH Series Residential PCS</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                The SH series hybrid inverter is designed for residential solar-plus-storage applications,
                offering high efficiency and reliable performance for home energy management.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>High efficiency power conversion</li>
                <li>Built-in energy management system</li>
                <li>Compatible with various battery types</li>
                <li>Smart monitoring and control</li>
                <li>Easy installation and maintenance</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1579847188804-2d57d73d3995?q=80&w=2940&auto=format&fit=crop"
                alt="SH Series Inverter"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}