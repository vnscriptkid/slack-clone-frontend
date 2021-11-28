import decode from "jwt-decode";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const { user } = decode(token);
      decode(refreshToken);

      setIsAuth(true);
      setCurrentUser(user);
    } catch (err) {
      setIsAuth(false);
      setCurrentUser(null);
    }
  }, []);

  return { isAuth, currentUser };
};

export default useAuth;
