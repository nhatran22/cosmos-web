import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingIcons from '@/components/floating-icons';
import Breadcrumb from '@/components/breadcrumb';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cosmos - Clean Energy Solutions',
  description: 'Providing clean energy solutions for a sustainable future',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <Breadcrumb />
          <main>{children}</main>
          <Footer />
          <FloatingIcons />
        </ThemeProvider>
      </body>
    </html>
  );
}