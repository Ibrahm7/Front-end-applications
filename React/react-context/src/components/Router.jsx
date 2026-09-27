import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import MainLayout from "../layouts/MainLayout";
import SearchForm from "./SearchForm";
import SearchResults from "../pages/SearchResults";
import UserWatchlist from "../pages/UserWatchlist";
import Register from "../pages/Register";
import Login from "../pages/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> }, // "/" => Home
      { path: "/movies", element: <Movies /> }, // "/movies" => Movies
      { path: "/movies/:id", element: <MovieDetails /> }, // "/movies/1" => MovieDetails
      { path: "search", element: <SearchResults /> }, // search?q=batman
      { path: "watchlist", element: <UserWatchlist /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
