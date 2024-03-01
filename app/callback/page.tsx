"use client";

// component
import { Spinner } from "@nextui-org/react";

// module
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _token = searchParams.get("token");
  const [token, setToken] = useLocalStorage<any>("token", null);

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken, token]);

  if (token !== null && token !== undefined) {
    router.push("/");
  }

  return <Spinner size="lg" />;
}
