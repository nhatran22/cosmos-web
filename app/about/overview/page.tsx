'use client';

import Image from 'next/image';

export default function Overview() {
  return (
    <div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Shenzhen ACwatt Power Co., Ltd.
            </h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                Shenzhen ACwatt Power Co., Ltd. (abbreviated as: Acwatt), with the mission of "For the green digital world", focusing on providing high-quality and reliable data center critical infrastructure integration solutions and new energy energy storage system solutions to global customers.
              </p>
              <p>
                The company has a professional team with independent production of key equipment and core technology, and has many leading core patented technologies in the industry. The product lines include industrial and commercial energy storage, uninterruptible power supply, intelligent modular data center, intelligent precision cooling and monitoring, etc.
              </p>
              <p>
                The company strictly adheres to the ISO quality and environmental management system, manages efficiently with strong CRM, ERP and MES systems, ensuring high-quality and efficient product delivery. The marketing network spans the globe, and the company strengthens operation management, promotes the construction of core channels, and provides strong support for partners.
              </p>
              <p>
                ACwatt's also focuses on improving the comprehensive ability of technical support and service teams, increasing personnel allocation, providing customers with professional, customized, cost-effective, high reliable solutions and technical services.
              </p>
              <p>
                The company upholds its original intention and actively assumes social responsibilities, implements the corporate culture of "working together, creating and sharing", promotes the digitalization, low-carbonization, diversification transformation and upgrading of the energy industry, and contributes to the realization of global carbon neutrality in the global village!
              </p>
            </div>
          </div>

          <div>
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
                alt="Corporate Building"
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