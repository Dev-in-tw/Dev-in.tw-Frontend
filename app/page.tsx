"use client";

import SearchInput from "@/components/Domain/SearchInput";


export default function Home() {
  return (
    <div className="my-auto flex flex-col h-full w-full select-none">
      <div className="my-auto">
        {/* <div className="p-10 w-6/12 flex flex-col my-auto pr-0">
          <p className="font-bold text-5xl leading-[1.1]"><span className="text-primary-500">Dev-in.tw</span><br />專為臺灣<span className="text-green-500">開發者</span><br />開發的子網域平台</p>
          <p className="mt-2 text-[#a1a1a1]">解決沒有子網域的煩惱，幫助開發者構成網站。</p>
        </div>
        <div className="w-6/12 p-10 flex flex-col gap-4 my-auto pl-0">
          <p className="text-4xl font-bold">立即註冊子網域</p>
          <SearchInput />
        </div> */}
        <h1 className="font-bold mb-3 text-9xl max-md:text-8xl max-sm:text-7xl max-[500px]:text-6xl max-[400px]:text-5xl">DEV-IN.TW</h1>
        <p className="font-bold mb-3 text-2xl max-md:text-xl max-sm:text-lg max-[400px]:text-base">還在為沒有網域架設自己的網站而煩惱嗎?<span className="max-lg:hidden">&nbsp;</span><br className="lg:hidden" />立即註冊您的個人子網域吧!</p>
        <SearchInput />
      </div>
    </div>
  );
}
