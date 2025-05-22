import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import ActorCard from "../actorCard";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from "@mui/material/Box";

export default function MovieCast({ movie }) {
  const {
    data: credits,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movieCredits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography message={`Error: ${error.message}`} />;
  }

  const cast = credits?.cast || [];
  const mainCast = cast.slice(0, 12); // Get first 10 cast members

  return (
    <>
    <Box sx={{ p: 3, pb: 0 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <PeopleAltIcon color="primary" />
        Cast
      </Typography>
      </Box>
      <Grid container spacing={2}>
        {mainCast.map((actor) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }} key={actor.id}>
            <ActorCard actor={actor} key={actor.id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
