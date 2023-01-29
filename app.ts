import dotenv from "dotenv";
import Server from "./models/server";

// setting dotenv
dotenv.config();

const server = new Server();

server.listen();