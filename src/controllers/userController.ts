import { NextFunction, Request, Response } from "express";
import {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
	getUserByEmail,
} from "../repositories/userRepository";
import { comparePassword } from "../libs/pass";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await getAllUsers();
		res.json({
			ok: true,
			message: "Usuarios obtenidos correctamente",
			data: users,
		});
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		res.status(500).json({
			ok: false,
			message: "Error al obtener usuarios",
			error: errorMsg,
		});
	}
};

export const newUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const newUser = await createUser(name, email, password);

		res.status(201).json({
			ok: true,
			message: "Usuario creado correctamente",
			data: newUser,
		});
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		res.status(500).json({ msg: "Error al crear usuario", error: errorMsg });
	}
};

export const findUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await getUserById(Number(id));
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({
				ok: false,
				message: "Usuario no encontrado",
				data: null,
			});
		}
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		res.status(500).json({
			ok: false,
			message: "Error al obtener usuario",
			error: errorMsg,
		});
	}
};

export const updateUserByID = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;
		const updatedUser = await updateUser(Number(id), name, email, password);
		res.json({
			ok: true,
			message: "Usuario actualizado correctamente",
			data: updatedUser,
		});
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		res.status(500).json({
			ok: false,
			message: "Error al actualizar usuario",
			error: errorMsg,
		});
	}
};

export const deleteUserByID = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteUser(Number(id));
		res.json({
			ok: true,
			message: "Usuario eliminado correctamente",
			data: null,
		});
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		res.status(500).json({
			ok: false,
			message: "Error al eliminar usuario",
			error: errorMsg,
		});
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);
		if (!user) {
			res.status(404).json({
				ok: false,
				message: "Usuario no encontrado",
			});
			return next();
		}
		const isPasswordValid = comparePassword(password, user.password);
		if (!isPasswordValid) {
			res.status(401).json({
				ok: false,
				message: "Contraseña incorrecta",
			});
			return next();
		}
		res.json({
			ok: true,
			message: "Login exitoso",
			data: user,
		});
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		res.status(500).json({
			ok: false,
			message: "Error al iniciar sesion",
			error: errorMsg,
		});
	}
};
