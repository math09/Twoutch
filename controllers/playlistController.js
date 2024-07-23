import Playlist from "../models/playlistModel.js";
import Movies from "../models/moviesModel.js";
import logger from "../utils/logger.js";

// Récupération d'un utilisateur
async function getPlaylist (req, res) {
    try {
        const playlists = await Movies.findById(Playlist.findById(req.params.id).select("Moviesid"));
        if (!playlists) return res.status(404).send("Playlist not found");
        res.send(playlists);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Récupération de tous les utilisateurs
async function getAllPlaylists (req, res) {
    try {
        const playlists = await Movies.findById(Playlist.find().select("Moviesid"));
        if (!playlists) return res.status(404).send("Playlists not found");
        res.send(playlists);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Création d'un utilisateur
async function createPlaylist (req, res) {
    try {
        const { Moviesid } = req.body;

        let playlists = await Playlist.findOne({ Moviesid });
        if (playlists) return res.status(409).send("Playlist already registered.");

        playlists = new Playlist({ Moviesid });

        await playlists.save();

        playlists = playlists.toObject()

        res.send(playlists);
    } 
    catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Midification d'un utilisateur
async function updatePlaylist (req, res) {
    try {
        const { Moviesid } = req.body;

        let playlists = await Playlist.findById(req.params.id);
        if (!playlists) return res.status(404).send("Playlist not found");

        if(Moviesid) playlists.Moviesid = Moviesid;

        await playlists.save();

        playlists = playlists.toObject()

        res.send(playlists);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

async function deletePlaylist (req, res) {
    try {
        const playlists = await Playlist.findByIdAndDelete(req.params.id);
        if (!playlists) return res.status(404).send("Playlist not found");
        res.status(204).send("Playlist deleted");
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    getPlaylist,
    getAllPlaylists,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
};