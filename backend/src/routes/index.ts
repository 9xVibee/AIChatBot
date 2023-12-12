import express from "express";
import userRouter from "./user-routes.js";
import chatRouter from "./chat-routes.js";

const router = express.Router();

router.use("/user", userRouter); //domain/api/v1/user
router.use("/chats", chatRouter); //domain/api/v1/chats

export default router;
