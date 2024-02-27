"use client";

// icon
import { AiOutlineGlobal } from "react-icons/ai";
import { MdDns } from "react-icons/md";

export default function Domain() {
  return (
    <div className="w-full h-full py-6 select-none">
      <div className="h-full w-full flex mt-2 mb-4 bg-[#1a1a1a] rounded-2xl p-6 gap-6">
        <div className="w-4/12 text-left bg-[#111111] rounded-xl p-4">
          <div>
            <h1 className="text-[#aaaaaa]">Domain</h1>
            <div className="mt-2 flex flex-col gap-1">
              <button className="text-left hover:bg-[#333333] py-2 px-2.5 rounded-md flex">
                <AiOutlineGlobal className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                My Domain
              </button>
              <button className="text-left hover:bg-[#333333] py-2 px-2.5 rounded-md flex">
                <MdDns className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                DNS Record
              </button>
            </div>
          </div>
        </div>
        <div className="w-8/12 text-left bg-[#111111] rounded-xl p-3">
          <h1>Domain</h1>
        </div>
      </div>
    </div>
  );
}
