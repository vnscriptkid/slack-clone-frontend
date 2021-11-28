import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateTeam from "./CreateTeam";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ViewTeam from "./ViewTeam";
import useAuth from "../useAuth";

function PrivateRoute({ children }) {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
}

const SwitchRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/view-team/:teamId/:channelId" element={<ViewTeam />} />
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
