import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "en-EN";

export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${apiUrl}/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`,
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
          setTotalPages(data.total_pages);
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

    getMovies();
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage msg={error} />;
  }

  return (
    <>
      <MovieList movies={movies} title={`Arama sonuçları: ${query}`} />
      <Pagination
        page={page}
        setSearchParams={setSearchParams}
        query={query}
        totalPages={totalPages}
      />
    </>
  );
}
