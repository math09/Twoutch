import History from '../models/movieLabelsModel.js';
import Playlist from '../models/playlistModel.js';
import Movie from '../models/moviesModel.js';
import logger from '../utils/logger.js';

// Récupération de tout les playlists
async function getAllPlaylist(req, res) {
    try {
        const userId = req.user.id;

        const playlistEntries = (await Playlist.find({ userId }));

        if (!playlistEntries.length) return res.status(404).send("Playlist not found");
        res.send(playlistEntries);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Récupération d'une playlist
async function getPlaylist(req, res) {
    try {
        const userId = req.user.id;

        const playlistEntries = (await Playlist.find({ userId }).populate('_id'));

        if (!playlistEntries.length) return res.status(404).send("Playlist not found");
        res.send(playlistEntries);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Création d'une playlist
async function createPlaylist(req, res) {
    try {
        const { name } = req.body;
        
        const userId = req.user.id

        let playlist = await Playlist.findOne({ name });
        if (playlist) return res.status(409).send("Playlist name already exist.");

        const newPlaylist = new Playlist({
            userId,
            name,
            createdAt: Date.now()
        });

        await newPlaylist.save();
        res.send(newPlaylist);
    }
    catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Modification de la playlist
// Ajout d'un film et suppression lorsque qu'elle existe déjà
async function updatePlaylist(req, res) {
    try {
        const { movieId, name } = req.body;
        const status = "to watch";

        let playlist = await Playlist.findById(req.params.id);

        if (!playlist) return res.status(404).send("Playlist not found");

        if(name) playlist.name = name;

        if(playlist.movies.length > 0) {
            const moviePlaylist = playlist.movies.indexOf( movieId.toString() )
            if(moviePlaylist != -1) {
                playlist.movies.splice(playlist.movies.indexOf(playlist.movies[moviePlaylist]), 1);
            }
            else {
                const movie = await Movie.findById(movieId)
                playlist.movies.push(movie);
            }
        }
        else {
            const movie = await Movie.findById(movieId)
            playlist.movies.push(movie);
        }
        
        const userId = req.user.id;
        let history = await History.findOne({ userId , movieId });
        if (history) {
            history.status = "to watch";
            await history.save();
        }
        else {
            const newHistory = new History({
                userId,
                movieId,
                status,
                createdAt: Date.now()
            });

            await newHistory.save();
        }

        await playlist.save();
    
        res.status(200).json(playlist);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Supprimer une playlist
async function deletePlaylist(req, res) {
    try {
        const { id } = req.params;

        // Trouver la playlist à supprimer par son ID
        const deletedPlaylist = await Playlist.findById(id);
        
        if (!deletedPlaylist) {
            return res.status(404).send("Playlist entry not found");
        }

        // Trouver et supprimer les entrées History correspondant aux movies de la playlist
        await History.deleteMany({ _id: { $in: deletedPlaylist.movies } });

        // Supprimer la playlist
        await Playlist.findByIdAndDelete(id);

        res.status(204).json({ message: "Playlist entry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};



export default {
    getAllPlaylist,
    getPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
};