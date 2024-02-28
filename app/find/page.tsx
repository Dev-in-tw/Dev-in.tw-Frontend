"use client";

import { useSearchParams } from "next/navigation";

// Components
import SearchInput from "@/components/Domain/SearchInput";
import ResultCard from "@/components/Find/ResultCard";

function Find() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("sub");
  return (
    <div className="py-5 flex gap-2 flex-col">
      <SearchInput></SearchInput>
      <ResultCard searchDomain={domain ? domain : ""}></ResultCard>
    </div>
  );
}

export default Find;
