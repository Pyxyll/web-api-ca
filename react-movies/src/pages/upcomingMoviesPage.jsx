import React from "react";
import { getUpcommingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesButton from "../components/cardIcons/addToFavorites";
import AddToPlaylistButton from "../components/cardIcons/addToPlaylist";



const upcomingMoviesPage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcommingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;


  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistButton movie={movie} />
      }}
    />
  );
};
export default upcomingMoviesPage;
