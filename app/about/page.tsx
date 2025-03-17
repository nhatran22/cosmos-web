import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbNav from '@/components/breadcrumb-nav';

export default function About() {
  const sections = [
    {
      title: 'Company Overview',
      description: 'Learn about our mission, vision, and values',
      link: '/about/overview',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Leadership',
      description: 'Meet our experienced management team',
      link: '/about/leadership',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Sustainability',
      description: 'Our commitment to environmental and social responsibility',
      link: '/about/environmental',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2940&auto=format&fit=crop'
    }
  ];

  return (
    <div className="pt-20">
      <BreadcrumbNav />
      <div className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">About ACWA Power</h1>
              <p className="text-xl">Powering a sustainable future</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link key={section.title} href={section.link}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}