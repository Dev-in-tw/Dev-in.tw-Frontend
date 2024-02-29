"use client";
import { Suspense } from "react";

// Components
import SearchInput from "@/components/Domain/SearchInput";
import ResultCard from "@/components/Find/ResultCard";

// Data
import { FakeRelatedDomains } from "@/data/fakeDomains";

// module
import { useSearchParams } from "next/navigation";

function Find() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("sub");

  return (
    <div className="py-5 flex gap-2 flex-col items-start">
      <SearchInput sub={domain} />
      <Suspense>
        <div className="w-full h-full mt-5">
          <ResultCard />
        </div>
        <h1 className="mt-4 font-bold text-2xl">相關結果</h1>
        {FakeRelatedDomains.map((item, index) => {
          return <ResultCard searchDomain={item} key={index} />;
        })}
      </Suspense>
    </div>
  );
}

export default Find;
