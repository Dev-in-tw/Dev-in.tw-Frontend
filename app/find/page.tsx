"use client";

// module
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Components
import SearchInput from "@/components/Domain/SearchInput";
import ResultCard from "@/components/Find/ResultCard";

function FindContent() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("sub");

  return (
    <div className="py-5 flex gap-2 flex-col items-start">
      <SearchInput sub={domain} />
      <div className="w-full h-full mt-5">
        <ResultCard domain={domain} />
      </div>
    </div>
  );
}

export default function Find() {
  return (
    <Suspense>
      <FindContent />
    </Suspense>
  );
}
