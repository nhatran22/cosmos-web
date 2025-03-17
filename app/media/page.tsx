import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbNav from '@/components/breadcrumb-nav';

export default function Media() {
  const sections = [
    {
      title: 'Press Releases',
      description: 'Latest news and announcements',
      link: '/media/press-releases',
      image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Media Library',
      description: 'Photos, videos, and resources',
      link: '/media/library',
      image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Events',
      description: 'Upcoming and past events',
      link: '/media/events',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2940&auto=format&fit=crop'
    }
  ];

  return (
    <div className="pt-20">
      <BreadcrumbNav />
      <div className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2940&auto=format&fit=crop"
          alt="Media Center"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Media Center</h1>
              <p className="text-xl">Stay updated with our latest news and events</p>
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