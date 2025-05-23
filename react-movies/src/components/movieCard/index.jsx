import React, { useContext, useState } from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarRateIcon from "@mui/icons-material/StarRate";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import img from "../../images/film-poster-placeholder.png";
import { MoviesContext } from "../../contexts/moviesContext";

const ModernCard = styled(Card)(({ theme }) => ({
  height: 550,
  position: "relative",
  cursor: "pointer",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 1,
  },
  "&:hover::before": {
    opacity: 1,
  }
}));

const PosterImage = styled('div')(({ posterUrl }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${posterUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
  top: 0,
  left: 0,
  filter: "brightness(0.8)",
  transition: "filter 0.3s ease",
  "&:hover": {
    filter: "brightness(1)",
  }
}));

const RatingBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 3,
  background: "rgba(15, 23, 42, 0.9)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  padding: "6px 12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "0.875rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
}));

const FavoriteIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 3,
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
  border: "2px solid rgba(255, 255, 255, 0.2)",
}));

const ContentOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "rgba(15, 23, 42, 0.95)",
  backdropFilter: "blur(20px) saturate(180%)",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "24px",
  textAlign: "center",
  zIndex: 2,
}));

const MovieTitle = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "1.25rem",
  marginBottom: "16px",
  background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  lineHeight: 1.3,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

const ModernButton = styled(Button)(({ theme }) => ({
  padding: "10px 20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#ffffff",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.875rem",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    background: "linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)",
    transform: "translateY(-1px)",
    boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 1,
  }
}));

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
    <ModernCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PosterImage posterUrl={moviePoster} />
      
      <RatingBadge>
        <StarRateIcon sx={{ fontSize: 16, color: "#fbbf24" }} />
        {movie.vote_average.toFixed(1)}
      </RatingBadge>

      {movie.favorite && (
        <FavoriteIndicator>
          <FavoriteIcon sx={{ fontSize: 20, color: "#ffffff" }} />
        </FavoriteIndicator>
      )}

      <Fade in={isHovered} timeout={300}>
        <ContentOverlay>
          <MovieTitle variant="h6" component="div">
            {movie.title}
          </MovieTitle>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, alignItems: "center" }}>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
              <ModernButton variant="contained">
                More Info
              </ModernButton>
            </Link>
            {action && (
              <Box sx={{ ml: 1 }}>
                {action(movie)}
              </Box>
            )}
          </Box>
        </ContentOverlay>
      </Fade>
    </ModernCard>
  );
}