"use client";

// module
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// hook
import { useUserAccount } from "@/hooks/useUserAccount";

export default function Callback() {
  const { setIsLogin } = useUserAccount();

  useEffect(() => {
    localStorage.removeItem("token");
    setIsLogin(false);
  }, [setIsLogin]);

  redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
}
