import { Router } from "express";
import TaskRoutes from "./TaskRoutes.js";

const router = Router();

router.use("/api", TaskRoutes)

export default router;