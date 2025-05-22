import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import img from "../../images/film-poster-placeholder.png";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Link } from "react-router";

export default function ActorCard({ actor }) {
  const [isHovered, setIsHovered] = useState(false);

  let actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
    : img;

  return (
    <Link to={`/person/${actor.id}`}>
    <Card
      key={actor.id}
      className="cast-item"
      sx={{
        height: 400,
        backgroundImage: `url(${actorImage})`,
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
          {actor.name}
          </Typography>
          <Typography variant="h5" component="div" sx={{ color: "white" }}>
          as {actor.character}
          </Typography>
        </Box>
      </Fade>
    </Card>
    </Link>
  );
}
