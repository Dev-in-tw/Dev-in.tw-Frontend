"use client";

// component
import { Spinner } from "@nextui-org/react";

// module
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";


export default function Callback({ params }: { params: { token: string } },) {
  const [token, setToken] = useLocalStorage<any>('token', null)

  useEffect(() => {
    setToken(params.token.replace(/"/g, ""));
  }, [params, setToken]);

  if (token !== null && token !== undefined) {
    redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}`,
    );
  }

  return <Spinner size="lg" />;
}