import { SearchOff } from '@mui/icons-material';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useDebounce, } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import AnimeList from '../components/AnimeList';

import PaginationControl from '../components/PaginationControl';
import SearchBar from '../components/SearchBar';
import { searchAnime } from '../libs/api';
import { AnimeDetails } from '../types/apiResponse';

import AnimemeLogo from "../assets/animeme.png";
import Copyright from '../components/Copyright';


function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  const [animeList, setAnimeList] = useState<AnimeDetails[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(query ? true : false);
  const [search, setSearch] = useState(query);

  const abortController = useRef<AbortController>(null);
  const controller = new AbortController();
  abortController.current = controller;

  const debouncedSearchTerm = useDebounce(search, 250);


  async function getAnime() {
    if (!debouncedSearchTerm) return
    const response = await searchAnime(debouncedSearchTerm, page, controller.signal);
    setAnimeList(response.data);
    setTotalPages(response.pagination.last_visible_page);
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryText = e.target.value;
    if (!queryText) {
      handleClearSearch();
      abortController.current?.abort();
      return
    }

    setIsLoading(true);
    setSearch(queryText);
    const params = new URLSearchParams(searchParams.toString())
    params.set("q", queryText);
    setSearchParams(params.toString())
  }

  function handleClearSearch() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q");
    setSearch("");
    setAnimeList([]);
    setTotalPages(0);
    setIsLoading(false);
    setSearchParams(params.toString())
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    setSearchParams(params.toString())
  }

  useEffect(() => {
    getAnime();


    return () => {
      if (abortController.current === controller) {
        // abort the request when the component unmounts
        abortController.current?.abort();
        abortController.current = null;
      }
    }
  }, [debouncedSearchTerm, page]);

  return (
    <>
      {/* maxWidth "lg" for 1200px */}
      <Container maxWidth="lg" className="min-h-screen">
        <Box display="flex" flexDirection="column" className="my-4">
          <Box flex={1}>
            <div className="flex flex-col items-center gap-6 mb-6">
              <button className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-slate-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200 group-hover:animate-pulse"></div>
                <div className="relative bg-white rounded-lg leading-none flex items-center">
                  <span className="text-gray-100 flex items-center gap-2">
                    <img
                      height={130}
                      width={300}
                      src={AnimemeLogo}
                      alt="logo"
                      className="rounded-xl"
                    />
                  </span>
                </div>
              </button>
            </div>

            <SearchBar
              query={search}
              handleQueryChange={handleChange}
              handleClearSearch={handleClearSearch}
            />
          </Box>

          {isLoading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
            >
              <CircularProgress size={24} />
              <Typography variant="h6" sx={{ marginLeft: 2 }}>
                Loading...
              </Typography>
            </Box>
          ) : animeList.length > 0 ? (
            <>
              <AnimeList result={animeList} />
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <PaginationControl
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Box>
            </>
          ) : query.length > 0 && animeList.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SearchOff sx={{ fontSize: 60 }} />
                No results found
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Container>
      <Copyright />
    </>
  );
}

export default HomePage