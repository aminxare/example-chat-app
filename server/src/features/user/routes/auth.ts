import { Router } from "express";
import { postLogin, verifyToken } from "../controllers/auth";

export const router = Router();

router.post("/login", postLogin);
router.post("/verify-token", verifyToken);

export default router;
