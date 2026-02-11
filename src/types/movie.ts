export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Country {
    id: string;
    name: string;
    slug: string;
}

export interface Movie {
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: string; // 'series' | 'single' | 'hoathinh' | 'tvshows'
    status: string; // 'completed' | 'ongoing' | 'trailer'
    thumb_url: string;
    poster_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    year: number;
    view: number;
    actor: string[];
    director: string[];
    category: Category[];
    country: Country[];
    episodes?: import('./episode').ServerData[];
}
import { SeoOnPage, BreadCrumb, Params } from './api';

export interface MovieListResponse {
    seoOnPage: SeoOnPage;
    breadCrumb: BreadCrumb[];
    titlePage: string;
    items: Movie[];
    params: Params;
    type_list?: string;
    APP_DOMAIN_CDN_IMAGE?: string;
}

export interface MovieDetailResponse {
    seoOnPage: SeoOnPage;
    breadCrumb: BreadCrumb[];
    item: import('./episode').MovieWithEpisodes;
    params?: Params;
}
