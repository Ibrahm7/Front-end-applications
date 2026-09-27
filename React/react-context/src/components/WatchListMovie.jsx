import { Link } from "react-router";

export default function WatchListMovie({ movieObj, RemoveFromWatchlist }) {
  return (
    <div className="col-6 col-lg-2 col-md-3">
      {
        <div className="movie card position-relative">
          <Link to={`/movies/${movieObj.id}`}>
            <img
              src={
                "https://image.tmdb.org/t/p/original/" + movieObj.poster_path
              }
              alt=""
              className="img-fluid rounded"
            />
          </Link>
          <div>
            <button
              className="btn btn-link fs-5 text-danger position-absolute top-0 end-0"
              onClick={() => RemoveFromWatchlist(movieObj)}
            >
              <i className="bi bi-dash-circle"></i>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
