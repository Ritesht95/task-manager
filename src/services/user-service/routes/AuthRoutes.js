import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/auth/signUp", AuthController.signUp)
router.post("/auth/login", AuthController.login)
router.get("/userMe", authMiddleware, AuthController.userMe)


export default router;