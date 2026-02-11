import { movieApi } from '@/service/api';
import VideoPlayer from '@/components/VideoPlayer';
import EpisodeList from '@/components/EpisodeList';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
  searchParams: { server?: string; slug?: string };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const data = await movieApi.getMovieDetail(params.slug);
  const movie = data.data.item;
  const episodeName = searchParams.slug ? ` - Tập ${searchParams.slug}` : '';
  return {
    title: `Xem phim ${movie.name}${episodeName} | K-Phim`,
    description: `Xem phim ${movie.name} miễn phí chất lượng cao tại K-Phim.`,
  };
}

export default async function WatchPage({ params, searchParams }: Props) {
  try {
    const data = await movieApi.getMovieDetail(params.slug);
    const movie = data.data.item;

    // Determine current server and episode
    const episodes = movie.episodes || [];
    if (episodes.length === 0) {
       return <div className="text-center py-20 text-white">Phim chưa có tập nào.</div>;
    }

    const currentServerName = searchParams.server || episodes[0].server_name;
    const currentServer = episodes.find(s => s.server_name === currentServerName) || episodes[0];
    
    // Find episode by slug or index? Api returns slug like 'tap-1'.
    // link_embed is in episode object.
    const currentEpisodeSlug = searchParams.slug || currentServer.server_data[0].slug;
    const currentEpisode = currentServer.server_data.find(e => e.slug === currentEpisodeSlug) || currentServer.server_data[0];

    return (
      <div className="container mx-auto px-4 md:px-12 py-8 min-h-screen">
        <div className="mb-6">
           <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
             Xem phim: <span className="text-accent">{movie.name}</span>
           </h1>
           <h2 className="text-lg text-gray-400">
             {movie.origin_name} - {currentEpisode.name}
           </h2>
        </div>

        <VideoPlayer embedUrl={currentEpisode.link_embed} />

        <EpisodeList 
          movie={movie} 
          currentEpisodeSlug={currentEpisode.slug} 
          currentServerName={currentServer.server_name} 
        />
        
        <div className="mt-8 bg-bg-secondary p-6 rounded-lg">
           <h3 className="text-xl font-bold text-white mb-4">Thông tin phim</h3>
           <div 
              className="text-gray-300 text-sm leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: movie.content }} 
           />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Không tìm thấy phim hoặc tập phim.
      </div>
    );
  }
}
