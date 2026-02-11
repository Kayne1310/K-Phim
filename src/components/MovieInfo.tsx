'use client';

import { useState } from 'react';
import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToFavorites, removeFromFavorites } from '@/store/slices/movieSlice';

interface MovieInfoProps {
  movie: Movie;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movie.favorites);
  const isFavorite = favorites.some((m) => m._id === movie._id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie._id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <div className="relative w-full">
      {/* Backdrop */}
      <div className="absolute inset-0 h-[50vh] md:h-[70vh] bg-zinc-900">
        {/* Backdrop Skeleton */}
        <div className={`absolute inset-0 bg-zinc-800 animate-pulse transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
        
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_url || movie.thumb_url}`}
          alt={movie.name}
          fill
          className={`object-cover blur-sm transition-opacity duration-700 ${isLoaded ? 'opacity-40' : 'opacity-0'}`} 
          priority
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 md:px-12 py-8 md:py-16 pt-[20vh] md:pt-[30vh] flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-48 md:w-72 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl mx-auto md:mx-0 bg-zinc-800 relative">
          {/* Poster Skeleton */}
          <div className={`absolute inset-0 bg-zinc-700 animate-pulse transition-opacity duration-500 z-10 ${isPosterLoaded ? 'opacity-0' : 'opacity-100'}`} />
          
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.thumb_url || movie.poster_url}`}
            alt={movie.name}
            fill
            className={`object-cover transition-opacity duration-500 ${isPosterLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority
            sizes="(max-width: 768px) 192px, 288px"
            onLoad={() => setIsPosterLoaded(true)}
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.name}</h1>
          <h2 className="text-xl text-gray-400 font-medium mb-4">{movie.origin_name} ({movie.year})</h2>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-300">
             <span className="bg-white/10 px-2 py-1 rounded">{movie.quality}</span>
             <span className="bg-white/10 px-2 py-1 rounded">{movie.lang}</span>
             <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> {movie.view ? movie.view.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0} views</span>
             <span>{movie.time}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 py-4">
             <Link 
               href={`/phim/${movie.slug}/xem`} 
               className="flex items-center gap-2 bg-accent hover:bg-white hover:text-black text-white px-8 py-3 rounded font-bold text-lg transition-colors shadow-lg shadow-accent/20"
             >
               <PlayIcon className="w-6 h-6" /> Xem Phim
             </Link>
             
             <button 
               onClick={toggleFavorite}
               className={`flex items-center gap-2 px-6 py-3 rounded font-medium border transition-colors ${
                 isFavorite 
                   ? 'bg-white text-accent border-white hover:bg-gray-100' 
                   : 'bg-transparent text-white border-gray-500 hover:border-white'
               }`}
             >
               {isFavorite ? <HeartIcon className="w-6 h-6" /> : <HeartOutline className="w-6 h-6" />}
               {isFavorite ? 'Đã Thích' : 'Yêu Thích'}
             </button>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 mt-6 bg-white/5 p-4 rounded-lg">
             <div>
               <span className="text-gray-500 block">Đạo diễn:</span>
               <span className="text-white">{movie.director?.join(', ') || 'N/A'}</span>
             </div>
             <div>
               <span className="text-gray-500 block">Diễn viên:</span>
               <span className="text-white">{movie.actor?.join(', ') || 'N/A'}</span>
             </div>
             <div>
               <span className="text-gray-500 block">Thể loại:</span>
               <div className="flex flex-wrap gap-2 mt-1">
                 {movie.category?.map(c => (
                   <Link key={c.id} href={`/the-loai/${c.slug}`} className="hover:text-accent transition-colors">
                     {c.name}
                   </Link>
                 ))}
               </div>
             </div>
             <div>
               <span className="text-gray-500 block">Quốc gia:</span>
               <div className="flex flex-wrap gap-2 mt-1">
                 {movie.country?.map(c => (
                   <Link key={c.id} href={`/quoc-gia/${c.slug}`} className="hover:text-accent transition-colors">
                     {c.name}
                   </Link>
                 ))}
               </div>
             </div>
          </div>

          {/* Content */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-2">Nội dung phim</h3>
            <div 
              className="text-gray-300 leading-relaxed text-sm md:text-base space-y-2"
              dangerouslySetInnerHTML={{ __html: movie.content }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
