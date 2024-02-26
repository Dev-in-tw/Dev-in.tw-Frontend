"use client";

//next.js
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// component
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import ThemeSwitch from "@/components/Global/ThemeSwitch";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";

// module


export default function NavbarC() {
  const router = useRouter();

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
        className="hidden sm:flex basis-1/5 sm:basis-full gap-5"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-3">
          <Link isExternal href="https://discord.gg/ZvwTZqXjYf" aria-label="Discord" target="_blank" className="text-2xl">
            <FaDiscord className="text-[#eeeeee] scale-y-125 scale-x-[1.175] mr-1" />
            {/* Discord's hight is not enough, so scale up and add margin right. */}
          </Link>
          <Link isExternal href="https://github.com/Dev-in-tw" aria-label="Github" target="_blank" className="text-2xl">
            <FaGithub className="text-[#eeeeee]" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-[1rem] rounded-full dark:text-[#eeeeee] dark:bg-[#292a2d] text-[#333333] bg-[#dddddd]"
            variant="flat"
            onClick={() => router.replace("/login")}
          >
            登入
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href="https://discord.gg/ZvwTZqXjYf" aria-label="Discord" target="_blank" className="text-2xl">
          <FaDiscord className="text-[#eeeeee] scale-y-125 scale-x-[1.175] mr-1" />
          {/* Discord's hight is not enough, so scale up and add margin right. */}
        </Link>
        <Link isExternal href="https://github.com/Dev-in-tw" aria-label="Github" target="_blank" className="text-2xl">
          <FaGithub className="text-[#e1e1e1]" />
        </Link>
        <ThemeSwitch />
        <NavbarItem className="md:hidden flex">
          <Button
            className="text-[1rem] rounded-full dark:text-[#eeeeee] dark:bg-[#292a2d] text-[#333333] bg-[#dddddd]"
            variant="flat"
            onClick={() => router.replace("/login")}
          >
            登入
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};