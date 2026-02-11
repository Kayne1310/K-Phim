import { ApiResponse } from "@/types/api";
import { MovieListResponse, MovieDetailResponse } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ophim1.com';

async function fetchApi<T>(endpoint: string, cache: RequestCache = 'force-cache'): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        cache,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return res.json();
}

export const movieApi = {
    getHome: async () => {
        return fetchApi<ApiResponse<MovieListResponse>>('/v1/api/home');
    },

    getMovieList: async (slug: string, page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/${slug}?page=${page}&limit=${limit}`);
    },

    getMovieDetail: async (slug: string) => {
        return fetchApi<ApiResponse<MovieDetailResponse>>(`/v1/api/phim/${slug}`, 'no-store');
    },

    searchMovies: async (keyword: string, page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/tim-kiem?keyword=${keyword}&page=${page}&limit=${limit}`, 'no-store');
    },

    getMoviesByCategory: async (slug: string, page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/the-loai/${slug}?page=${page}&limit=${limit}`);
    },

    getMoviesByCountry: async (slug: string, page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/quoc-gia/${slug}?page=${page}&limit=${limit}`);
    },

    getMoviesByYear: async (year: string, page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/nam-phat-hanh/${year}?page=${page}&limit=${limit}`);
    },

    getNewMovies: async (page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/phim-moi?page=${page}&limit=${limit}`);
    },

    getSeriesMovies: async (page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/phim-bo?page=${page}&limit=${limit}`);
    },

    getSingleMovies: async (page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/phim-le?page=${page}&limit=${limit}`);
    },

    CartoonMovies: async (page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`);
    },

    TvShows: async (page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/tv-shows?page=${page}&limit=${limit}`);
    },

    getUpcoming: async (page = 1, limit = 25) => {
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/phim-sap-chieu?page=${page}&limit=${limit}`);
    },

    getTopTrending: async (page = 1, limit = 25) => {
        // Sort by view count to get trending
        return fetchApi<ApiResponse<MovieListResponse>>(`/v1/api/danh-sach/phim-moi?page=${page}&limit=${limit}&sort_field=view&sort_type=desc`);
    },

    getCategories: async () => {
        return fetchApi<ApiResponse<import("@/types/movie").Category[]>>('/v1/api/the-loai');
    },

    getCountries: async () => {
        return fetchApi<ApiResponse<import("@/types/movie").Country[]>>('/v1/api/quoc-gia');
    },

    getYears: async () => {
        return fetchApi<ApiResponse<any[]>>('/v1/api/nam-phat-hanh');
    },
};
