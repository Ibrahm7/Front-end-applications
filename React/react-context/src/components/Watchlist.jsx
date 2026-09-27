import WatchListMovie from "./WatchListMovie";

export default function Watchlist({ movies, RemoveFromWatchlist, title }) {
  return (
    <>
      <div className="container py-3">
        <h1 className="mb-3 h4">{title}</h1>

        {/* filter ve map farkı çok önemli burada filter içersinde true olduğu değer kadarını kapsar map ise içersinde ne kadar varsa */}

        {movies.length == 0 ? (
          <div>Film bulunamadı.</div>
        ) : (
          <div id="movie-list" className="row g-4">
            {/* objelerimizi movieObj ile tek bir paket ile aldık tek tek yazdırmak yerine ve Movie() fonksiyonuna o şekilde yolladık.*/}

            {movies.map((eleman, index) => {
              return (
                <WatchListMovie
                  key={index}
                  movieObj={eleman}
                  RemoveFromWatchlist={RemoveFromWatchlist}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
