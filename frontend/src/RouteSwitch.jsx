import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./views/About";
import Colleges from "./views/Colleges";
import Home from "./views/Home";
import Housing from "./views/Housing";
import Jobs from "./views/Jobs";

const RouteSwitch = () => {
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

export default RouteSwitch;
