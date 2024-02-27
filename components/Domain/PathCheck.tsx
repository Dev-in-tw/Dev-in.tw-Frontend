"use client";

import { usePathname } from "next/navigation";

export default function PathCheck(prop: any) {
  const pathname = usePathname();

  console.log(pathname, prop)

  if (pathname === prop) {
    return true;
  }
}