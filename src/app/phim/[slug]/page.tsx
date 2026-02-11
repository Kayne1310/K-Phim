import { movieApi } from '@/service/api';
import MovieInfo from '@/components/MovieInfo';
import EpisodeList from '@/components/EpisodeList';
import MovieRow from '@/components/MovieRow';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await movieApi.getMovieDetail(params.slug);
    const movie = data.data.item;
    return {
      title: `${movie.name} - ${movie.origin_name} | K-Phim`,
      description: movie.content?.substring(0, 160) || 'Xem phim online miễn phí chất lượng cao tại K-Phim.',
      openGraph: {
        images: [`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.thumb_url}`],
      },
    };
  } catch {
    return {
      title: 'Phim không tìm thấy | K-Phim',
    };
  }
}

export default async function MovieDetailPage({ params }: Props) {
  try {
    const data = await movieApi.getMovieDetail(params.slug);
    const movie = data.data.item;

    // Fetch related movies if category exists
    let relatedMovies: import('@/types/movie').Movie[] = [];
    if (movie.category && movie.category.length > 0) {
      try {
        const relatedData = await movieApi.getMoviesByCategory(movie.category[0].slug, 1, 12);
        relatedMovies = relatedData.data.items.filter(m => m._id !== movie._id);
      } catch (err) {
        console.error("Error fetching related movies", err);
      }
    }

    return (
      <div className="pb-20">
        <MovieInfo movie={movie} />
        
        <div className="container mx-auto px-4 md:px-12 mt-8">
           <EpisodeList movie={movie} />
        </div>

        <div className="mt-16">
          <MovieRow title="Có thể bạn sẽ thích" movies={relatedMovies} />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy phim</h1>
          <p className="text-gray-400">Có thể phim đã bị xóa hoặc đường dẫn không tồn tại.</p>
        </div>
      </div>
    );
  }
}
