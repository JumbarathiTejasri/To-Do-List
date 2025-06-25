import React, { useState } from "react";
import { createNote } from "../services/api";
import "./CreateNote.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ title, content });
    setTitle("");
    setContent("");
    setSuccessMessage("Note created successfully!"); // ✅ Set success message

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="create-note-container"> {/* ✅ Added class */}
      <h2>Create Note</h2>
      <form className="create-note-form" onSubmit={handleSubmit}> {/* ✅ Added class */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      {/* ✅ Success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default CreateNote;
