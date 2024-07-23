import e from "express";
import favoritesController from "../controllers/favoritesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authMiddleware.authenticateToken, favoritesController.getAllFavorites);
router.get("/:id", authMiddleware.authenticateToken, favoritesController.getFavorite);
router.post("/", authMiddleware.authenticateToken, favoritesController.createFavorite);
router.put("/:id", authMiddleware.authenticateToken, favoritesController.updateFavorite);
router.delete("/:id", authMiddleware.authenticateToken, favoritesController.deleteFavorite);

export default router;