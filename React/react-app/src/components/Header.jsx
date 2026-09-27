import Logo from "./Logo";
import SearchForm from "./SearchForm";
import WatchlistButton from "./WatchlistButton";
export default function Header({
  watchListMovies,
  onWatchlistOpen,
  searchQuery,
  SetSearchQuery,
}) {
  return (
    <div id="header">
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <Logo />
          <SearchForm
            searchQuery={searchQuery}
            SetSearchQuery={SetSearchQuery}
          />
          <WatchlistButton
            watchListMovies={watchListMovies}
            onWatchlistOpen={onWatchlistOpen}
          />
        </div>
      </nav>
    </div>
  );
}
