import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./Views/about";
import Colleges from "./Views/colleges";
import Home from "./Views/home";
import Housing from "./Views/housing";
import Jobs from "./Views/jobs";
import JobsInstance from "./Views/JobsInstance";
import HousingInstance from "./Views/HousingInstance";
import CollegeInstance from "./Views/CollegeInstance";
import Search from "./Views/Search"
import Visualizations from "./Views/visualizations";


// Code is based off of geojobs routeswitch
// https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/src/RouteSwitch.jsx

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/colleges" element={<Colleges/>} />
        <Route path="/colleges/:id" element={<CollegeInstance/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/visualizations" element={<Visualizations/>} />
        <Route path="/jobs/:id" element={<JobsInstance/>} />
        <Route path="/housing" element={<Housing/>} />
        <Route path="/housing/:id" element={<HousingInstance/>} />
        <Route path="/search/:query" element={<Search />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
