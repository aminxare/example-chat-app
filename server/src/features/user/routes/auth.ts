import { Router } from "express";
import { postLogin, postSignup } from "../controllers/auth";

export const router = Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);

export default router;
