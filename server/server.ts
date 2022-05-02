import express, { Request, Response } from "express";
import { createServer, Server } from "http";
import { nanoid } from "nanoid";
import cors from "cors";

const app = express();
const httpServer: Server = createServer(app);

const CORS_OPTION = {
	origin: process.env.CLIENT_URI,
};

const rooms: any = {};

app.use(cors(CORS_OPTION));
app.use(express.json());

app.post("/create-room", (req: Request, res: Response) => {
	const { id, name } = req.body as { id: string; name: string };
	const roomId: string = nanoid(8);
	rooms[roomId] = { [id]: { name, turn: "x" } };

	res.status(201).json({
		message: "Successfully created room",
		roomId,
	});
});

httpServer.listen(5000, () => {
	console.log("Server started on port 5000");
});
