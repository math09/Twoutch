import e from "express";
import history from history
import movies from movies
import favorites from favorites
import playlist from playlist
import recomendation from recomendation
import user from user

const router = e.Router();

router.use("/api/user", user)

router.use("/api/history", history)

router.use("/api/movies", movies)

router.use("/api/favorites", favorites)

router.use("/api/playlist", playlist)

router.use("/api/recomendation", recomendation)
