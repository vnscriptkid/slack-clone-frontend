import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";

const SwitchRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default SwitchRoutes;
