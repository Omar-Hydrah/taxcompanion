import NotFound from "./NotFound";
import Tax from "./Tax";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Component } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tax />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
