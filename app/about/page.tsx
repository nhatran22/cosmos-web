'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/about/overview');
  }, [router]);

  return null;
}