'use client';

import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

interface HeroBannerProps {
  movies: Movie[];
}

export default function HeroBanner({ movies }: HeroBannerProps) {
  if (!movies || movies.length === 0) return null;

  // Take top 5 movies
  const heroMovies = movies.slice(0, 5);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-zinc-900 overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {heroMovies.map((movie) => (
           <SwiperSlide key={movie._id} className="relative w-full h-full">
             {/* 1. Blurred Background Layer */}
             <div className="absolute inset-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_url || movie.thumb_url}`}
                  alt={`${movie.name} background`}
                  fill
                  className="object-cover opacity-50 blur-xl scale-110" // Scale to avoid blur edges
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-transparent" />
             </div>

             {/* 2. Content Layer */}
             <div className="absolute inset-0 container mx-auto px-4 md:px-12 flex items-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-end md:items-center pb-20 md:pb-0">
                    
                    {/* Left Info */}
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-end h-full md:h-auto space-y-4 z-10">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg leading-tight line-clamp-2">
                        {movie.name}
                        </h1>
                        
                        <div className="flex items-center gap-3 text-sm md:text-lg font-medium text-gray-200">
                        <span className="text-green-500 font-bold">{movie.year}</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-md">{movie.quality}</span>
                        <span className="text-gray-300">{movie.origin_name}</span>
                        </div>

                        <p className="text-gray-300 text-sm md:text-lg line-clamp-3 max-w-2xl drop-shadow-md hidden md:block">
                        {movie.content?.replace(/<[^>]*>?/gm, '')}
                        </p>

                        <div className="flex items-center gap-3 pt-4">
                        <Link href={`/phim/${movie.slug}/xem`} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-md transition-all font-bold text-base md:text-lg shadow-lg shadow-accent/20 group">
                            <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                            <span>Xem Ngay</span>
                        </Link>
                        <Link href={`/phim/${movie.slug}`} className="flex items-center gap-2 bg-gray-600/60 hover:bg-gray-600/80 text-white px-6 py-3 rounded-md transition-all font-bold text-base md:text-lg backdrop-blur-md">
                            <InformationCircleIcon className="w-6 h-6" /> 
                            <span>Chi Tiết</span>
                        </Link>
                        </div>
                    </div>

                    {/* Right Floating Card (Desktop Only) */}
                    <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-center items-center">
                        <div className="relative w-64 h-96 lg:w-72 lg:h-[450px] rounded-lg overflow-hidden shadow-2xl shadow-black/50 rotate-3 hover:rotate-0 transition-transform duration-500 ring-1 ring-white/10 group">
                             <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.thumb_url || movie.poster_url}`} // Use Thumb if available for landscape card, or poster
                                alt={movie.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 300px, 400px"
                                quality={90}
                             />
                        </div>
                    </div>

                </div>
             </div>
           </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
