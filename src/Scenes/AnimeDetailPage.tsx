import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";

import { useAnimeDetail } from "../libs/swr";

function AnimeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [{ data, error, isLoading }] = useAnimeDetail(id!);

  function handleGoBack() {
    navigate(-1);
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress size={24} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {error.message}
        </Typography>
      </Container>
    );
  }

  if (!data?.data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={handleGoBack} sx={{ mb: 3 }}>
          Back to Search
        </Button>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, textAlign: "center" }}
        >
          Anime Not found
        </Typography>
      </Container>
    );
  }

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
              src={
                data.data.images.jpg.large_image_url ||
                data.data.images.jpg.image_url
              }
              alt={data.data.title}
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {data.data.title}
            </Typography>

            {data.data.title_english &&
              data.data.title_english !== data.data.title && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {data.data.title_english}
                </Typography>
              )}

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={data.data.score ? data.data.score / 2 : 0}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {data.data.score}/10 (
                {data.data.scored_by?.toLocaleString() || "N/A"} votes)
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              {data.data.genres?.slice(0, 5).map((genre: any) => (
                <Chip
                  key={genre.mal_id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1">
                  {data.data.type || "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Episodes
                </Typography>
                <Typography variant="body1">
                  {data.data.episodes || "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="body1">
                  {data.data.status || "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Aired
                </Typography>
                <Typography variant="body1">
                  {data.data.aired?.string || "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Season
                </Typography>
                <Typography variant="body1">
                  {data.data.season
                    ? `${
                        data.data.season.charAt(0).toUpperCase() +
                        data.data.season.slice(1)
                      } ${data.data.year}`
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body1">
                  {data.data.duration || "N/A"}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>
              Synopsis
            </Typography>
            <Typography variant="body1" paragraph>
              {data.data.synopsis || "No synopsis available."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AnimeDetailPage;
