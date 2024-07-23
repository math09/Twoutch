import e from 'express';
import moviesController from '../controllers/moviesController.js';
import authMiddleware from "../middlewares/authMiddleware.js";


const router = e.Router();

router.get("/", moviesController.getAllMovies)
router.get("/:id", moviesController.getMovieById)
router.get("/search/:value", moviesController.getMoviesByValue)
router.post("/",authMiddleware.authenticateToken, moviesController.createMovie)
router.put("/:id",authMiddleware.authenticateToken, moviesController.updateMovies)
router.delete("/:id",authMiddleware.authenticateToken, moviesController.deleteMovies)

export default router
