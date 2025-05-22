import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import { styled } from '@mui/material/styles';

const PageContainer = styled('div')(({ theme }) => ({
  maxWidth: '80%',
  margin: '0 auto',
  padding: '0 16px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    padding: '0 12px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95%',
    padding: '0 8px',
  },
}));

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
    <PageContainer>
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
    </PageContainer>
  );
}
export default MovieListPageTemplate;