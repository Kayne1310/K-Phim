import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/store/provider';
import BottomNav from '@/components/BottomNav';
import GlobalLoader from '@/components/GlobalLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'K-Phim | Xem phim online miễn phí chất lượng cao',
  description: 'Kho phim khổng lồ, cập nhật liên tục, không quảng cáo, giao diện Netflix.',
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
          <GlobalLoader />
          <Header />
            <main className="min-h-screen pt-16 bg-[--bg-primary] text-[--text-primary] pb-24 md:pb-0 transition-colors duration-300">
              {children}
            </main>
          <Footer />
          <BottomNav />
        </ReduxProvider>
      </body>
    </html>
  );
}
