import Favorites from '../models/favoritesModel.js';
import Movies from '../models/moviesModel.js';
import logger from '../utils/logger.js';

// Récupération de tous les recommendations
async function getRecommendations(req, res) {
    try {

        const favorites = await Favorites.findById(req.params.id);
        if (!favorites) return [];

        const categories = [];
        for (const movieId of favorites.Moviesid) {
            const movie = await Movies.findById(movieId);
            movie.categories.forEach(category => {
                if (!categories.includes(category)){
                    categories.push(category)
                }
            });
        }
        const allMoviesInCategories  = await Movies.find({categories: { $in: categories }});
        const favoriteMovieIds = new Set(favorites.Moviesid.map(id => id.toString()));
        const movies = allMoviesInCategories.filter(movie => !favoriteMovieIds.has(movie._id.toString()));

        res.send(movies);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    getRecommendations
};