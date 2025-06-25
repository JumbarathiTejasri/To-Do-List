const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// ✅ Create a new note (POST)
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
});

// ✅ Get all notes (GET)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

// ✅ Get a single note by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
});

// ✅ Update a note (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});

// ✅ Delete a note (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

// ✅ Toggle favorite status
router.put("/:id/favorite", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.isFavorite = !note.isFavorite; // Toggle the favorite status
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
