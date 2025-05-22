import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

export default function PersonDetails({ person }) {
  return (
    <Box
      sx={{
        position: "relative",
        color: "white",
        minHeight: "500px",
        display: "flex",
        alignItems: "flex-end",
        borderRadius: "20px",
        overflow: "hidden",
        mb: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: person.profile_path
            ? `url(https://image.tmdb.org/t/p/w1920/${person.profile_path})`
            : "linear-gradient(to right, #2c3e50, #4ca1af)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
          zIndex: -1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "70%", sm: "250px" },
              alignSelf: "center",
              boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
              borderRadius: 2,
              overflow: "hidden",
              transform: "translateY(-30px)",
              mx: { xs: "auto", md: 0 },
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
              alt={person.name}
              style={{ width: "100%", display: "block" }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              {person.name}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Chip
                icon={<CakeIcon />}
                label={`Born: ${person.birthday}`}
                sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
              />

              <Chip
                icon={<LocationOnIcon />}
                label={person.place_of_birth}
                sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
              />
            </Stack>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Chip
                  icon={<LocalMoviesIcon />}
                  label={`Popularity: ${person.popularity}`}
                  sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
                />
                  <Chip
                    icon={<WorkIcon />}
                    label={
                      person.gender === 1
                        ? "Female"
                        : person.gender === 2
                        ? "Male"
                        : "Other"
                    }
                    sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
                  />
              </Box>


              <Typography
                variant="body1"
                sx={{
                  maxWidth: "800px",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {person.biography}
              </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
