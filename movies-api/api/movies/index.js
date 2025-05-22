import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getGenre } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/genre', asyncHandler(async (req, res) => {
    const getMovieGenre = await getGenre();
    res.status(200).json(getMovieGenre);
}));

export default router;
