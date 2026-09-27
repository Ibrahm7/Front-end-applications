import React, { useEffect, useState, useContext } from "react";
import { NavLink, useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SimilarMovies from "./SimilarMovies";
import { ThemeContext } from "../contexts/ThemeContext";
import Actors from "../components/Actors";
import { UserContext } from "../contexts/UserContext";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "en-EN";

export default function MovieDetails() {
  const { id } = useParams();

  console.log(id);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { theme } = useContext(ThemeContext);
  const { AddToWatchlist, watchlist, RemoveFromWatchlist } =
    useContext(UserContext);

  const color = theme == "dark" ? "light" : "dark";

  const isAdded = watchlist?.find((i) => i.id == movie?.id);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`,
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

        if (data) {
          setMovie(data);
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

    getMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage msg={error} />;
  }

  return (
    <>
      <div
        className="text-white position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="img-overlay">
          <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="row">
              <div className="col-md-3 d-none d-lg-block">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/" + movie.poster_path
                  }
                  alt={movie.title}
                  className="img-fluid rounded shadow img-thumbnail"
                />
              </div>
              <div className="col-md-9">
                <h1 className="display-4">{movie.title}</h1>
                <p>
                  {movie.release_date} <i className="bi bi-dot text-white"></i>
                  <span className="text-white">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot text-white"></i>
                  {movie.runtime} min
                </p>
                <p>
                  <span className="badge bg-warning fs-6">
                    {Math.round(movie.vote_average * 10)}%
                  </span>
                  <span className="badge bg-danger fs-6 ms-2 pointer">
                    {isAdded ? (
                      <i
                        className="bi bi-heart-fill"
                        onClick={() => RemoveFromWatchlist(movie)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart"
                        onClick={() => AddToWatchlist(movie)}
                      ></i>
                    )}
                  </span>
                </p>
                {movie.overview && (
                  <p className="lead">
                    <strong>Özet: </strong> {movie.overview}
                  </p>
                )}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                  <p className="d-flex flex-column text-center">
                    <span>Yapımcı </span>{" "}
                    <span>{movie.production_companies[0].name}</span>
                  </p>
                  <p className="d-flex flex-column text-center">
                    <span>Yönetmen </span>
                    <span> {movie.credits.crew[0].name}</span>
                  </p>
                  <p className="d-flex flex-column text-center">
                    <span>Senarist </span>
                    <span> {movie.credits.crew[1].name}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Actors actors={movie.credits.cast} />
      <SimilarMovies movieID={id} />
    </>
  );
}
