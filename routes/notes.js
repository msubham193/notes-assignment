import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
} from "../controllers/note.js";
import { limiter } from "../middleware/rateLimit.js";

const router = Router();

router.use(authenticateToken);
router.post("/", limiter, createNote);
router.get("/", limiter, getNotes);
router.get("/:id", limiter, getNoteById);
router.put("/:id", limiter, updateNote);
router.delete("/:id", limiter, deleteNote);
router.post("/:id/share", limiter, shareNote);
router.get("/search", limiter, searchNotes);

export default router;
