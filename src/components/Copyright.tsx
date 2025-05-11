import { Typography } from "@mui/material";
import { Link } from "react-router";

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
      <Link color="inherit" target="_blank" to="https://fadilnatakusumah.com/">
        fadilnatakusumah.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default Copyright