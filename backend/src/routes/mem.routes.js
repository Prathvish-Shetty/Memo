import { Router } from "express";
import { createMem, deleteMem, getPublicMem, updateMem, getMems } from "../controllers/mem.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", verifyJWT, createMem);
router.patch("/update/:id", verifyJWT, updateMem);
router.delete("/delete/:id", verifyJWT, deleteMem);
router.get("/my-mems", verifyJWT, getMems);
router.get("/:token", getPublicMem); // Public access via shareable link

export default router;