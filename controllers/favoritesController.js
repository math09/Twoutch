import Favorite from "../models/favoritesModel.js";
import Movies from "../models/moviesModel.js";
import logger from "../utils/logger.js";

// Récupération d'un utilisateur
async function getFavorite (req, res) {
    try {
        const userFavorite = await Favorite.find({ userId: { $in: req.user.id } })
        const favoriteMovieIds = userFavorite.find({ _id: { $in: req.params.id } })
        const favorites = await Movies.findById(favoriteMovieIds);
        if (!favorites) return res.status(404).send("Favorite not found");
        res.send(favorites);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Récupération de tous les utilisateurs
async function getAllFavorites (req, res) {
    try {
        const favorites = await Favorite.find({ userId: { $in: req.user.id } }).select("Moviesid");
        const favoriteMovieIds = favorites.map(fav => fav.Moviesid);
        const favoriteMovies = await Movies.find({ _id: { $in: favoriteMovieIds } });
        if (!favoriteMovies) return res.status(404).send("Favorite not found");
        res.send(favoriteMovies);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Création d'un utilisateur
async function createFavorite (req, res) {
    try {
        const { Moviesid } = req.body;

        let favorites = await Favorite.findOne({ Moviesid });
        if (favorites) return res.status(409).send("Favorite already registered.");

        favorites = new Favorite({ Moviesid, userId: req.user.id });

        await favorites.save();

        favorites = favorites.toObject()

        res.send(favorites);
    } 
    catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Modification d'un utilisateur
async function updateFavorite (req, res) {
    try {
        const { Moviesid, userId } = req.body;

        let favorites = await Favorite.findById(req.params.id);
        if (!favorites) return res.status(404).send("Favorite not found");

        if(Moviesid) favorites.Moviesid = Moviesid;
        if(userId) favorites.userId = userId;

        await favorites.save();

        favorites = favorites.toObject()

        res.send(favorites);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

async function deleteFavorite (req, res) {
    try {
        const favorites = await Favorite.findByIdAndDelete(req.params.id);
        if (!favorites) return res.status(404).send("Favorite not found");
        res.status(204).send("Favorite deleted");
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    getFavorite,
    getAllFavorites,
    createFavorite,
    updateFavorite,
    deleteFavorite
};