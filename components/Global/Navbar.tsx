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
// token helpers
import { clearToken } from "@/lib/authToken";

export default function NavbarC() {
  const router = useRouter();
  const { userData, isLoading, isLogin, setIsLogin } = useUserAccount();

  function logout() {
    clearToken();
    setIsLogin(false);
    router.replace("/");
  }

  return (
    <nav className="glass sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border px-6 backdrop-blur-xl">
      <NextLink
        className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        href="/"
      >
        <Image
          src="/images/logo.png"
          width={36}
          height={36}
          alt="logo"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <span className="hidden font-mono text-lg font-bold tracking-tight sm:inline">
          DEV-IN
          <span className="text-brand">.TW</span>
        </span>
      </NextLink>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/ZvwTZqXjYf"
            aria-label="Discord"
            target="_blank"
            rel="noreferrer"
            className="text-2xl text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaDiscord className="mr-1 scale-x-[1.175] scale-y-125" />
          </a>
          <a
            href="https://github.com/Dev-in-tw"
            aria-label="Github"
            target="_blank"
            rel="noreferrer"
            className="text-2xl text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaGithub />
          </a>
        </div>
        <div>
          {isLoading ? (
            <Spinner className="size-8 text-muted-foreground" />
          ) : isLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="rounded-full outline-none transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar className="border-2 border-brand/40 transition-colors hover:border-brand/70">
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
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {userData?.primaryEmail}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/domain")}>
                  我的子網域
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/domain/dns")}>
                  DNS 設定
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logout}>
                  登出
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="rounded-full bg-brand text-[1rem] text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-glow"
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
