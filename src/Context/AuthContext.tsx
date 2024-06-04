// AuthContext.tsx

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, stayLoggedIn: boolean) => void;
  logout: () => void;
  loggedInUsers: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedInUsers, setLoggedInUsers] = useState<number>(0);
  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      setLoggedInUsers((prevCount) => prevCount + 1);
    }
    setIsAuthInitialized(true); // Mark authentication check as complete
  }, []);

  const login = (token: string, stayLoggedIn: boolean) => {
    if (loggedInUsers < 1000) {
      setIsAuthenticated(true);
      if (stayLoggedIn) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }
      setLoggedInUsers((prevCount) => prevCount + 1);
    } else {
      console.log("Maximum number of users reached. Cannot login.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setLoggedInUsers((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Ensure loggedInUsers does not go negative
  };

  if (!isAuthInitialized) {
    return null; // Render nothing or a loading spinner until auth state is initialized
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loggedInUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
