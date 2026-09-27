import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { Movie_List } from "../data";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import Watchlist from "./Watchlist";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
function App() {
  const api_key = import.meta.env.VITE_TMDB_API_KEY;
  const page = 2;
  const query = "batman";
  const language = "en-EN";

  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, SetSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=${page}&language=${language}`,
        );

        if (response.status == 404) {
          throw new Error("Movie was not founded");
        } else if (response.status == 401) {
          throw new Error("Api key is not correct or invalid");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`,
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMovies(data.results);
    //   });

    if (searchQuery.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();
  }, [searchQuery]);

  function handleAddToWatchlist(movie) {
    const isAddedToList = watchListMovies.map((i) => i.id).includes(movie.id);
    if (!isAddedToList) {
      setWatchListMovies((movies) => [...movies, movie]);
    }
  }

  function handleRemoveFromWatchlist(movie) {
    setWatchListMovies((movies) => movies.filter((i) => i.id != movie.id));
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header
        watchListMovies={watchListMovies}
        onWatchlistOpen={setIsWatchlistOpen}
        searchQuery={searchQuery}
        SetSearchQuery={SetSearchQuery}
      />
      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        <Watchlist
          watchListMovies={watchListMovies}
          isWatchlistOpen={isWatchlistOpen}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          onHandleSelectedMovie={setSelectedMovie}
        />

        {loading && <Loading />}
        {!loading && !error && (
          <MovieList
            movies={movies}
            onAddToWatchlist={handleAddToWatchlist}
            onHandleSelectedMovie={handleSelectedMovie}
          />
        )}
        {error && <ErrorMessage msg={error} />}
      </Main>
      <Footer />
    </>
  );
}

export default App;
