export default function WatchListMovie({ movieObj, onRemoveFromWatchlist }) {
  return (
    <div className="col-6 col-lg-2 col-md-3">
      {
        <div className="movie card position-relative">
          <img
            src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path}
            alt=""
            className="card-img-top"
          />
          <div>
            <p className="card-text mb-0">{movieObj.Description}</p>

            <button
              className="btn btn-link fs-5 text-danger position-absolute top-0 end-0"
              onClick={() => onRemoveFromWatchlist(movieObj)}
            >
              <i className="bi bi-dash-circle"></i>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
