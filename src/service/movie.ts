import { ApiResponse, BreadCrumb, Params, SeoOnPage } from '@/types/api';
import axiosClient from './axiosClient';
import { Movie } from '@/types/movie';
import { MovieWithEpisodes } from '@/types/episode';

// Extend generic API response for specific endpoints
export interface MovieListResponse {
    seoOnPage: SeoOnPage;
    breadCrumb: BreadCrumb[];
    titlePage: string;
    items: Movie[];
    params: Params;
    APP_DOMAIN_CDN_IMAGE?: string;
    type_list?: string;
}

export interface MovieDetailResponse {
    seoOnPage: SeoOnPage;
    breadCrumb: BreadCrumb[];
    item: MovieWithEpisodes;
    params?: Params;
}

// Helper to cast Axios response to data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetch = async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    // axiosClient interceptor returns data directly, so we cast it to ApiResponse<T>
    return axiosClient.get(url, { params }) as unknown as Promise<ApiResponse<T>>;
}

export const movieApi = {
    getHome: () => {
        return fetch<MovieListResponse>('/v1/api/home');
    },

    getMovieList: (slug: string, page = 1, limit = 25) => {
        return fetch<MovieListResponse>(`/v1/api/danh-sach/${slug}`, { page, limit });
    },

    getMovieDetail: (slug: string) => {
        return fetch<MovieDetailResponse>(`/v1/api/phim/${slug}`);
    },

    searchMovies: (keyword: string, page = 1, limit = 25) => {
        return fetch<MovieListResponse>('/v1/api/tim-kiem', { keyword, page, limit });
    },

    getMoviesByCategory: (slug: string, page = 1, limit = 25) => {
        return fetch<MovieListResponse>(`/v1/api/the-loai/${slug}`, { page, limit });
    },

    getMoviesByCountry: (slug: string, page = 1, limit = 25) => {
        return fetch<MovieListResponse>(`/v1/api/quoc-gia/${slug}`, { page, limit });
    },

    getMoviesByYear: (year: string, page = 1, limit = 25) => {
        return fetch<MovieListResponse>(`/v1/api/nam-phat-hanh/${year}`, { page, limit });
    },

    getNewMovies: (page = 1, limit = 25) => {
        return fetch<MovieListResponse>('/v1/api/danh-sach/phim-moi', { page, limit });
    },

    getSeriesMovies: (page = 1, limit = 25) => {
        return fetch<MovieListResponse>('/v1/api/danh-sach/phim-bo', { page, limit });
    },

    getSingleMovies: (page = 1, limit = 25) => {
        return fetch<MovieListResponse>('/v1/api/danh-sach/phim-le', { page, limit });
    },

    CartoonMovies: (page = 1, limit = 25) => {
        return fetch<MovieListResponse>('/v1/api/danh-sach/hoat-hinh', { page, limit });
    },

    TvShows: (page = 1, limit = 25) => {
        return fetch<MovieListResponse>('/v1/api/danh-sach/tv-shows', { page, limit });
    },

    // Metadata endpoints
    getCategories: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return fetch<{ items: any[] }>('/v1/api/the-loai');
    },

    getCountries: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return fetch<{ items: any[] }>('/v1/api/quoc-gia');
    },

    getYears: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return fetch<{ items: any[] }>('/v1/api/nam-phat-hanh');
    },
};
