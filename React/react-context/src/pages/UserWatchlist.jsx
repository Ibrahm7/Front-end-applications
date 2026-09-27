import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Watchlist from "../components/Watchlist";

export default function UserWatchlist() {
  const { watchlist, RemoveFromWatchlist } = useContext(UserContext);

  return (
    <Watchlist
      movies={watchlist}
      title={"Watchlist"}
      RemoveFromWatchlist={RemoveFromWatchlist}
    />
  );
}
