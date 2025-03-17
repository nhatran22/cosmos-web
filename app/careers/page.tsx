import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Careers() {
  const benefits = [
    {
      title: 'Professional Growth',
      description: 'Continuous learning and development opportunities'
    },
    {
      title: 'Global Impact',
      description: 'Work on projects that make a difference worldwide'
    },
    {
      title: 'Innovation',
      description: 'Be part of cutting-edge sustainable energy solutions'
    },
    {
      title: 'Work-Life Balance',
      description: 'Flexible working arrangements and comprehensive benefits'
    }
  ];

  return (
    <div className="pt-20">
      <div className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2940&auto=format&fit=crop"
          alt="Careers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl">Build your career with a global leader in sustainable energy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Join Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Current Opportunities</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals to join our team. Explore our current openings and find your next opportunity.
            </p>
            <Button size="lg" className="w-full mb-4">
              View Open Positions
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Don't see a position that matches your skills? Send us your resume for future opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}