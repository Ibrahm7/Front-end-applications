import { Link } from "react-router";

export default function Movie({ movieObj }) {
  return (
    <div className="col-4 col-lg-2 col-md-3">
      <div className=" card position-relative h-100">
        <Link to={`/movies/${movieObj.id}`}>
          <img
            src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path}
            alt=""
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{movieObj.title}</h5>
        </div>
      </div>
    </div>
  );
}
