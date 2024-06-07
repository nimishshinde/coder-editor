import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, EditorPage } from "./Pages";
import "./styles/index.css";
import "./styles/app.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
