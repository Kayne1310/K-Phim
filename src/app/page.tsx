import { movieApi } from '@/service/api';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  try {
    const [
      homeData,
      phimBo,
      phimLe,
      hoatHinh,
      tvShows,
      phimMoi,
      upcoming,
      trending
    ] = await Promise.all([
      movieApi.getHome().catch(e => ({ data: { items: [] } })),
      movieApi.getSeriesMovies().catch(e => ({ data: { items: [] } })),
      movieApi.getSingleMovies().catch(e => ({ data: { items: [] } })),
      movieApi.CartoonMovies().catch(e => ({ data: { items: [] } })),
      movieApi.TvShows().catch(e => ({ data: { items: [] } })),
      movieApi.getNewMovies().catch(e => ({ data: { items: [] } })),
      movieApi.getUpcoming().catch(e => ({ data: { items: [] } })),
      movieApi.getTopTrending().catch(e => ({ data: { items: [] } }))
    ]);

    // Use homeData items for HeroBanner if available, otherwise fallback to phimMoi items
    const heroMovies = homeData.data?.items?.length > 0 ? homeData.data.items : phimMoi.data?.items || [];

    return (
      <div className="pb-20">
        <HeroBanner movies={heroMovies} />
        
        <div className="relative z-10 flex flex-col gap-8 md:gap-12 mt-4 md:-mt-32">
          {/* Overwrite style in MovieRow to handle z-index and padding if needed, 
              but basically we want the rows to start overlaying the banner bottom or just below.
              Netflix styles: rows start overlapping the banner gradient.
          */}
          
          <MovieRow title="Phim Mới Cập Nhật" movies={phimMoi.data?.items} linkTo="/danh-sach/phim-moi" />
          <MovieRow title="Top Phim Xem Nhiều" movies={trending.data?.items} linkTo="/danh-sach/phim-hot" />
          <MovieRow title="Phim Bộ" movies={phimBo.data?.items} linkTo="/danh-sach/phim-bo" />
          <MovieRow title="Phim Lẻ" movies={phimLe.data?.items} linkTo="/danh-sach/phim-le" />
          <MovieRow title="Phim Sắp Chiếu" movies={upcoming.data?.items} linkTo="/danh-sach/phim-sap-chieu" />
          <MovieRow title="Hoạt Hình" movies={hoatHinh.data?.items} linkTo="/danh-sach/hoat-hinh" />
          <MovieRow title="TV Shows" movies={tvShows.data?.items} linkTo="/danh-sach/tv-shows" />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
      </div>
    );
  }
}
