import { useEffect, useState } from "react";
import Loading from "./Loading";

const api_key = import.meta.env.VITE_TMDB_API_KEY;

const language = "en-EN";

export default function MovieDetails({ movieObj, onClose }) {
  const [loadedMovie, setLoadedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieObj.id}?api_key=${api_key}&language=${language}&append_to_response=credits`,
        );

        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json();

        if (data) {
          setLoadedMovie(data);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    getMovieDetails();
  }, [movieObj.id]);

  return (
    <div className="my-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="title h5 mb-0">Movie Details</h2>
          <button className="btn btn-danger" onClick={() => onClose()}>
            Kapat
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" + movieObj.poster_path
                }
                alt=""
                className="card-img-top"
              />
            </div>
            <div className="col-md-9">
              <h3>{movieObj.title}</h3>
              <p>{movieObj.overview}</p>
              <p>Release Date: {movieObj.release_date}</p>
              <p>Rating: {movieObj.vote_average}</p>
              {loading && <Loading />}
              {loadedMovie && (
                <>
                  <p>Süre: {loadedMovie.runtime}</p>
                  <p>Ülke: {loadedMovie.production_countries[0].name}</p>
                  <p>Yapımcı: {loadedMovie.production_companies[0].name}</p>
                  <p>Yönetmen: {loadedMovie.credits.crew[0].name}</p>
                  <p>Senarist: {loadedMovie.credits.crew[1].name}</p>
                  <p>Oyuncular:</p>
                  <div className="row">
                    {loadedMovie.credits.cast.slice(0, 10).map((actor) => (
                      <div className="col-md-2" key={actor.id}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original/" +
                            actor.profile_path
                          }
                          alt={actor.name}
                          className="img-fluid"
                        />
                        <p>{actor.name}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
