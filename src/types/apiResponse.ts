/**
 * Type definitions for the Jikan API responses
 */

// Common image formats
export interface AnimeImages {
  jpg: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
  webp?: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
}

// Genre information
export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
}

// Basic anime information returned in search results
export interface AnimeResult {
  mal_id: number;
  url: string;
  images: AnimeImages;
  title: string;
  type: string;
  episodes: number;
  status: string;
  score: number;
  genres?: AnimeGenre[];
}

// Pagination information
export interface AnimePagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

// Search response
export interface AnimeSearchResponse {
  pagination: AnimePagination;
  data: AnimeDetails[];
}

// Additional fields for detailed anime information
export interface AnimeDetails extends AnimeResult {
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  synopsis: string;
  background: string;
  season: string;
  year: number;
  aired: {
    from: string;
    to: string;
    string: string;
  };
  duration: string;
  rating: string;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  studios: { mal_id: number; type: string; name: string }[];
  trailer?: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
}

// Detailed anime response
export interface AnimeDetailsResponse {
  data: AnimeDetails;
}
