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
router.post("/notes", limiter, createNote);
router.get("/notes", limiter, getNotes);
router.get("/notes/:id", limiter, getNoteById);
router.put("/notes/:id", limiter, updateNote);
router.delete("/notes/:id", limiter, deleteNote);
router.post("/notes/:id/share", limiter, shareNote);
router.get("/search", limiter, searchNotes);

export default router;
