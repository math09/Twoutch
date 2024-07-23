import Movie from '../models/moviesModel.js';
import logger from '../utils/logger.js';

// Récupération de tous les films
async function getAllMovies(req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1; 
        const limit = parseInt(req.query.limit, 10) || 10;
        
        if (page < 1 || limit < 1) {
            return res.status(400).send("Page and limit must be positive");
        }
        const skip = (page - 1) * limit;
        const movies = await Movie.find().skip(skip).limit(limit);
        if (!movies) return res.status(404).send("Movies not found");
        const totalMovies = await Movie.countDocuments();
        const response = {
            totalMovies,
            totalPages: Math.ceil(totalMovies / limit),
            currentPage: page,
            movies
        };
        res.send(response);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Récupération d'un film
async function getMovieById (req, res) {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("User not found");
        res.send(movie);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// recherche de films
async function getMoviesByValue (req, res) {
    try {
        
        let dateValue = null;

        if (!isNaN(Date.parse(req.params.value))) {
            dateValue = new Date(req.params.value);
        }

        const query = {
            $or: [
                { name: req.params.value },
                { categories: { $in: [req.params.value] } }
            ]
        };
        if (dateValue) {
            query.$or.push({ release_date: dateValue });
        }

        const movies = await Movie.find(query);
        if (!movies) return res.status(404).send("User not found");
        res.send(movies);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Création d'un film
async function createMovie (req, res) {
    try {
        if (req.user.role != 'ADMIN'){
            return res.status(403).send("Forbidden request");
        }
        const { name, release_date, creator, distributor, actors, categories, url } = req.body;

        let movie = await Movie.findOne({ name, release_date });
        if (movie) return res.status(409).send("Movie already added.");

        movie = new Movie({ name, release_date, creator, distributor, actors, categories, url });

        await movie.save();

        res.send(movie);
    } 
    catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Modification d'un film
async function updateMovies (req, res) {
    if (req.user.role != 'ADMIN'){
        return res.status(403).send("Forbidden request");
    }
    try {   
        const { name, release_date, creator, distributor, actors, categories, url } = req.body;

        let movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("User not found");

        if(name) movie.name = name;
        if(release_date) movie.release_date = release_date;
        if(creator) movie.creator = creator;
        if(distributor) movie.distributor = distributor;
        if(actors) movie.actors = actors;
        if(categories) movie.categories = categories;
        if(url) movie.url = url;

        await movie.save();

        res.send(movie);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Supression d'un film
async function deleteMovies (req, res) {
    if (req.user.role != 'ADMIN'){
        return res.status(403).send("Forbidden request");
    }
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).send("User not found");
        res.status(204).send("User deleted");
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}


export default {
    getAllMovies,
    getMovieById,
    getMoviesByValue,
    createMovie,
    updateMovies,
    deleteMovies
};