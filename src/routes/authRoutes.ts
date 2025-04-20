import { Router } from "express";
import {
    login,
    register,
    logout,
    forgetPassword,
    resetPassword,
    getMe
} from "../controllers/authController";
import isLoggedIn from '../middleware/authMiddleware';

const router = Router();

router
    .post("/register", register)
    .post("/login", login)
    .get("/logout", logout)
    .post("/forget-password", forgetPassword)
    .post("/reset-password", resetPassword)
    .get("/me", isLoggedIn, getMe);

export { router as authRoutes };
