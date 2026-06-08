import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/user");
      setUser(res.data);
    } catch (error) {
      console.error("Failed to check user:", error.message);
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const initCheckUser = async () => {
      if (isMounted) {
        await checkUser();
      }
    };

    initCheckUser();
    
    return () => {
      isMounted = false;
    };
  }, [checkUser]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, checkUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);