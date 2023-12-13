import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import router from "./routes/index.js";
import cookieParse from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Middlewares
// this will tell app that we are taking json data from client side
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParse(process.env.COOKIE_SECRET));

//! Remove it in production
app.use(morgan("dev"));

// Using Routes all
app.use("/api/v1", router);

export default app;
