'use client';

import { useRouter } from 'next/navigation';
import { Movie } from '@/types/movie';


interface EpisodeListProps {
  movie: Movie;
  currentEpisodeSlug?: string;
  currentServerName?: string;
}

export default function EpisodeList({ movie, currentEpisodeSlug }: EpisodeListProps) {
  const router = useRouter();

  if (!movie.episodes || movie.episodes.length === 0) return null;

  return (
    <div className="w-full bg-bg-secondary/50 rounded-lg p-4 md:p-6 mt-8 relative z-10">
      <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-accent pl-2">Danh sách tập</h3>

      <div className="space-y-6">
        {movie.episodes.map((server, index) => (
          <div key={`${server.server_name}-${index}`}>
            <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
              Server: <span className="text-white">{server.server_name}</span>
            </h4>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {[...(server.server_data || [])].reverse().map((ep) => {
                const isActive = currentEpisodeSlug === ep.slug;

                return (
                  <button
                    key={ep.slug}
                    onClick={() => {
                      const url = `/phim/${movie.slug}/xem?server=${encodeURIComponent(server.server_name)}&slug=${ep.slug}`;
                      router.push(url);
                    }}
                    className={`text-center py-2 px-1 rounded text-sm font-medium transition-colors border cursor-pointer ${isActive
                      ? 'bg-accent text-white border-accent'
                      : 'bg-bg-primary text-gray-300 border-gray-700 hover:border-white hover:text-white'
                      }`}
                  >
                    {ep.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
