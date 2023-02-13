import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./Views/about";
import Colleges from "./Views/colleges";
import Home from "./Views/home";
import Housing from "./Views/housing";
import Jobs from "./Views/jobs";

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
