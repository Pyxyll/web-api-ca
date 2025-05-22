import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getGenre = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
};

export const getUpcoming = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
};

export const getPopular = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
};

export const getNowPlaying = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
}

export const getTopRated = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
}

export const getMovie = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };

  export const getMovieImages = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };

  export const getMovieVideos = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };

  export const getMovieReviews = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };

  export const getMovieCredits = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };

  export const getActor = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };

  export const getPersonMovies = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    
    return await response.json();
  };