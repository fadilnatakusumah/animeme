import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Chip, Container, Divider, Grid, Paper, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getAnimeDetails } from "../libs/api";
import { AnimeDetails } from "../types/apiResponse";

function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const navigate = useNavigate();


  async function fetchAnime() {
    const response = await getAnimeDetails(Number(id))
    setAnime(response.data);
  }

  function handleGoBack() {
    navigate(-1);
  }

  useEffect(() => {
    fetchAnime();
  }, [id]);

  if (!anime) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={handleGoBack} sx={{ mb: 3 }}>
        Back to Search
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {anime.title}
            </Typography>

            {anime.title_english && anime.title_english !== anime.title && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {anime.title_english}
              </Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={anime.score ? anime.score / 2 : 0} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {anime.score}/10 ({anime.scored_by?.toLocaleString() || "N/A"} votes)
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              {anime.genres?.slice(0, 5).map((genre: any) => (
                <Chip key={genre.mal_id} label={genre.name} sx={{ mr: 1, mb: 1 }} color="primary" variant="outlined" />
              ))}
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6, sm: 4 }} >
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1">{anime.type || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }} >
                <Typography variant="body2" color="text.secondary">
                  Episodes
                </Typography>
                <Typography variant="body1">{anime.episodes || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }} >
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="body1">{anime.status || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }} >
                <Typography variant="body2" color="text.secondary">
                  Aired
                </Typography>
                <Typography variant="body1">{anime.aired?.string || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }} >
                <Typography variant="body2" color="text.secondary">
                  Season
                </Typography>
                <Typography variant="body1">
                  {anime.season
                    ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }} >
                <Typography variant="body2" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body1">{anime.duration || "N/A"}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>
              Synopsis
            </Typography>
            <Typography variant="body1" paragraph>
              {anime.synopsis || "No synopsis available."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default AnimeDetailPage