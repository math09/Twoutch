import e from 'express';
import history from 'historyRoutes.js';
import movies from 'moviesRoutes.js';
import favorites from 'favoritesRoutes.js';
import playlist from 'playlistRoutes.js';
import recomendation from 'recomendationRoutes.js';
import user from 'usersRoutes.js'

const router = e.Router();

router.use("/api/user", user)

router.use("/api/history", history)

router.use("/api/movies", movies)

router.use("/api/favorites", favorites)

router.use("/api/playlist", playlist)

router.use("/api/recomendation", recomendation)
