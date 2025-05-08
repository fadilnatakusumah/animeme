import { Search, Clear } from "@mui/icons-material";
import { Box, Paper, IconButton, InputBase } from "@mui/material";
import React from "react";

function SearchBar({
  query,
  handleQueryChange,
  handleClearSearch,
}: {
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 600,
          borderRadius: 2,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for anime..."
          value={query}
          onChange={handleQueryChange}
          inputProps={{ "aria-label": "search anime" }}
        />
        {query && (
          <IconButton
            sx={{ p: "10px" }}
            aria-label="clear"
            onClick={handleClearSearch}
          >
            <Clear />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
}

export default SearchBar;
