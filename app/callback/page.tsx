"use client";

// module
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

// component
import { Spinner } from "@/components/ui/spinner";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _token = searchParams.get("token");
  const [token, setToken] = useLocalStorage<string | null>("token", null);

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  useEffect(() => {
    if (token !== null && token !== undefined) {
      router.push("/");
    }
  }, [token, router]);

  return <Spinner className="size-10" />;
}

export default function Callback() {
  return (
    <Suspense fallback={<Spinner className="size-10" />}>
      <CallbackContent />
    </Suspense>
  );
}
