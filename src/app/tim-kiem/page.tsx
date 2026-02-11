import { movieApi } from '@/service/api';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

interface Props {
  searchParams: { keyword?: string; page?: string };
}

export const metadata: Metadata = {
  title: 'Tìm kiếm | K-Phim',
};

export default async function SearchPage({ searchParams }: Props) {
  const keyword = searchParams.keyword || '';
  const page = Number(searchParams.page) || 1;

  if (!keyword) {
     return (
       <div className="container mx-auto px-4 md:px-12 py-20 min-h-screen text-center">
         <h1 className="text-2xl font-bold text-white mb-4">Nhập từ khóa để tìm kiếm</h1>
       </div>
     );
  }

  try {
    const data = await movieApi.searchMovies(keyword, page);
    const movies = data.data.items;
    const pagination = data.data.params.pagination;

    return (
      <div className="container mx-auto px-4 md:px-12 py-8 min-h-screen">
        <div className="mb-8 border-b border-gray-800 pb-4">
           <h1 className="text-2xl md:text-3xl font-bold text-white">
             Kết quả tìm kiếm: <span className="text-accent">"{keyword}"</span>
           </h1>
           <p className="text-gray-400 mt-2">Tìm thấy {pagination.totalItems} kết quả.</p>
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
       <div className="min-h-screen flex items-center justify-center text-white">
         <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Không tìm thấy kết quả nào</h1>
            <p className="text-gray-400">Thử tìm với từ khóa khác.</p>
         </div>
       </div>
    );
  }
}
