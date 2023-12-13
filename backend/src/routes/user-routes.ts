import express from "express";
import {
  getAllUsers,
  userLogin,
  userSignUp,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signUpValidator,
  validate,
} from "../utils/validators.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), userSignUp);
userRouter.post("/login", userLogin);

export default userRouter;
