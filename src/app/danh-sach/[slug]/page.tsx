import { movieApi } from '@/service/api';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import FilterBar from '@/components/FilterBar';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `${title} | K-Phim`,
    description: `Xem danh sách phim ${title} mới nhất tại K-Phim.`,
  };
}

export default async function ListPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const slug = params.slug;

  try {
    const data = await movieApi.getMovieList(slug, page, 25, searchParams);
    const movies = data.data.items;
    const pagination = data.data.params.pagination;

    // Title formatting
    const title = data.data.titlePage || slug.replace(/-/g, ' ');

    return (
      <div className="container mx-auto px-4 md:px-12 py-8 min-h-screen">
        <FilterBar />
        <div className="mb-8 border-b border-gray-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">
             {title}
           </h1>
           <span className="text-gray-400 text-sm">Trang {page} / {Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)}</span>
        </div>

        <MovieGrid movies={movies} />
        
        <Pagination 
           currentPage={page} 
           totalPages={Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)} 
        />
      </div>
    );
  } catch {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 text-center">
         <h1 className="text-2xl font-bold mb-2">Không tìm thấy danh sách</h1>
         <p className="text-gray-400">Có thể đường dẫn không tồn tại hoặc API đang lỗi.</p>
       </div>
    );
  }
}
