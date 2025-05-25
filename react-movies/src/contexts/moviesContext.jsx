import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { 
  getUserFavorites, 
  addToFavorites as addToFavoritesAPI, 
  removeFromFavorites as removeFromFavoritesAPI,
  getUserWatchlist,
  addToWatchlist as addToWatchlistAPI,
  removeFromWatchlist as removeFromWatchlistAPI,
  getUserReviews,
  addReview as addReviewAPI
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]); 
  const [playlist, setPlaylist] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserMovieData();
    } else {
      setFavorites([]);
      setPlaylist([]);
      setMyReviews({});
    }
  }, [isAuthenticated, user]);

  const loadUserMovieData = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const favoritesResponse = await getUserFavorites();
      if (favoritesResponse.success) {
        setFavorites(favoritesResponse.favorites);
      }

      const watchlistResponse = await getUserWatchlist();
      if (watchlistResponse.success) {
        setPlaylist(watchlistResponse.watchlist);
      }

      const reviewsResponse = await getUserReviews();
      if (reviewsResponse.success) {
        setMyReviews(reviewsResponse.reviews);
      }
    } catch (error) {
      console.error('Error loading user movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (movie) => {
    if (!isAuthenticated) {
      alert('Please log in to add favorites');
      return;
    }

    try {
      const response = await addToFavoritesAPI(movie.id);
      if (response.success) {
        setFavorites(response.favorites);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to favorites');
    }
  };

  const removeFromFavorites = async (movie) => {
    if (!isAuthenticated) return;

    try {
      const response = await removeFromFavoritesAPI(movie.id);
      if (response.success) {
        setFavorites(response.favorites);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Failed to remove from favorites');
    }
  };

  const addToPlaylist = async (movie) => {
    if (!isAuthenticated) {
      alert('Please log in to add to watchlist');
      return;
    }

    try {
      const response = await addToWatchlistAPI(movie.id);
      if (response.success) {
        setPlaylist(response.watchlist);
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      alert('Failed to add to watchlist');
    }
  };

  const removeFromPlaylist = async (movie) => {
    if (!isAuthenticated) return;

    try {
      const response = await removeFromWatchlistAPI(movie.id);
      if (response.success) {
        setPlaylist(response.watchlist);
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove from watchlist');
    }
  };

  const addReview = async (movie, review) => {
    if (!isAuthenticated) {
      alert('Please log in to add reviews');
      return;
    }

    try {
      const response = await addReviewAPI(movie.id, review.rating, review.content);
      if (response.success) {
        setMyReviews(response.reviews);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        playlist,
        myReviews,
        loading,
        addToFavorites,
        addToPlaylist,
        removeFromFavorites,
        removeFromPlaylist,
        addReview,
        refreshUserData: loadUserMovieData,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;