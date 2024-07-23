import e from "express";
import playlistController from "../controllers/playlistController.js";

const router = e.Router();

router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlaylist);
router.post("/", playlistController.createPlaylist);
router.put("/:id", playlistController.updatePlaylist);
router.delete("/:id", playlistController.deletePlaylist);

export default router;