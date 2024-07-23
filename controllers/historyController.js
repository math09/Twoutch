import History from '../models/historyModel.js';
import Movie from '../models/moviesModel.js';
import logger from '../utils/logger.js';

// Récupération de tout l'historique
async function getAllHistory(req, res) {
    try {
        const userId = req.user.id;

        const historyEntries = await History.find({ userId }).populate('movieId');

        if (!historyEntries.length) return res.status(404).send("History not found");
        res.send(historyEntries);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Création d'un historique
async function createHistory(req, res) {
    try {
        const { movieId, status } = req.body;

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).send("Movie not found");
        
        const userId = req.user.id

        let history = await History.findOne({ userId, movieId });
        if (history) return res.status(409).send("Movie already added.");

        const newHistory = new History({
            userId,
            movieId,
            status,
            createdAt: Date.now()
        });

        await newHistory.save();
        res.send(newHistory);
    }
    catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Midification de historique
async function updateHistory(req, res) {
    try {
        const { status } = req.body;

        let history = await Movie.findById(req.params.id);

        if (!history) return res.status(404).send("History not found");

        if(status) history.status = status;

        await history.save();
    
        if (!updatedHistory) return res.status(404).send("History entry not found");
    
        res.status(200).json(updatedHistory);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

// Supprimer un historique
async function deleteHistory (req, res) {
    try {
      const { id } = req.params;

      const deletedHistory = await History.findByIdAndDelete(id);
  
      if (!deletedHistory) return res.status(404).send("History entry not found");
  
      res.status(204).json({ message: "History entry deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
};


export default {
    getAllHistory,
    createHistory,
    updateHistory,
    deleteHistory
};