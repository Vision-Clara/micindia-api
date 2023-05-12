import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/user";

const rootRouter = Router();

rootRouter.post("/signup", signUp);
rootRouter.post("/signin", signIn);
rootRouter.post("/signout", signOut);

export default rootRouter;
