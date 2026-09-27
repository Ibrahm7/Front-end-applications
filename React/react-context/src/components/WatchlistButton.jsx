export default function WatchlistButton({ watchListMovies, onWatchlistOpen }) {
  return (
    <div className="mb-2 mb-lg-0 ms-1">
      <button
        type="button"
        className="btn btn-outline-light position-relative"
        onClick={() => {
          onWatchlistOpen((prevState) => !prevState);
        }}
      >
        <i className="bi bi-heart"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {watchListMovies.length}
        </span>
      </button>
    </div>
  );
}
