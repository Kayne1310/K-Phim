export interface ApiResponse<T> {
    status: string; // "success" | "error"
    message?: string;
    data: T;
    APP_DOMAIN_CDN_IMAGE?: string;
    APP_DOMAIN_FRONTEND?: string;
}

export interface SeoOnPage {
    titleHead?: string;
    descriptionHead?: string;
    og_image?: string[];
    updated_time?: number;
    og_url?: string;
    og_type?: string;
}

export interface BreadCrumb {
    name: string;
    slug?: string;
    isCurrent?: boolean;
    position?: number;
}

export interface Pagination {
    currentPage: number;
    totalItems: number;
    totalItemsPerPage: number;
    totalPages?: number;
}

export interface Params {
    pagination: Pagination;
    slug?: string;
    sortField?: string;
    sortType?: string;
}
