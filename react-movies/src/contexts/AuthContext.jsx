// contexts/AuthContext.jsx
import { useState, createContext, useEffect, useContext } from "react";
import { login, signup, getUserProfile } from "../api/tmdb-api";

export const AuthContext = createContext(null);

// Add useAuth hook for easier access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const existingUsername = localStorage.getItem("username");
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState(existingUsername || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUsername = localStorage.getItem('username');
      
      if (savedToken && savedUsername) {
        try {
          const response = await getUserProfile(savedUsername);
          if (response.success) {
            setIsAuthenticated(true);
            setUserName(savedUsername);
            setUser(response.user);
            setAuthToken(savedToken);
          } else {
            clearAuth();
          }
        } catch (error) {
          clearAuth();
        }
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
    setUser(null);
  };

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    try {
      const result = await login(username, password);
      
      if (result.success && result.token) {
        setToken(result.token);
        setIsAuthenticated(true);
        setUserName(username);
        setUser(result.user);
        localStorage.setItem("username", username);
      
        return { success: true };
      } else {
        return { success: false, message: result.msg || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const register = async (formData) => {
    try {
      const result = await signup(formData);
      return { success: result.success, message: result.msg };
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const signout = () => {
    clearAuth();
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        user,
        loading,
        updateUser,
        authToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;