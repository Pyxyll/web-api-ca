import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [voteAverageFilter, setVoteAverageFilter] = useState(0);
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average >= voteAverageFilter;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "vote_average") setVoteAverageFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />

        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          voteAverageFilter={voteAverageFilter}
        />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;