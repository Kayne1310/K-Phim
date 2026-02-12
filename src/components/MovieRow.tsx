'use client';

import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  linkTo?: string; // e.g., /danh-sach/phim-moi
}

export default function MovieRow({ title, movies, linkTo }: MovieRowProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="py-8 px-4 md:px-12 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white hover:text-accent transition-colors cursor-pointer">
          {linkTo ? <Link href={linkTo}>{title}</Link> : title}
        </h2>
        {linkTo && (
          <Link href={linkTo} className="flex items-center text-sm font-semibold text-gray-400 hover:text-white transition-colors group">
            Xem tất cả <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={10}
        slidesPerView={2}
        freeMode={true}
        navigation
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
        }}
        className="movie-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id} className="!h-auto">
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
