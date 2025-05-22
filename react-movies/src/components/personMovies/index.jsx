import React from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getPersonMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import MovieIcon from "@mui/icons-material/Movie";
import Grid from "@mui/material/Grid2";
import MovieCard from "../movieCard";

const EmptyState = ({ message }) => (
  <Box sx={{ textAlign: 'center', py: 3 }}>
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

export default function PersonMovies({ person }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["Person Movies", { id: person.id }],
    queryFn: getPersonMovies,
  });

  const dummyAction = () => {
    return null; 
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <EmptyState message={`Error: ${error.message}`} />;
  }

  const movieData = data.cast.map(castMovie => ({
    id: castMovie.id,
    title: castMovie.title,
    poster_path: castMovie.poster_path,
    vote_average: castMovie.vote_average,
    character: castMovie.character,
    release_date: castMovie.release_date
  }));

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <MovieIcon sx={{ mr: 1 }} />
        Movies ({data.cast.length})
      </Typography>
      
      <Grid container spacing={2}>
        {movieData.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }} key={movie.id}>
            <MovieCard movie={movie} action={dummyAction} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}