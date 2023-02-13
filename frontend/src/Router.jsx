import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Home";
import About from "./Views/About";
import Colleges from "./Views/Colleges";
import Jobs from "./Views/Jobs";
import Housing from "./Views/Housing";

const Router = () => {
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

export default Router;
