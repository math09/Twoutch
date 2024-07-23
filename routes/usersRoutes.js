import e from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = e.Router();

router.get("/", userController.getAllUsers);
router.get("/:id",authMiddleware.authenticateToken, userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;