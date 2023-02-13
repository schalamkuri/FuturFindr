import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./Views/About";
import Colleges from "./Views/Colleges";
import Home from "./Views/Home";
import Housing from "./Views/Housing";
import Jobs from "./Views/Jobs";

const Route = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/housing" element={<Housing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Route;
