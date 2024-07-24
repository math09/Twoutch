import e from 'express';
import recommendationController from '../controllers/recommendationController.js';
import authMiddleware from "../middlewares/authMiddleware.js";


const router = e.Router();

router.get("/",authMiddleware.authenticateToken, recommendationController.getRecommendations)

export default router
