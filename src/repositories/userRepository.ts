import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../libs/pass";
import { User } from "../types/user";

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
	return prisma.user.findMany();
};

export const createUser = async (
	name: string,
	email: string,
	password: string
): Promise<User> => {
	// check email
	const user = await getUserByEmail(email);
	if (user) {
		throw new Error("Email already exists");
	}

	const hashedPassword = hashPassword(password);
	return prisma.user.create({
		data: { name, email, password: hashedPassword },
	});
};

export const getUserById = async (id: number): Promise<User | null> => {
	return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (
	id: number,
	name: string,
	email: string,
	password: string
): Promise<User> => {
	const hashedPassword = hashPassword(password);
	return prisma.user.update({
		where: { id },
		data: { name, email, password: hashedPassword },
	});
};

export const deleteUser = async (id: number): Promise<User> => {
	return prisma.user.delete({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	return prisma.user.findUnique({ where: { email } });
};
