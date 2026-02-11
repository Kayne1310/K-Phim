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
    title: `Phim ${title} | K-Phim`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const slug = params.slug;

  try {
    const data = await movieApi.getMoviesByCategory(slug, page);
    const movies = data.data.items;
    const pagination = data.data.params.pagination;
    const title = data.data.titlePage || slug;

    return (
      <div className="container mx-auto px-4 md:px-12 py-8 min-h-screen">
        <FilterBar />
        <div className="mb-8 border-b border-gray-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">
             {title}
           </h1>
           <span className="text-gray-400 text-sm">Trang {page}</span>
        </div>

        <MovieGrid movies={movies} />
        
        <Pagination 
           currentPage={page} 
           totalPages={Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)} 
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 md:px-12 py-20 min-h-screen">
        <FilterBar />
        <div className="text-center text-white">Không tìm thấy phim.</div>
      </div>
    );
  }
}
