'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { HomeIcon, RectangleStackIcon, FilmIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, RectangleStackIcon as RectangleStackSolid, FilmIcon as FilmSolid, HeartIcon as HeartSolid, MagnifyingGlassIcon as MagnifyingGlassSolid } from '@heroicons/react/24/solid';
import { Suspense } from 'react';

function BottomNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');

  const navItems = [
    { name: 'Trang Chủ', href: '/', icon: HomeIcon, activeIcon: HomeSolid },
    { name: 'HHTQ', href: '/danh-sach/hoat-hinh?country=trung-quoc', icon: RectangleStackIcon, activeIcon: RectangleStackSolid },
    { name: 'Phim Lẻ', href: '/danh-sach/phim-le', icon: FilmIcon, activeIcon: FilmSolid },
    { name: 'Yêu Thích', href: '/yeu-thich', icon: HeartIcon, activeIcon: HeartSolid },
    { name: 'Tìm Kiếm', href: '/tim-kiem', icon: MagnifyingGlassIcon, activeIcon: MagnifyingGlassSolid },
  ];

  const handleVibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10); 
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full lg:hidden bg-black border-t border-gray-800 transition-all duration-300 shadow-2xl pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          let isActive = pathname === item.href;
          
          // Special handling for HHTQ which uses query params
          if (item.name === 'HHTQ') {
            isActive = pathname === '/danh-sach/hoat-hinh' && countryParam === 'trung-quoc';
          }

          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleVibrate}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
                isActive ? 'text-accent scale-105' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function BottomNav() {
  return (
    <Suspense fallback={<div className="fixed bottom-0 left-0 w-full h-16 bg-black border-t border-gray-800 lg:hidden z-50" />}>
      <BottomNavContent />
    </Suspense>
  );
}
