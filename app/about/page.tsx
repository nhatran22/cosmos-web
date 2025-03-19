'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng người dùng từ /about sang /about/overview
    router.replace('/about/overview');
  }, [router]);

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

  return null; // Không render gì khi đang chuyển hướng
}