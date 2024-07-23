import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  Moviesid: { type: String, required: true },
  adAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;