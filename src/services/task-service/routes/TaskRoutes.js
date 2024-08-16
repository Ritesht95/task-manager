import { Router } from "express";
import TaskController from "../controller/TaskController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.get("/tasks", authMiddleware, TaskController.getAll)
router.get("/task/:taskId", authMiddleware, TaskController.getById)
router.post("/task", authMiddleware, TaskController.create)
router.put("/task/:taskId", authMiddleware, TaskController.update)
router.delete("/task/:taskId", authMiddleware, TaskController.delete)


export default router;