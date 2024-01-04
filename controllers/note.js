import Note from "../models/note.js";
import User from "../models/user.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new note for the authenticated user
    const userId = req.user.userId;
    const newNote = new Note({ title, content, owner: userId });
    await newNote.save();

    return res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    // Retrieve notes for the authenticated user
    const userId = req.user.userId; // Assuming userId is stored in the JWT payload during authentication
    const notes = await Note.find({ owner: userId });

    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    // Retrieve the note by ID for the authenticated user
    const userId = req.user.userId;
    const note = await Note.findOne({ _id: noteId, owner: userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    // Find the note by ID for the authenticated user
    const userId = req.user.userId;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, owner: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ error: "Note not found or user does not have permission" });
    }

    return res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// deleteNote logic
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find and delete the note by ID for the authenticated user
    const userId = req.user.userId;
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      owner: userId,
    });

    if (!deletedNote) {
      return res
        .status(404)
        .json({ error: "Note not found or user does not have permission" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// shareNote logic
export const shareNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { username } = req.body;

    // Find the note by ID for the authenticated user
    const userId = req.user.userId;
    const note = await Note.findOne({ _id: noteId, owner: userId });

    if (!note) {
      return res
        .status(404)
        .json({ error: "Note not found or user does not have permission" });
    }

    // Find the user to share with
    const userToShareWith = await Note.findOne({ username });
    if (!userToShareWith) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the note is already shared with the user
    if (note.sharedWith.includes(userToShareWith._id)) {
      return res
        .status(400)
        .json({ error: "Note already shared with the user" });
    }

    // Share the note
    note.sharedWith.push(userToShareWith._id);
    await note.save();

    return res.status(200).json({ message: "Note shared successfully", note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// searchNotes logic
export const searchNotes = async (req, res) => {
  try {
    const query = req.query.q;

    console.log(query);

    // Search for notes based on keywords for the authenticated user
    const userId = req.user.userId;
    console.log(userId);
    if (!userId) {
      return;
    }

    const notes = await Note.find({ owner: userId, $text: { $search: query } });

    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  shareNote,
};
