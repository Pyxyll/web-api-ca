const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? {
    'Authorization': token,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
};


export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getGenres = () => {
  return fetch(
    `http://localhost:8080/api/movies/genre`

  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getUpcommingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/upcoming`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

// old
export const getPopularMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/popular`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getNowPlayingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/now_playing`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getTopRatedMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/top_rated`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};
  
export const getMovie = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/movies/${id}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};

export const getMovieImages = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/movies/${id}/images`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};

export const getMovieVideos = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/movies/${id}/videos`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};

export const getMovieReviews = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/movies/${id}/reviews`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};


export const getMovieCredits = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/movies/${id}/credits`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};

export const getPerson = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/actors/${id}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};

export const getPersonMovies = async (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  
  const response = await fetch(`http://localhost:8080/api/actors/${id}/credits`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Something went wrong");
  }
  
  return await response.json();
};
  
  // export const getPersonMovies = ({ queryKey }) => {
  //   const [, idPart] = queryKey;
  //   const { id } = idPart;
    
  //   return fetch(
  //     `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.TMDB_KEY}`
  //   ).then((response) => {
  //     if (!response.ok) {
  //       return response.json().then((error) => {
  //         throw new Error(error.status_message || "Something went wrong");
  //       });
  //     }
  //     return response.json();
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
  // };

  // USERS
  

  export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
  };
  
  export const signup = async (formData) => {
    // FormData automatically handles multipart/form-data
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        method: 'post',
        body: formData // Don't set Content-Type header for FormData
    });
    return response.json();
  };
  
 // Get user profile
  export const getUserProfile = async (username) => {
    const response = await fetch(`http://localhost:8080/api/users/profile/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return response.json();
  };

  export const getUserFavorites = async () => {
    const response = await fetch('http://localhost:8080/api/users/favorites', {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    
    return response.json();
  };
  
  export const addToFavorites = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/favorites/${movieId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }
    
    return response.json();
  };
  
  export const removeFromFavorites = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/favorites/${movieId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }
    
    return response.json();
  };
  
  export const getUserWatchlist = async () => {
    const response = await fetch('http://localhost:8080/api/users/watchlist', {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    
    return response.json();
  };
  
  export const addToWatchlist = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/watchlist/${movieId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to watchlist');
    }
    
    return response.json();
  };
  
  export const removeFromWatchlist = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/watchlist/${movieId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from watchlist');
    }
    
    return response.json();
  };
  
  export const getUserReviews = async () => {
    const response = await fetch('http://localhost:8080/api/users/reviews', {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    return response.json();
  };
  
  export const addReview = async (movieId, rating, content) => {
    const response = await fetch(`http://localhost:8080/api/users/reviews/${movieId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rating, content })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add review');
    }
    
    return response.json();
  };