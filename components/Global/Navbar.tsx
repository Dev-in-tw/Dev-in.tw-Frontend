"use client";

//next.js
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

// component
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";

// hook
import { useUserAccount } from "@/hooks/useUserAccount";

export default function NavbarC() {
  const router = useRouter();
  const { userData, isLoading, isLogin, setIsLogin } = useUserAccount();

  function logout() {
    localStorage.clear();
    setIsLogin(false);
    router.replace("/");
  }

  return (
    <nav className="sticky top-0 z-40 flex h-16 w-full items-center justify-between px-6">
      <div className="flex items-center">
        <NextLink className="flex items-center gap-1" href="/">
          <Image src="/images/logo.png" width={40} height={40} alt="logo" />
        </NextLink>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/ZvwTZqXjYf"
            aria-label="Discord"
            target="_blank"
            rel="noreferrer"
            className="text-2xl"
          >
            <FaDiscord className="text-[#eeeeee] scale-y-125 scale-x-[1.175] mr-1" />
          </a>
          <a
            href="https://github.com/Dev-in-tw"
            aria-label="Github"
            target="_blank"
            rel="noreferrer"
            className="text-2xl"
          >
            <FaGithub className="text-[#eeeeee]" />
          </a>
        </div>
        <div>
          {isLoading ? (
            <Spinner className="size-8 text-[#eeeeee]" />
          ) : isLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="rounded-full outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar className="border-2 border-foreground/40">
                    <AvatarImage
                      src={userData?.avatar as string}
                      alt={userData?.name as string}
                    />
                    <AvatarFallback>
                      {(userData?.name as string)?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-56">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span className="font-semibold">您好，{userData?.name}</span>
                  <span className="font-semibold">
                    {userData?.primaryEmail}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/domain")}>
                  子網域設定
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={logout}>
                  登出
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="text-[1rem] rounded-full dark:text-[#eeeeee] dark:bg-[#292a2d] text-[#333333] bg-[#dddddd]"
              variant="secondary"
              onClick={() => router.replace("/login")}
            >
              登入
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
