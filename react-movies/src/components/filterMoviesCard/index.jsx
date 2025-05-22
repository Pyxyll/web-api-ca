import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box"; 
import StarIcon from "@mui/icons-material/Star";
import TuneIcon from "@mui/icons-material/Tune";
import Stack from "@mui/material/Stack";
import img from "../../images/hero.jpg";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  minWidth: "100%",
  marginBottom: 2,
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleVoteAverageChange = (e, newValue) => {
    handleChange(e, "vote_average", newValue);
  };

  // Function to get the color for the rating
  const getRatingColor = (value) => {
    if (value <= 3) return '#f44336';
    if (value <= 7) return '#ff9800';
    return '#4caf50';
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        marginBottom: 5,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(63,81,181,0.85) 0%, rgba(33,150,243,0.85) 100%)",
          zIndex: 0,
        }
      }}
      variant="outlined"
    >
      <CardContent 
        sx={{ 
          padding: 3,
          paddingTop: 2.5,
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            marginBottom: 3,
            color: "white",
            textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <TuneIcon fontSize="medium" />
          Movie Filters
        </Typography>

        <Stack spacing={3} sx={{ flexGrow: 1 }}>
          <TextField
            sx={{
              ...formControl,
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                }
              },
              "& .MuiInputLabel-root": {
                color: "primary.main",
              },
            }}
            id="filled-search"
            label="Search Movies"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "primary.main" }} />,
            }}
          />

          <FormControl
            sx={{
              ...formControl,
              "& .MuiInputBase-root": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                }
              },
              "& .MuiInputLabel-root": {
                color: "primary.main",
              },
            }}
            variant="filled"
          >
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box 
            sx={{ 
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: 2.5, 
              borderRadius: 2,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }
            }}
          >
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{
                color: "text.primary",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <StarIcon sx={{ color: getRatingColor(props.voteAverageFilter || 0) }} />
              Minimum Rating: {props.voteAverageFilter || 0}
            </Typography>
            
            <Slider
              aria-labelledby="vote-average-slider"
              value={props.voteAverageFilter || 0}
              onChange={handleVoteAverageChange}
              valueLabelDisplay="auto"
              step={0.5}
              marks={[
                { value: 0, label: '0' },
                { value: 5, label: '5' },
                { value: 10, label: '10' }
              ]}
              min={0}
              max={10}
              sx={{ 
                color: getRatingColor(props.voteAverageFilter || 0),
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: `2px solid ${getRatingColor(props.voteAverageFilter || 0)}`,
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${getRatingColor(props.voteAverageFilter || 0)}33`,
                  },
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: getRatingColor(props.voteAverageFilter || 0),
                },
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}