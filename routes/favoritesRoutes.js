import e from "express";
import favoritesController from "../controllers/favoritesController.js";

const router = e.Router();

router.get("/", favoritesController.getAllFavorites);
router.get("/:id", favoritesController.getFavorite);
router.post("/", favoritesController.createFavorite);
router.put("/:id", favoritesController.updateFavorite);
router.delete("/:id", favoritesController.deleteFavorite);

export default router;