import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserMoviesSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  
  favorites: [{
    movieId: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now }
  }],
  
  watchlist: [{
    movieId: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now }
  }],
  
  reviews: [{
    movieId: { type: Number, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true, minlength: 10, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }]
}, { 
  timestamps: true 
});

UserMoviesSchema.index({ userId: 1 });
UserMoviesSchema.index({ 'favorites.movieId': 1 });
UserMoviesSchema.index({ 'watchlist.movieId': 1 });
UserMoviesSchema.index({ 'reviews.movieId': 1 });

UserMoviesSchema.statics.getOrCreateUserMovies = async function(userId) {
  let userMovies = await this.findOne({ userId });
  if (!userMovies) {
    userMovies = new this({ 
      userId,
      favorites: [],
      watchlist: [],
      reviews: []
    });
    await userMovies.save();
  }
  return userMovies;
};

UserMoviesSchema.methods.addToFavorites = function(movieId) {
  // Check if already exists
  const exists = this.favorites.some(fav => fav.movieId === movieId);
  if (!exists) {
    this.favorites.push({ movieId });
  }
  return this.save();
};

UserMoviesSchema.methods.removeFromFavorites = function(movieId) {
  this.favorites = this.favorites.filter(fav => fav.movieId !== movieId);
  return this.save();
};

UserMoviesSchema.methods.isFavorite = function(movieId) {
  return this.favorites.some(fav => fav.movieId === movieId);
};

UserMoviesSchema.methods.getFavoriteIds = function() {
  return this.favorites.map(fav => fav.movieId);
};

// WATCHLIST METHODS
UserMoviesSchema.methods.addToWatchlist = function(movieId) {
  const exists = this.watchlist.some(item => item.movieId === movieId);
  if (!exists) {
    this.watchlist.push({ movieId });
  }
  return this.save();
};

UserMoviesSchema.methods.removeFromWatchlist = function(movieId) {
  this.watchlist = this.watchlist.filter(item => item.movieId !== movieId);
  return this.save();
};

UserMoviesSchema.methods.isInWatchlist = function(movieId) {
  return this.watchlist.some(item => item.movieId === movieId);
};

UserMoviesSchema.methods.getWatchlistIds = function() {
  return this.watchlist.map(item => item.movieId);
};

UserMoviesSchema.methods.addOrUpdateReview = function(movieId, rating, content) {
  // Remove existing review for this movie
  this.reviews = this.reviews.filter(review => review.movieId !== movieId);
  
  this.reviews.push({
    movieId,
    rating,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  
  return this.save();
};

UserMoviesSchema.methods.removeReview = function(movieId) {
  this.reviews = this.reviews.filter(review => review.movieId !== movieId);
  return this.save();
};

UserMoviesSchema.methods.getReview = function(movieId) {
  return this.reviews.find(review => review.movieId === movieId);
};

UserMoviesSchema.methods.getReviewsObject = function() {
  const reviewsObj = {};
  this.reviews.forEach(review => {
    reviewsObj[review.movieId] = {
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    };
  });
  return reviewsObj;
};

export default mongoose.model('UserMovies', UserMoviesSchema);