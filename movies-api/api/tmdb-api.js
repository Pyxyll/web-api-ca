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

export const getUpcoming = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
};

export const getPopular = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
};

export const getNowPlaying = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
}

export const getTopRated = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        const error = await response.json();
    }

    return await response.json();
}