import Favorite from "../models/favoritesModel.js";
import Movies from "../models/moviesModel.js";

// Récupération d'un utilisateur
async function getFavorite (req, res) {
    try {
        const favorites = await Movies.findById(req.params.id);
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
        const favorites = await Movies.findById(Favorite.find().select("id"));
        if (!favorites) return res.status(404).send("Favorites not found");
        res.send(favorites);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Création d'un utilisateur
async function createFavorite (req, res) {
    try {
        const { Moviesid } = req.body;

        let favorites = await Favorite.findOne({ Moviesid });
        if (favorites) return res.status(409).send("Favorite already registered.");

        favorites = new Favorite({ Moviesid });

        await favorites.save();

        favorites = favorites.toObject()

        res.send(favorites);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Midification d'un utilisateur
async function updateFavorite (req, res) {
    try {
        const { Moviesid } = req.body;

        let favorites = await Favorite.findById(req.params.id);
        if (!favorites) return res.status(404).send("Favorite not found");

        if(Moviesid) favorites.Moviesid = Moviesid;

        await favorites.save();

        favorites = favorites.toObject()

        res.send(favorites);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}

async function deleteFavorite (req, res) {
    try {
        const favorites = await Favorite.findByIdAndDelete(req.params.id);
        if (!favorites) return res.status(404).send("Favorite not found");
        res.status(204).send("Favorite deleted");
    } catch (error) {
        console.log(error);
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