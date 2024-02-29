import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import { IconContext } from "react-icons";

type Props = {
  searchDomain?: string;
};

function ResultCard({ searchDomain }: Props) {
  const searchParams = useSearchParams();
  const domain = searchDomain ? searchDomain : searchParams.get("sub");
  if (domain) {
    return (
      <div className="w-full border border-neutral-600 rounded-lg p-3 flex  items-center justify-between">
        <div className="flex items-center gap-3">
          <IconContext.Provider value={{ color: "green" }}>
            <FaCircleCheck />
          </IconContext.Provider>
          <p className="text-2xl">
            {domain} <span className=" text-default-400">.dev-in.tw</span>
          </p>
        </div>
        <Button>申請</Button>
      </div>
    );
  } else {
    return (
      <div className="w-full border border-neutral-600 rounded-lg p-3 flex items-center mt-5 gap-3">
        <IconContext.Provider value={{ color: "red" }}>
          <FaX />
        </IconContext.Provider>
        <p className="text-2xl">請輸入子網域</p>
      </div>
    );
  }
}

export default ResultCard;
