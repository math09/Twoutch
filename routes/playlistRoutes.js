import e from "express";
import playlistController from "../controllers/playlistController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authMiddleware.authenticateToken, playlistController.getAllPlaylist);
router.get("/:id", authMiddleware.authenticateToken, playlistController.getPlaylist);
router.post("/", authMiddleware.authenticateToken, playlistController.createPlaylist);
router.put("/:id", authMiddleware.authenticateToken, playlistController.updatePlaylist);
router.delete("/:id", authMiddleware.authenticateToken, playlistController.deletePlaylist);

export default router;