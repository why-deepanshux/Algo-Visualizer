import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AlgoVisualizer from "./pages/AlgoVisualizer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algovisualizer" element={<AlgoVisualizer />} />
      </Routes>
    </div>
  );
}

export default App;
