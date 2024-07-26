import Favorites from '../models/favoritesModel.js';
import Movies from '../models/moviesModel.js';
import logger from '../utils/logger.js';

// Récupération de toutes les recommendations
async function getRecommendations(req, res) {
    try {
        const favorites = await Favorites.find({userId: req.user.id}).populate('Moviesid');
        if (!favorites) return [];
        const categories = [];
        for (const fav of favorites) {
            fav.Moviesid.categories.forEach(category => {
                if (!categories.includes(category)){
                    categories.push(category)
                }
            });
        }
        const allMoviesInCategories  = await Movies.find({categories: { $in: categories }});

        for (const fav of favorites) {
            const movie = allMoviesInCategories.find(movie => movie._id.toString() === fav.Moviesid._id.toString());
            allMoviesInCategories.splice(allMoviesInCategories.indexOf(movie), 1);
        }
        

        res.send(allMoviesInCategories);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    getRecommendations
};