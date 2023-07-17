import { Router } from "express";
import { addMember, createRoom, deleteRoom } from "../controllers";
import authMiddlware from "../../../middleware/auth";

export const router = Router();

router.post("/", authMiddlware, createRoom);

router.post("/:roomId/add", authMiddlware, addMember);

router.delete("/", authMiddlware, deleteRoom);

export default router;
