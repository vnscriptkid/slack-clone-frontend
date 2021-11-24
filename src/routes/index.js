import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import decode from "jwt-decode";
import CreateTeam from "./CreateTeam";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ViewTeam from "./ViewTeam";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

const SwitchRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/view-team" element={<ViewTeam />} />
      <Route
        path="/create-team"
        element={
          <PrivateRoute>
            <CreateTeam />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default SwitchRoutes;
