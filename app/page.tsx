import { getMovies } from "@/api/tmbd";
import Image from "next/image";

export default async function Home() {
  const res = await getMovies();

  if (!res) {
    throw Error("Can not get movies");
  }

  const { results: movies } = res;

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <p>{movie.original_title}</p>
          <p>{movie.overview}</p>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
            width={500}
            height={281}
          />
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={250}
          />
        </li>
      ))}
    </ul>
  );
}
