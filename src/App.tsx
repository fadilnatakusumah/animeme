import { Box, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useDebounce } from "@uidotdev/usehooks";

import AnimeList from "./components/AnimeList";
import PaginationControl from "./components/PaginationControl";
import SearchBar from "./components/SearchBar";

import { useEffect, useState } from "react";

import AnimemeLogo from "./assets/animeme.png";

import { searchAnime } from "./libs/api";
import { AnimeDetails } from "./types/apiResponse";

function Copyright() {
  return (
    <Typography
      className="border-t border-gray-200 bg-slate-50 block"
      padding={2}
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://fadilnatakusumah.com/">
        fadilnatakusumah.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  const [animeList, setAnimeList] = useState<AnimeDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [error, setError] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(search, 250);

  async function getAnime() {
    setIsLoading(true);
    const response = await searchAnime(debouncedSearchTerm);
    setAnimeList(response.data);
    setIsLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    getAnime();
  }, [debouncedSearchTerm]);

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
              handleClearSearch={() => setSearch("")}
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
          ) : (
            <>
              <AnimeList result={animeList} />
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <PaginationControl
                  currentPage={1}
                  totalPages={10}
                  onPageChange={() => {}}
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
      <Copyright />
    </>
  );
}
