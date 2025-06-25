import axios from "axios";

const API_URL = "http://localhost:5000/api/notes"; // Ensure this matches your backend

export const getNotes = async () => {  // ✅ Changed `fetchNotes` to `getNotes` if needed
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};


// ✅ Update Note
export const updateNote = async (id, updatedNote) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedNote);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

// ✅ Delete Note
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};


// ✅ Toggle favorite status
export const toggleFavorite = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/favorite`);
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

