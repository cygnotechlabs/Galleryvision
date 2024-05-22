import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
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

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      setLoggedInUsers((prevCount) => prevCount + 1); // Increment logged-in users count on init if token exists
    }
  }, []);

  const login = (token: string, stayLoggedIn: boolean) => {
    if (loggedInUsers < 5) {
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
    setLoggedInUsers((prevCount) => prevCount - 1);
  };

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
