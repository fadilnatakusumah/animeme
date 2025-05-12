import { useEffect, useMemo, useRef } from "react";
import useSWR, { State } from "swr";

import {
  AnimeDetailsResponse,
  AnimeSearchResponse,
} from "../types/apiResponse";
import { API_BASE_URL, getAnimeDetails, searchAnime } from "./api";

export const swrConfig = {
  dedupingInterval: 60000, // Don't refetch the same key in a session
};

const fallbackData = {
  data: [],
  pagination: {
    last_visible_page: 1,
    current_page: 1,
    has_next_page: false,
    items: {
      count: 0,
      per_page: 24,
      total: 0,
    },
  },
};

export function useAnimeList(
  query: string,
  page = 1
): [State<AnimeSearchResponse, Error>, AbortController] {
  const abortController = useRef<AbortController>(null);
  const controller = new AbortController();
  abortController.current = controller;

  const encodedQuery = encodeURIComponent(query);
  const shouldFetch = query.trim().length > 0;
  const key = shouldFetch
    ? `${API_BASE_URL}/anime?q=${encodedQuery}&page=${page}&sfw=true&limit=24`
    : null;

  useEffect(() => {
    return () => {
      if (abortController.current === controller && !shouldFetch) {
        abortController.current?.abort();
        abortController.current = null;
      }
    };
  }, []);

  return [
    useSWR(key, (url) => searchAnime(url, abortController.current!.signal), {
      ...swrConfig,
      fallbackData,
    }),
    abortController.current!,
  ];
}

export function useAnimeDetail(
  id: string
): [State<AnimeDetailsResponse, Error>, AbortController] {
  const controller = useMemo(() => new AbortController(), [id]);

  const shouldFetch = id.trim().length > 0;
  const key = shouldFetch ? `${API_BASE_URL}/anime/${id}/full` : null;

  useEffect(() => {
    return () => {
      if (controller && !shouldFetch) {
        controller.abort();
      }
    };
  }, []);

  return [
    useSWR(key, (url) => getAnimeDetails(url, controller.signal), swrConfig),
    controller,
  ];
}
