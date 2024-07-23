import Movie from '../models/moviesModel.js';
import logger from '../utils/logger.js';

// Récupération de tous les films
async function getAllMovies(req, res) {
    try {
        const movies = await Movie.find();
        if (!movies) return res.status(404).send("Movies not found");
        res.send(movies);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Récupération d'un utilisateur
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

// Création d'un films
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

// Midification d'un utilisateur
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
    createMovie,
    updateMovies,
    deleteMovies
};