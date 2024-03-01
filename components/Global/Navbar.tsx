"use client";

//next.js
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

// component
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
// import ThemeSwitch from "@/components/Global/ThemeSwitch";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from "@nextui-org/navbar";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner
} from "@nextui-org/react";

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
    <NextUINavbar position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="flex basis-1/5 sm:basis-full gap-5"
        justify="end"
      >
        <NavbarItem className="flex gap-3">
          <Link
            isExternal
            href="https://discord.gg/ZvwTZqXjYf"
            aria-label="Discord"
            target="_blank"
            className="text-2xl"
          >
            <FaDiscord className="text-[#eeeeee] scale-y-125 scale-x-[1.175] mr-1" />
            {/* Discord's hight is not enough, so scale up and add margin right. */}
          </Link>
          <Link
            isExternal
            href="https://github.com/Dev-in-tw"
            aria-label="Github"
            target="_blank"
            className="text-2xl"
          >
            <FaGithub className="text-[#eeeeee]" />
          </Link>
          {/* <ThemeSwitch /> */}
          {/* No need to show the theme switcher in the navbar in first release. */}
        </NavbarItem>
        <NavbarItem>
          {isLoading ? (
            <Spinner color="default" size="lg" />
          ) : isLogin ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="default"
                  name={userData?.name as string}
                  size="sm"
                  src={userData?.avatar as string}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">您好，{userData?.name}</p>
                  <p className="font-semibold">{userData?.primaryEmail}</p>
                </DropdownItem>
                <DropdownItem
                  key="domain"
                  onClick={() => router.push("/domain")}
                >
                  子網域設定
                </DropdownItem>
                <DropdownItem key="logout" onClick={logout} color="danger">
                  登出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              className="text-[1rem] rounded-full dark:text-[#eeeeee] dark:bg-[#292a2d] text-[#333333] bg-[#dddddd]"
              variant="flat"
              onClick={() => router.replace("/login")}
            >
              登入
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
