import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTeam from "./CreateTeam";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const SwitchRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-team" element={<CreateTeam />} />
    </Routes>
  </BrowserRouter>
);

export default SwitchRoutes;
