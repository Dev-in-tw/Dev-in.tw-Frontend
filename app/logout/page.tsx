"use client";

// module
import { useEffect } from "react";
import { redirect } from "next/navigation";

// hook
import { useUserAccount } from "@/hooks/useUserAccount";

export default function Logout() {
  const { setIsLogin } = useUserAccount();

  useEffect(() => {
    localStorage.clear();

    setIsLogin(false);

    const path = String(process.env.NEXT_PUBLIC_APP_URL);
    redirect(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
