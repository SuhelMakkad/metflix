import { getTrendingMovies } from "@/api/tmbd";
import BannerImage from "@/components/BannerImage";
import BannerSection from "@/components/BannerSection";

export default async function Home() {
  const res = await getTrendingMovies();

  if (!res) {
    throw Error("Can not get movies");
  }

  const { results: movies } = res;

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const rndInt = randomIntFromInterval(1, 10);
  return (
    <>
      <BannerSection movie={movies[rndInt]} />
      {/* <ul>
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
      </ul> */}
    </>
  );
}
