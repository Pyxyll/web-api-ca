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
import { styled } from '@mui/material/styles';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  marginBottom: '40px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.7)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
    },
    '&:before, &:after': {
      display: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#6366f1',
    },
  },
  '& .MuiFilledInput-input': {
    color: 'white',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
    },
    '&:before, &:after': {
      display: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#6366f1',
    },
  },
  '& .MuiSelect-select': {
    color: 'white',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-1px)',
  }
}));

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
    if (value <= 3) return '#ef4444';
    if (value <= 7) return '#f59e0b';
    return '#10b981';
  };

  return (
    <StyledCard variant="outlined">
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
            fontWeight: 700,
            marginBottom: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <TuneIcon 
            fontSize="medium" 
            sx={{ 
              color: '#6366f1',
              filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))'
            }} 
          />
          Movie Filters
        </Typography>

        <Stack spacing={3} sx={{ flexGrow: 1 }}>
          <StyledTextField
            sx={formControl}
            id="filled-search"
            label="Search Movies"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "#6366f1" }} />,
            }}
          />

          <StyledFormControl
            sx={formControl}
            variant="filled"
          >
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.4)',
                        },
                      },
                    },
                  },
                },
              }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <SliderContainer>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{
                color: "white",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
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
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${getRatingColor(props.voteAverageFilter || 0)}33, 0 4px 12px rgba(0, 0, 0, 0.3)`,
                  },
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: getRatingColor(props.voteAverageFilter || 0),
                  color: 'white',
                  fontWeight: 600,
                },
                '& .MuiSlider-mark': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
                '& .MuiSlider-markLabel': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem',
                },
              }}
            />
          </SliderContainer>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}