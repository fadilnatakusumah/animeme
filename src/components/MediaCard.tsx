import { Box, CardActionArea, Chip, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

import { AnimeDetails } from "../types/apiResponse";

export default function MediaCard({ anime }: { anime: AnimeDetails }) {
  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <CardActionArea>

        <Card className="md:max-w-345">
          <CardMedia
            className="h-140"
            image={anime.images?.webp?.image_url}
            title={anime.title}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              noWrap
              title={anime.title}
            >
              {anime.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                value={anime.score ? anime.score / 2 : 0}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {anime.score || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {anime.type || "Unknown"} •{" "}
                {anime.episodes ? `${anime.episodes} eps` : "Unknown eps"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {anime.genres?.slice(0, 2).map((genre) => (
                <Chip
                  key={genre.mal_id}
                  label={genre.name}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem" }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
}
