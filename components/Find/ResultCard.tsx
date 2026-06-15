"use client";

// module
import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// component
import ApplyDomainDialog from "@/components/Domain/ApplyDomainDialog";
import { Button } from "@/components/ui/button";
// hook
import { useDomainCheck } from "@/hooks/useDomainCheck";
import { useUserAccount } from "@/hooks/useUserAccount";
import { getFadeUp } from "@/lib/motion";

type ResultCardProps = {
  domain: string | null;
};

export default function ResultCard({ domain }: ResultCardProps) {
  const router = useRouter();
  const reduced = useReducedMotion() ?? false;
  const { isLogin } = useUserAccount();
  const { status, reason } = useDomainCheck(domain);
  const [applyOpen, setApplyOpen] = useState(false);

  if (!domain) {
    return (
      <div className="glass flex w-full items-center justify-center rounded-xl px-4 py-8">
        <p className="text-xl text-muted-foreground">請輸入子網域</p>
      </div>
    );
  }

  function handleApply() {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    setApplyOpen(true);
  }

  const isAvailable = status === "available";
  const isChecking = status === "checking" || status === "idle";

  return (
    <>
      <motion.div
        variants={getFadeUp(reduced)}
        initial="hidden"
        animate="show"
        className="glass flex w-full items-center justify-between gap-3 rounded-xl p-5 shadow-glow"
      >
        <div className="flex min-w-0 items-center gap-3">
          {isChecking ? (
            <Loader2 className="size-6 shrink-0 animate-spin text-muted-foreground" />
          ) : isAvailable ? (
            <CircleCheck className="size-6 shrink-0 text-success" />
          ) : (
            <CircleX className="size-6 shrink-0 text-destructive" />
          )}
          <div className="min-w-0">
            <p
              className={
                isAvailable || isChecking
                  ? "truncate text-2xl"
                  : "truncate text-2xl text-muted-foreground"
              }
            >
              <span className="font-mono font-semibold">{domain}</span>
              <span className="text-muted-foreground">.dev-in.tw</span>
            </p>
            {isAvailable ? (
              <p className="text-sm text-success">恭喜！這個子網域可以申請</p>
            ) : !isChecking ? (
              <p className="text-sm text-destructive">{reason ?? "已被註冊"}</p>
            ) : (
              <p className="text-sm text-muted-foreground">檢查可用性中…</p>
            )}
          </div>
        </div>
        <Button
          onClick={handleApply}
          disabled={!isAvailable}
          className="shrink-0 bg-gradient-to-r from-brand to-brand/80 text-brand-foreground transition-all hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 disabled:translate-y-0 disabled:from-muted disabled:to-muted disabled:text-muted-foreground"
        >
          申請
        </Button>
      </motion.div>
      <ApplyDomainDialog
        open={applyOpen}
        onOpenChange={setApplyOpen}
        name={domain}
      />
    </>
  );
}
