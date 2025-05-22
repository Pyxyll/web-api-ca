import React from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MovieIcon from "@mui/icons-material/Movie";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";

const VideoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingTop: "56.25%", // 16:9 Aspect Ratio
  width: "100%",
  height: 0,
  overflow: "hidden",
  "& iframe": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "20px",
  },
}));

const EmptyState = ({ message }) => (
  <Box>
    <MovieIcon
      sx={{ fontSize: 60, color: "text.secondary", opacity: 0.6, mb: 2 }}
    />
    <Typography variant="h6" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

export default function MovieVideos({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["Videos", { id: movie.id }],
    queryFn: getMovieVideos,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <EmptyState message={`Error: ${error.message}`} />;
  }

  if (!data.results || data.results.length === 0) {
    return <EmptyState message="No videos available for this movie" />;
  }

  // Filter for YouTube trailers only
  const youtubeTrailer = data.results.find(
    (video) =>
      video.site.toLowerCase() === "youtube" &&
      video.type.toLowerCase() === "trailer"
  );

  // If no YouTube trailer is found
  if (!youtubeTrailer) {
    return <EmptyState message="No trailer available for this movie" />;
  }

  return (
    <Fade in={true} timeout={600}>
      <Card sx={{ bgcolor: "transparent", boxShadow: "none" }}>
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
            <MovieIcon color="primary" />
            Official Trailer
          </Typography>
        </Box>

        <CardMedia>
          <VideoContainer>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeTrailer.key}`}
              title={youtubeTrailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </VideoContainer>
        </CardMedia>
      </Card>
    </Fade>
  );
}
