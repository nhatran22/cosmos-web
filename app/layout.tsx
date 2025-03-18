import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingIcons from '@/components/floating-icons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cosmos Web',
  description: 'A modern energy and water company',
  icons: '/other/cosmos-web-icon.png'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingIcons />
        </ThemeProvider>
      </body>
    </html>
  );
}