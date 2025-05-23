/**
 * API functions for interacting with the Jikan API
 */

import type {
  AnimeSearchResponse,
  AnimeDetailsResponse,
} from "../types/apiResponse";

export const API_BASE_URL = "https://api.jikan.moe/v4";
const DELAY_FOR_RATE_LIMIT = 300;

// Add delay to avoid rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Search for anime by query string
 */
export const searchAnime = async (
  url: string,
  signal?: AbortSignal
): Promise<AnimeSearchResponse> => {
  try {
    // Add a small delay to avoid rate limiting
    await delay(DELAY_FOR_RATE_LIMIT);

    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    // Don't log or rethrow AbortError as it's an expected behavior
    if (error.name === "AbortError") {
      console.log("Request was aborted");
    } else {
      console.error("Error fetching anime:", error);
    }
    throw error;
  }
};

/**
 * Get detailed information about a specific anime by ID
 */
export const getAnimeDetails = async (
  url: string,
  signal?: AbortSignal
): Promise<AnimeDetailsResponse> => {
  try {
    // Add a small delay to avoid rate limiting
    await delay(300);

    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    // Don't log or rethrow AbortError as it's an expected behavior
    if (error.name === "AbortError") {
      console.log("Request was aborted");
    } else {
      console.error("Error fetching anime details:", error);
    }
    throw error;
  }
};
