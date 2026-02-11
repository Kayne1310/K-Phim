import { movieApi } from '@/service/api';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
       <div className="container mx-auto px-4 md:px-12 py-32 min-h-screen flex flex-col items-center justify-start text-center">
         <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
         </div>
         <h1 className="text-2xl font-bold text-white mb-2">Bạn muốn xem gì?</h1>
         <p className="text-gray-400 mb-8 max-w-md">Nhập tên phim, diễn viên hoặc thể loại để tìm kiếm trong kho phim khổng lồ của K-Phim.</p>
         
         <form action="/tim-kiem" className="w-full max-w-lg relative">
            <input 
              type="text" 
              name="keyword"
              placeholder="Nhập tên phim..." 
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-4 pl-6 pr-14 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all shadow-lg"
              autoFocus
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent p-2 rounded-full hover:bg-red-700 transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5 text-white" />
            </button>
         </form>
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
             Kết quả tìm kiếm: <span className="text-accent">&quot;{keyword}&quot;</span>
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
  } catch {
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
