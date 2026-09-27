import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const page = 1;
const language = "en-EN";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/popular?api_key=${api_key}&page=${page}&language=${language}`,
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

    getMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage msg={error} />;
  }

  return <MovieList movies={movies} title="Popüler Filmler" />;
}
