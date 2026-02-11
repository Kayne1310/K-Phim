export interface Episode {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
}

export interface ServerData {
    server_name: string;
    server_data: Episode[];
}

import { Movie } from './movie';

export interface MovieWithEpisodes extends Movie {
    episodes: ServerData[];
}
