import { Router } from "express";
import {
    updateUser,
    getAllUsers,
    deleteUser,
} from "../controllers/userController";

const router = Router();

router
    .post("/update-user", updateUser)
    .get("/users", getAllUsers)
    .delete("/delete-user", deleteUser);

export { router as userRoutes };
