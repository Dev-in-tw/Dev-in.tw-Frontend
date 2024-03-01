"use client";

// component
import { Spinner } from "@nextui-org/react";

// module
import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";


export default function Callback() {
  const searchParams = useSearchParams();
  const _token = searchParams.get("token");
  const [token, setToken] = useLocalStorage<any>("token", null);

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken, token]);

  if (token !== null && token !== undefined) {
    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
  }

  return <Spinner size="lg" />;
}
