import React, { useEffect, useState } from "react";
import { getNotes, updateNote, deleteNote, toggleFavorite } from "../services/api";
import { formatDistanceToNow } from "date-fns";
import "./NotesList.css"; // Ensure CSS file is linked

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let data = await getNotes();
        // Sort notes by timestamp (newest first)
        data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (note) => {
    setEditingNote(note._id);
    setEditText(note.content);
  };

  // ✅ Handle Update
  const handleUpdate = async () => {
    try {
      const updatedNote = await updateNote(editingNote, { content: editText });
      setNotes(notes.map((note) => (note._id === editingNote ? updatedNote : note)));
      setEditingNote(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // ✅ Handle favorite toggle
  const handleToggleFavorite = async (id) => {
    try {
      const updatedNote = await toggleFavorite(id);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, isFavorite: updatedNote.isFavorite } : note
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      {notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note._id} className="note-card">
              <div className="note-header">
                <strong>{note.title}</strong>
                <span className="timestamp">
                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </span>
                <button
                  className={`favorite-btn ${note.isFavorite ? "favorited" : ""}`}
                  onClick={() => handleToggleFavorite(note._id)}
                >
                  {note.isFavorite ? "★ Unfavorite" : "☆ Favorite"}
                </button>
              </div>
              {editingNote === note._id ? (
                <div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="save-btn" onClick={handleUpdate}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{note.content}</p>
                  <button className="edit-btn" onClick={() => handleEdit(note)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(note._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

export default NotesList;
