'use client';

import { movieApi } from '@/service/api';
import { Movie } from '@/types/movie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function HeaderContent() {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Debounce search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const res = await movieApi.searchMovies(searchQuery, 1, 5);
          setSearchResults(res.data.items || []);
        } catch (error) {
          console.error("Search error", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      router.push(`/tim-kiem?keyword=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
    }
  };

  const handleSelectMovie = (slug: string) => {
    router.push(`/phim/${slug}`);
    setSearchQuery('');
    setSearchResults([]);
    setShowDropdown(false);
  };

  const navLinks = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'HHTQ', href: '/danh-sach/hoat-hinh?country=trung-quoc' },
    { name: 'Phim Lẻ', href: '/danh-sach/phim-le' },
    { name: 'Hoạt Hình', href: '/danh-sach/hoat-hinh' },
    { name: 'TV Shows', href: '/danh-sach/tv-shows' },
    { name: 'Lịch Sử', href: '/lich-su' },
    { name: 'Mới Nhất', href: '/danh-sach/phim-moi' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-500 bg-black/90 backdrop-blur-md shadow-md max-md:landscape:hidden`}
    >
      <div className="container mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-accent text-2xl font-bold tracking-tighter hover:text-accent-hover transition-colors">
            K-Phim
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.name === 'HHTQ'
                ? pathname === '/danh-sach/hoat-hinh' && countryParam === 'trung-quoc'
                : link.name === 'Hoạt Hình'
                  ? pathname === '/danh-sach/hoat-hinh' && !countryParam
                  : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-gray-300 ${isActive ? 'text-white font-bold' : 'text-gray-400'
                    }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Search & Mobile Toggle */}
        <div className="flex items-center gap-4 relative">

          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative z-50">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-black/50 border border-gray-700 rounded-full px-3 py-1 focus-within:border-white focus-within:bg-black/90 transition-all w-64">
              <MagnifyingGlassIcon className={`w-5 h-5 text-gray-400 ${isSearching ? 'animate-spin' : ''}`} />
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                className="bg-transparent border-none text-white text-sm px-2 py-1 w-full outline-none placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow click
              />
              {searchQuery && (
                <button type="button" onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="text-gray-500 hover:text-white">
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Dropdown Results */}
            {showDropdown && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto custom-scrollbar">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    <div className="inline-block w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang tìm kiếm...
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((movie) => (
                      <div
                        key={movie._id}
                        onClick={() => handleSelectMovie(movie.slug)}
                        className="flex gap-3 p-3 hover:bg-zinc-800 cursor-pointer transition-colors border-b border-zinc-800 last:border-none"
                      >
                        <div className="flex-shrink-0 w-12 h-16 relative rounded overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.thumb_url}`}
                            alt={movie.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden">
                          <h4 className="text-white text-sm font-bold truncate">{movie.name}</h4>
                          <span className="text-xs text-gray-400 truncate">{movie.origin_name} ({movie.year})</span>
                        </div>
                      </div>
                    ))}
                    <div
                      onClick={handleSearchSubmit}
                      className="p-2 text-center text-xs text-accent hover:text-white cursor-pointer bg-zinc-950 font-bold uppercase tracking-wider"
                    >
                      Xem tất cả kết quả
                    </div>
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    Không tìm thấy kết quả cho &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Icon - Hidden as per request */}
          <Link href="/tim-kiem" className="hidden md:hidden text-white">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </Link>

          {/* Mobile Menu Button - Hidden as per request */}
          <button
            className="hidden md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-bg-primary border-t border-gray-800 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium py-2 border-b border-gray-800 ${pathname === link.href ? 'text-accent' : 'text-gray-300'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="h-16 bg-black/90 fixed top-0 w-full z-50"></div>}>
      <HeaderContent />
    </Suspense>
  );
}
