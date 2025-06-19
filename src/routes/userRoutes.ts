import { Router } from "express";
import {
	getUsers,
	newUser,
	findUserById,
	updateUserByID,
	deleteUserByID,
	login,
} from "../controllers/userController";

const router = Router();

// busca todos los usuarios
router.get("/", getUsers);

// crea un nuevo usuario
router.post("/", newUser);

// busca un usuario por id
router.get("/:id", findUserById);

// actualiza un usuario por id
router.patch("/:id", updateUserByID);

// elimina un usuario por id
router.delete("/:id", deleteUserByID);

// auth
router.post("/auth", login);

export default router;
