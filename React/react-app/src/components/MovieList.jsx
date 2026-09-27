import Movie from "./Movie";

export default function MovieList({ movies, title }) {
  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-header">
          <h2 className="title h5 mb-0">{title}</h2>
        </div>
        <div className="card-body">
          {/* filter ve map farkı çok önemli burada filter içersinde true olduğu değer kadarını kapsar map ise içersinde ne kadar varsa */}

          {movies.length == 0 ? (
            <div>Film bulunamadı.</div>
          ) : (
            <div id="movie-list" className="row g-4">
              {/* objelerimizi movieObj ile tek bir paket ile aldık tek tek yazdırmak yerine ve Movie() fonksiyonuna o şekilde yolladık.*/}

              {movies.map((eleman, index) => {
                return <Movie key={index} movieObj={eleman} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
