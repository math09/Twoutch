import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,  ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const History = mongoose.model("History", historySchema);

export default History;