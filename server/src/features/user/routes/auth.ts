import { Router } from "express";
import { postLogin } from "../controllers/auth";

export const router = Router();

router.post("/login", postLogin);

export default router;
