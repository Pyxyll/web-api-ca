import express from 'express';
import User from './userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { upload, uploadImageToCloudinary, deleteImage } from '../cloudinary.js';
import UserMovies from '../userMovies/userMoviesModel.js';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', upload.single('profileImage'), asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

async function registerUser(req, res) {
    // Password validation logic
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ 
            success: false, 
            msg: 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.' 
        });
    }

    let uploadedImage = null;

    try {
        // Prepare user data
        const userData = {
            username: req.body.username,
            password: req.body.password
        };

        // Upload image to Cloudinary if provided
        if (req.file) {
            uploadedImage = await uploadImageToCloudinary(req.file.buffer);
            userData.profileImage = {
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id
            };
        }

        // Create user
        const user = await User.create(userData);
        
        res.status(201).json({ 
            success: true, 
            msg: 'User successfully created.',
            user: {
                username: user.username,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        // Clean up uploaded image on error
        if (uploadedImage) {
            await deleteImage(uploadedImage.public_id);
        }
        
        if (error.code === 11000) {
            res.status(400).json({ success: false, msg: 'Username already exists.' });
        } else {
            throw error;
        }
    }
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ 
            success: true, 
            token: 'BEARER ' + token,
            user: {
                username: user.username,
                profileImage: user.profileImage
            }
        });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

// Get user profile
router.get('/profile/:username', asyncHandler(async (req, res) => {
    console.log('Getting profile for username:', req.params.username);
    
    const user = await User.findByUserName(req.params.username).select('-password');
    if (!user) {
        console.log('User not found:', req.params.username);
        return res.status(404).json({ success: false, msg: 'User not found.' });
    }
    
    console.log('User found:', user.username);
    res.status(200).json({ 
        success: true, 
        user: {
            username: user.username,
            profileImage: user.profileImage,
            createdAt: user.createdAt
        }
    });
}));

router.get('/favorites', authenticate, asyncHandler(async (req, res) => {
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    const favoriteIds = userMovies.getFavoriteIds();
    
    res.status(200).json({ 
        success: true, 
        favorites: favoriteIds
    });
}));

router.post('/favorites/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    await userMovies.addToFavorites(movieId);
    
    res.status(200).json({ 
        success: true, 
        message: 'Movie added to favorites',
        favorites: userMovies.getFavoriteIds()
    });
}));

router.delete('/favorites/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    await userMovies.removeFromFavorites(movieId);
    
    res.status(200).json({ 
        success: true, 
        message: 'Movie removed from favorites',
        favorites: userMovies.getFavoriteIds()
    });
}));

router.get('/favorites/:movieId/check', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    const isFavorite = userMovies.isFavorite(movieId);
    
    res.status(200).json({ 
        success: true, 
        isFavorite
    });
}));


router.get('/watchlist', authenticate, asyncHandler(async (req, res) => {
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    const watchlistIds = userMovies.getWatchlistIds();
    
    res.status(200).json({ 
        success: true, 
        watchlist: watchlistIds
    });
}));

router.post('/watchlist/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    await userMovies.addToWatchlist(movieId);
    
    res.status(200).json({ 
        success: true, 
        message: 'Movie added to watchlist',
        watchlist: userMovies.getWatchlistIds()
    });
}));

router.delete('/watchlist/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    await userMovies.removeFromWatchlist(movieId);
    
    res.status(200).json({ 
        success: true, 
        message: 'Movie removed from watchlist',
        watchlist: userMovies.getWatchlistIds()
    });
}));

router.get('/reviews', authenticate, asyncHandler(async (req, res) => {
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    const reviewsObj = userMovies.getReviewsObject();
    
    res.status(200).json({ 
        success: true, 
        reviews: reviewsObj
    });
}));

router.post('/reviews/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    const { rating, content } = req.body;
    
    if (!rating || !content) {
        return res.status(400).json({ 
            success: false, 
            message: 'Rating and content are required' 
        });
    }
    
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ 
            success: false, 
            message: 'Rating must be between 1 and 5' 
        });
    }
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    await userMovies.addOrUpdateReview(movieId, rating, content);
    
    res.status(200).json({ 
        success: true, 
        message: 'Review saved successfully',
        reviews: userMovies.getReviewsObject()
    });
}));

router.delete('/reviews/:movieId', authenticate, asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    
    const userMovies = await UserMovies.getOrCreateUserMovies(req.user._id);
    await userMovies.removeReview(movieId);
    
    res.status(200).json({ 
        success: true, 
        message: 'Review deleted successfully',
        reviews: userMovies.getReviewsObject()
    });
}));


export default router;