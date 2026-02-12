import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/store/provider';
import BottomNav from '@/components/BottomNav';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'K-Phim | Xem phim online miễn phí chất lượng cao',
  description: 'Kho phim khổng lồ, cập nhật liên tục, không quảng cáo, giao diện Netflix.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          <main className="min-h-screen pt-16 bg-[--bg-primary] text-[--text-primary] pb-24 md:pb-0 transition-colors duration-300">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
        <BottomNav />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MNT288XCHD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MNT288XCHD');
          `}
        </Script>
      </body>
    </html>
  );
}
