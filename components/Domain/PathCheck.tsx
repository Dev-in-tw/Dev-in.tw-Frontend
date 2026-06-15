"use client";

import { usePathname } from "next/navigation";

export default function PathCheck(path: string): boolean {
  const pathname = usePathname();
  return pathname === path;
}
