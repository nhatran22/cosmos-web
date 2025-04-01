import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FloatingIconsWrapper, ZaloChatWrapper } from '@/components/ClientWrappers';
import PerformanceInitializer from '@/app/utils/performance-init';
import { CategoriesProvider } from '@/app/contexts/CategoriesContext';
import { SpeedInsights } from "@vercel/speed-insights/next"

// Dynamic imports for performance
const Header = dynamic(() => import('@/components/header'), {
  ssr: true,
});

const Breadcrumb = dynamic(() => import('@/components/breadcrumb'), {
  ssr: true,
});

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: true,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cosmos - Clean Energy Solutions',
  description: 'Providing clean energy solutions for a sustainable future',
  icons: '/other/cosmos-web-icon.png'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload quan trọng */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/other/background.png"
          as="image"
        />
        {/* Preconnect tới origins quan trọng */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CategoriesProvider>
            <Header />
            <Suspense fallback={<div className="h-10 bg-gray-50"></div>}>
              <Breadcrumb />
            </Suspense>
            <main>
              <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>}>
                {children}
                <SpeedInsights />
              </Suspense>
            </main>
            <Footer />
            <FloatingIconsWrapper />
            <ZaloChatWrapper />
            <PerformanceInitializer />
          </CategoriesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
