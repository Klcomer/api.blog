import { Router } from "express";
import {
    login,
    register,
    logout,
    forgetPassword,
    resetPassword,
} from "../controllers/authController";

const router = Router();

router
    .post("/register", register)
    .post("/login", login)
    .get("/logout", logout)
    .post("/forget-password", forgetPassword)
    .patch("/reset-password/:token", resetPassword);

export { router as authRoutes };
