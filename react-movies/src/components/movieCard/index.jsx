import React, { useContext, useState } from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import img from "../../images/film-poster-placeholder.png";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const [isHovered, setIsHovered] = useState(false);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  let moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : img;

  return (
    <Card
      sx={{
        height: 550,
        backgroundImage: `url(${moviePoster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        cursor: "pointer",
        borderRadius: "20px",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 2px 10px 5px rgba(0, 0, 0, 0.3)",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "white",
                  background: "linear-gradient(135deg, rgba(63,81,181,1) 0%, rgba(33,150,243,1) 100%)",
                  position: "absolute",
                  top: 10,
                  left: 10,
                  padding: "0px 15px",
                  borderRadius: "20px",
                }}
              >
                <StarRateIcon fontSize="small" />
                {movie.vote_average}
              </Typography>
      {movie.favorite && (
        <Avatar
          sx={{
            backgroundColor: "red",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <FavoriteIcon />
        </Avatar>
      )}

      <Fade in={isHovered}>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 2,
            textAlign: "center",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Typography variant="h5" component="div" sx={{ color: "white" }}>
            {movie.title} {action(movie)}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,1)",
                  },
                }}
              >
                More Info ...
              </Button>
            </Link>
          </Box>
        </Box>
      </Fade>
    </Card>
  );
}
