import { Route, Routes } from "react-router";
import AnimeDetailPage from "./scenes/AnimeDetailPage";
import HomePage from "./scenes/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/anime/:id" element={<AnimeDetailPage />} />
    </Routes>
  )
}
