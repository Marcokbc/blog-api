import { Router } from "express";
import postRouter from "../controllers/PostController";
import categoryRouter from "../controllers/CategoryController";
import authRouter from "../controllers/AuthController";

const routers = Router();

routers.use("/posts", postRouter);
routers.use("/categories", categoryRouter);
routers.use("/auth", authRouter);

export default routers;
