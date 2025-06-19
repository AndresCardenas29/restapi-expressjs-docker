import { Request, Response, NextFunction } from "express";

export function logPath(req: Request, _res: Response, next: NextFunction) {
	console.log(`Request a: ${req.path}`);
	next();
}
