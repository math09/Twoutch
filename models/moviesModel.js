import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  release_date: { type: Date, required: true, },
  creator: { type: String, required: true },
  distributor: { type: String, required: true },
  actors: { type: [String], required: true },
  categories: { type: [String], required: true },
  url: { type: String, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;