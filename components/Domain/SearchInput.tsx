"use client";

import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Components
import { Input } from "@/components/ui/input";
// hook
import { useDomainCheck } from "@/hooks/useDomainCheck";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  sub?: string | null;
};

function SearchInput({ sub }: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(sub ?? "");
  const { status } = useDomainCheck(value);

  function submit(raw: string) {
    const next = raw.trim();
    if (!next) return;
    router.push(`/find?sub=${next}`);
  }

  return (
    <div className="group relative flex w-full items-center rounded-full bg-card/40 transition-shadow duration-300 focus-within:shadow-glow">
      <span className="pointer-events-none absolute left-5 z-10 text-sm text-muted-foreground">
        https://
      </span>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="yourname"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            submit(e.currentTarget.value);
          }
        }}
        className="h-14 rounded-full border-border/80 pl-[4.75rem] pr-32 text-base transition-colors focus-visible:border-brand/60"
      />
      <div className="pointer-events-none absolute right-5 z-10 flex items-center gap-2 text-sm">
        <StatusIndicator status={status} />
        <span className="font-mono text-muted-foreground">.dev-in.tw</span>
      </div>
    </div>
  );
}

function StatusIndicator({
  status
}: {
  status: ReturnType<typeof useDomainCheck>["status"];
}) {
  if (status === "checking") {
    return (
      <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
    );
  }
  if (status === "available") {
    return <Check className="size-4 shrink-0 text-success" />;
  }
  if (status === "taken" || status === "error") {
    return (
      <span
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          status === "taken" ? "bg-destructive" : "bg-warning"
        )}
      />
    );
  }
  return null;
}

export default SearchInput;
