import { Router } from "express";
import { signIn, signUp } from "../controllers/user";

const rootRouter = Router();

rootRouter.post("/signup", signUp);
rootRouter.post("/signin", signIn);

export default rootRouter;
