import e from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", authMiddleware.authenticateToken, userController.getAllUsers);
router.get("/:id", authMiddleware.authenticateToken, userController.getUser);
router.post("/", authMiddleware.authenticateToken, userController.createUser);
router.put("/:id", authMiddleware.authenticateToken, userController.updateUser);
router.put("/", authMiddleware.authenticateToken, userController.updateUser);
router.delete("/:id", authMiddleware.authenticateToken, userController.deleteUser);
router.delete("/", authMiddleware.authenticateToken, userController.deleteUser);

export default router;