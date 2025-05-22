import express from 'express';
import asyncHandler from 'express-async-handler';
import { getActor } from '../tmdb-api'; 

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const person = await getActor(id);
    res.status(200).json(person);
}));

export default router;