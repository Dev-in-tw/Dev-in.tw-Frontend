"use client";

import { useRouter } from "next/navigation";

// Components
import { Input } from "@/components/ui/input";

function SearchInput(prop: any) {
  const router = useRouter();

  return (
    <div className="relative flex w-full items-center">
      <span className="pointer-events-none absolute left-4 z-10 text-sm text-muted-foreground">
        https://
      </span>
      <Input
        type="url"
        defaultValue={prop.sub || ""}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            router.push(`/find?sub=${e.currentTarget.value}`);
          }
        }}
        className="h-12 rounded-full pl-[4.5rem] pr-24 text-base"
      />
      <span className="pointer-events-none absolute right-5 z-10 text-sm text-muted-foreground">
        .dev-in.tw
      </span>
    </div>
  );
}

export default SearchInput;
