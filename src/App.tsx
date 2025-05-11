import { Route, Routes } from "react-router";
import AnimeDetailPage from "./Scenes/AnimeDetailPage";
import HomePage from "./Scenes/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/anime/:id" element={<AnimeDetailPage />} />
    </Routes>
  )
}
