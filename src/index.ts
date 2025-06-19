import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import { logPath } from "./middlewares/log.middleware";

const app = express();

app.use(express.json());
app.use(logPath);
app.use("/users", userRoutes);

app.get("/", async (req, res) => {
	res.json({
		message: "Bienvenido a la API de usuarios",
		version: "1.0.0",
		author: "Andrés Cárdenas",
		portfolio: "https://nekdress.online/"
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
