'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { PlayIcon } from '@heroicons/react/24/solid';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.thumb_url}`; // Fallback logical handled by upstream or error? Next Image handles error.
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link href={`/phim/${movie.slug}`} className="group relative block w-full aspect-[2/3] rounded-md overflow-hidden bg-zinc-900 transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-lg hover:shadow-black/50">
      
      {/* Skeleton / Loading Placeholder */}
      <div className={`absolute inset-0 bg-zinc-800 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />

      <Image
        src={imageUrl}
        alt={movie.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} group-hover:opacity-80`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <span className="bg-accent/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          {movie.quality}
        </span>
        <span className="bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
          {movie.lang}
        </span>
      </div>

      {/* Overlay & Info on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <div className="flex items-center gap-2 mb-1">
             <button className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition-colors">
               <PlayIcon className="w-4 h-4" />
             </button>
             <span className="text-green-500 text-xs font-bold">{movie.year}</span>
           </div>
           
           <h3 className="text-white text-sm font-bold line-clamp-1">{movie.name}</h3>
           <p className="text-gray-300 text-xs line-clamp-1">{movie.origin_name}</p>
        </div>
      </div>
      
      {/* Title below card (optional, Netflix hides it and shows in overlay, but for better accessibility/visibility maybe show it? keeping it inside overlay as per Netflix style for clean look) */}
      {/* Actually Netflix Web shows title below or in expanded card. Let's keep it simple: Title below card on mobile, overlay on desktop? No, consistancy. Overlay is good for "clean" look. But let's add a Fallback title below if needed. For now overlay is fine. */}
    </Link>
  );
}
