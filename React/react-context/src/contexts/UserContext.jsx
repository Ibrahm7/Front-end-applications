import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedTheme = localStorage.getItem("watchlist");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : [];
  const [watchlist, setWatchList] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function AddToWatchlist(movie) {
    const isAddedToList = watchlist.map((i) => i.id).includes(movie.id);
    if (!isAddedToList) {
      setWatchList((movies) => [...movies, movie]);
    }
  }

  function RemoveFromWatchlist(movie) {
    setWatchList((movies) => movies.filter((i) => i.id != movie.id));
  }

  return (
    <UserContext.Provider
      value={{ watchlist, AddToWatchlist, RemoveFromWatchlist }}
    >
      {children}
    </UserContext.Provider>
  );
}
