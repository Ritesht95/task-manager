import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import bcrypt, { genSaltSync } from "bcrypt";

const router = Router();

router.post("/auth/signUp", AuthController.signUp)
router.post("/auth/login", AuthController.login)


export default router;