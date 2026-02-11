'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.movie.favorites);

  return (
    <div className="container mx-auto px-4 md:px-12 py-8 min-h-[80vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[--text-primary]">
          Phim Yêu Thích <span className="text-accent">({favorites.length})</span>
        </h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
          <h3 className="text-xl font-medium text-[--text-primary] mb-2">Chưa có phim yêu thích</h3>
          <p className="text-[--text-secondary] mb-6">Hãy thêm phim vào danh sách yêu thích để xem lại sau nhé!</p>
          <Link href="/" className="bg-accent px-6 py-2 rounded-full text-white font-bold hover:bg-red-700 transition-colors">
            Khám phá phim ngay
          </Link>
        </div>
      )}
    </div>
  );
}
