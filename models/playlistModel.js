import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,  ref: 'User', required: true },
    name: { type: String, required: true },
    movies: { type: [mongoose.Schema.Types.ObjectId], ref: 'Movie', required: true },
    adAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;