import { Router } from "express";
import {
    updateUser,
    getAllUsers,
    deleteUser,
    getUserById
} from "../controllers/userController";
import isLoggedIn from '../middleware/authMiddleware';
import { restrictTo } from '../middleware/authMiddleware';

const router = Router();

// Admin-only routes
router
    .delete("/delete-user", isLoggedIn, restrictTo('admin'), deleteUser)
    .get("/users", isLoggedIn, restrictTo('admin'), getAllUsers);

// Protected routes (sadece giriş yapmış kullanıcılar)
router
    .post("/update-user", isLoggedIn, updateUser)
    .get("/:id", isLoggedIn, getUserById);

export { router as userRoutes };
