"use client";

// icon
import { AiOutlineGlobal } from "react-icons/ai";
import { MdDns } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaServer } from "react-icons/fa";

// module
import { Card } from "@nextui-org/react";

// component
import PathCheck from "@/components/Domain/PathCheck";


export default function DomainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full select-none flex">
      <div className="w-full h-full py-6 my-auto max-h-[50rem]">
        <Card className="w-full h-full rounded-[1.5rem] flex flex-row">
          <div className="w-3/12 text-left rounded-xl p-4">
            <h1 className="text-white font-extrabold text-3xl text-center">
              DEV-IN.TW
            </h1>
            <div className="flex flex-col gap-2 mt-5">
              <button
                className={
                  "text-center hover:bg-[#333333] py-2 px-2.5 rounded-md flex " +
                  (PathCheck("/domain") && "bg-[#333333]")
                }
              >
                <AiOutlineGlobal className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                我的子網域
              </button>
              <button
                className={
                  "text-left hover:bg-[#333333] py-2 px-2.5 rounded-md flex " +
                  (PathCheck("/domain/dns") && "bg-[#333333]")
                }
              >
                <MdDns className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                DNS 設定 (開發中)
              </button>
              <button
                className={
                  "text-center hover:bg-[#333333] py-2 px-2.5 rounded-md flex " +
                  (PathCheck("/domain/ssl") && "bg-[#333333]")
                }
              >
                <MdLock className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                網站憑證 (開發中)
              </button>
              <button
                className={
                  "text-center hover:bg-[#333333] py-2 px-2.5 rounded-md flex " +
                  (PathCheck("/domain/extension") && "bg-[#333333]")
                }
              >
                <IoExtensionPuzzle className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                擴充元件 (開發中)
              </button>
              <hr className="my-1 border-[#5a5a5a]" />
              <button
                className={
                  "text-center hover:bg-[#333333] py-2 px-2.5 rounded-md flex " +
                  (PathCheck("/domain/server") && "bg-[#333333]")
                }
              >
                <FaServer className="my-auto mr-2 w-6 h-6 text-[#5a5a5a]" />
                租用伺服器 (開發中)
              </button>
            </div>
          </div>
          <div className="w-9/12 text-left bg-[#111111] rounded-xl rounded-l-none p-3 overflow-hidden">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}
