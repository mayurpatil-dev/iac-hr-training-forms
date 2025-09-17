import { useState, useEffect } from "react";

export function useHODAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authData = localStorage.getItem("hodAuth");
      if (authData) {
        const auth = JSON.parse(authData);
        if (auth.isAuthenticated) {
          setIsAuthenticated(true);
          setUserInfo(auth);
        } else {
          window.location.href = "/hod-login";
        }
      } else {
        window.location.href = "/hod-login";
      }
    } catch (error) {
      console.error("Failed to process auth data", error);
      window.location.href = "/hod-login";
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hodAuth");
    window.location.href = "/";
  };

  return { isAuthenticated, userInfo, isLoading, handleLogout };
}
