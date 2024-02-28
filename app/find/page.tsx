"use client";
import { Suspense } from "react";

// Components
import SearchInput from "@/components/Domain/SearchInput";
import ResultCard from "@/components/Find/ResultCard";

function Find() {
  return (
    <div className="py-5 flex gap-2 flex-col">
      <SearchInput></SearchInput>
      <Suspense>
        <ResultCard></ResultCard>
      </Suspense>
    </div>
  );
}

export default Find;
