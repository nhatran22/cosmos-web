import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      title: 'Portfolio',
      description: 'Explore our diverse range of projects across the globe',
      link: '/projects/portfolio',
      image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Case Studies',
      description: 'In-depth analysis of our successful implementations',
      link: '/projects/case-studies',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop'
    },
    {
      title: 'Global Presence',
      description: 'Our worldwide impact and operations',
      link: '/projects/global-presence',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2940&auto=format&fit=crop'
    }
  ];

  return (
    <div className="pt-20">
      <div className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2940&auto=format&fit=crop"
          alt="Our Projects"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
              <p className="text-xl">Delivering sustainable solutions worldwide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.title} href={project.link}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}