import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getGenre, getUpcoming, getPopular, getNowPlaying, getTopRated, getMovie, getMovieImages, getMovieVideos, getMovieReviews, getMovieCredits } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/genre', asyncHandler(async (req, res) => {
    const getMovieGenre = await getGenre();
    res.status(200).json(getMovieGenre);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcoming();
    res.status(200).json(upcomingMovies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopular();
    res.status(200).json(popularMovies);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlaying();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRated();
    res.status(200).json(topRatedMovies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

router.get('/:id/videos', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const videos = await getMovieVideos(id);
    res.status(200).json(videos);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getMovieCredits(id);
    res.status(200).json(credits);
}));

export default router;