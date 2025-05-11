import { AnimeDetails } from "../types/apiResponse";
import MediaCard from "./MediaCard";

function AnimeList({ result }: { result: AnimeDetails[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
      {result.map((anime) => (
        <MediaCard key={anime.mal_id + anime.title} anime={anime} />
      ))}
    </div>
  );
}

export default AnimeList;
