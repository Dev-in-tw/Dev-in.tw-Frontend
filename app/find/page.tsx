"use client";
import { Suspense } from "react";

// Components
import SearchInput from "@/components/Domain/SearchInput";
import ResultCard from "@/components/Find/ResultCard";

// Data
import { FakeRelatedDomains } from "@/data/fakeDomains";

function Find() {
  return (
    <div className="py-5 flex gap-2 flex-col items-start">
      <SearchInput></SearchInput>
      <Suspense>
        <ResultCard></ResultCard>
        <h1 className="mt-4 font-bold text-2xl">相關結果</h1>
        {FakeRelatedDomains.map((item, index) => {
          return <ResultCard searchDomain={item} key={index}></ResultCard>;
        })}
      </Suspense>
    </div>
  );
}

export default Find;
