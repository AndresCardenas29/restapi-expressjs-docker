export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateUserDto {
	name: string;
	email: string;
	password: string;
}

export interface UpdateUserDto {
	name?: string;
	email?: string;
	password?: string;
}
