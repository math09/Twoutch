import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  Moviesid: { type: String, required: true },
  adAt: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;