"use client";

// module
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

function LoginCard() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="glass flex flex-col items-center gap-5 rounded-2xl px-12 py-10 shadow-glow">
        <div className="relative flex size-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand/20" />
          <span className="absolute inset-0 rounded-full bg-brand/10" />
          <Loader2 className="size-8 animate-spin text-brand" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-lg font-semibold">登入中…</p>
          <p className="text-sm text-muted-foreground">
            正在驗證您的身分，請稍候
          </p>
        </div>
      </div>
    </div>
  );
}

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

  return <LoginCard />;
}

export default function Callback() {
  return (
    <Suspense fallback={<LoginCard />}>
      <CallbackContent />
    </Suspense>
  );
}
