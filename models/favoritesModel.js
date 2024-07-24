import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  Moviesid: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adAt: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;