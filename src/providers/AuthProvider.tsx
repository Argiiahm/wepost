import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMe = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMe(null);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMe(null);
        return;
      }

      setMe(data);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ me, loading, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
