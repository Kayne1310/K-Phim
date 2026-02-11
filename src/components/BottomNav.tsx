'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, RectangleStackIcon, FilmIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, RectangleStackIcon as RectangleStackSolid, FilmIcon as FilmSolid, HeartIcon as HeartSolid, MagnifyingGlassIcon as MagnifyingGlassSolid } from '@heroicons/react/24/solid';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Trang Chủ', href: '/', icon: HomeIcon, activeIcon: HomeSolid },
    { name: 'Phim Bộ', href: '/danh-sach/phim-bo', icon: RectangleStackIcon, activeIcon: RectangleStackSolid },
    { name: 'Phim Lẻ', href: '/danh-sach/phim-le', icon: FilmIcon, activeIcon: FilmSolid },
    { name: 'Yêu Thích', href: '/yeu-thich', icon: HeartIcon, activeIcon: HeartSolid },
    { name: 'Tìm Kiếm', href: '/tim-kiem', icon: MagnifyingGlassIcon, activeIcon: MagnifyingGlassSolid },
  ];

  const handleVibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10); // Haptic feedback (10ms vibration)
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] md:hidden bg-[--nav-bg] backdrop-blur-md border-t border-[--nav-border] pb-safe transition-colors duration-300">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
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
