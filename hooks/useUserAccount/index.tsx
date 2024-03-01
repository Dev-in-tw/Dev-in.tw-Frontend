// type
import { userType } from "@/types/userType";

// module
import { useState, useEffect } from "react";

//api
import apiClient from "@/api";


export function useUserAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<userType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const _token = localStorage.getItem("token");

      if (_token) {
        setUserData(await apiClient.user.info.get(JSON.parse(_token)));
        setToken(JSON.parse(_token));
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (token && userData) {
        setIsLogin(true);
      }
    })();
  }, [token, userData, isLoading]);

  return { token, userData, isLoading, isLogin };
}
