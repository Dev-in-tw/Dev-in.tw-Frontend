// module
import { useEffect, useState } from "react";
// api
import apiClient from "@/api";
// token helpers
import { clearToken, getToken } from "@/lib/authToken";
// type
import type { userType } from "@/types/userType";

export function useUserAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<userType | null>(null);
  const [token, setStateToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const _token = getToken();

      if (_token) {
        try {
          const _userData = await apiClient.user.info.get();
          setUserData(_userData.accountData);
          setStateToken(_token);
        } catch {
          clearToken();
          setUserData(null);
          setStateToken(null);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (token && userData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token, userData]);

  return { token, userData, isLoading, isLogin, setIsLogin };
}
