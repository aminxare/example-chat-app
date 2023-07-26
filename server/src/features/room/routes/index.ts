import { Router } from "express";
import { getAllRoom, addMember, createRoom, deleteRoom } from "../controllers";
import { httpAuthMiddleware } from "../../../middleware/auth";

export const router = Router();

router.get("/", httpAuthMiddleware, getAllRoom);
router.post("/", httpAuthMiddleware, createRoom);
router.post("/:roomId/add", httpAuthMiddleware, addMember);
router.delete("/", httpAuthMiddleware, deleteRoom);

export default router;
