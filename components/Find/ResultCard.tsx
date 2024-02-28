import { useSearchParams } from "next/navigation";

function ResultCard() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("sub");
  if (domain) {
    return (
      <div className="w-full border border-neutral-600 rounded-lg px-3 flex flex-col items-start">
        <p className="text-2xl">
          {domain} <span>.dev-in.tw</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full border border-neutral-600 rounded-lg px-3 flex flex-col items-start">
        <p className="text-2xl">請輸入子網域</p>
      </div>
    );
  }
}

export default ResultCard;
