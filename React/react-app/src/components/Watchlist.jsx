import WatchListMovie from "./WatchListMovie";

export default function Watchlist({
  watchListMovies,
  isWatchlistOpen,
  onRemoveFromWatchlist,
}) {
  return (
    <>
      {isWatchlistOpen && (
        <div className=" my-3">
          <div className="card">
            <div className="card-header">
              <h2 className="title h5 mb-0">Watch List</h2>
            </div>
            <div className="card-body">
              {/* filter ve map farkı çok önemli burada filter içersinde true olduğu değer kadarını kapsar map ise içersinde ne kadar varsa */}

              {watchListMovies.length == 0 ? (
                <div>Film bulunamadı.</div>
              ) : (
                <div id="movie-list" className="row g-4">
                  {/* objelerimizi movieObj ile tek bir paket ile aldık tek tek yazdırmak yerine ve Movie() fonksiyonuna o şekilde yolladık.*/}

                  {watchListMovies.map((eleman, index) => {
                    return (
                      <WatchListMovie
                        key={index}
                        movieObj={eleman}
                        onRemoveFromWatchlist={onRemoveFromWatchlist}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
