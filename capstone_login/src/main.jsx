import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./SignUp";
import "./App.css";
import "./signup.css";


function Root() {
  return (
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/login" element={<App />} />

      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>,
)