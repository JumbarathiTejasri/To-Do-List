import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotesList from "./pages/NotesList";
import CreateNote from "./pages/CreateNote";
import Navbar from "./components/Navbar"; // ✅ Importing Navbar
import "./App.css";


const App = () => {
  return (
    <Router>
      <Navbar /> 
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
