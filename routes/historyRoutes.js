import e from 'express';
import historyController from "../controllers/historyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/",authMiddleware.authenticateToken, historyController.getAllHistory)
router.post("/",authMiddleware.authenticateToken, historyController.createHistory)
router.put("/:id",authMiddleware.authenticateToken, historyController.updateHistory)
router.delete("/:id",authMiddleware.authenticateToken, historyController.deleteHistory)

export default router