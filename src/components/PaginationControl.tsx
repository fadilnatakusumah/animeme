import { Box, Pagination } from "@mui/material";
import { ChangeEvent } from "react";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlProps) {

  function handleChange(_event: ChangeEvent<unknown>, value: number) {
    onPageChange(value);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
      <Pagination
        variant="outlined"
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
}
