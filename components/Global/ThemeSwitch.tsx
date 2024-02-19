// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// component
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <button className="text-2xl" onClick={() => setTheme('light')}><FaSun /></button>

  return (
    theme === "dark" ?
      <button className="text-2xl text-[#e1e1e1]" onClick={() => setTheme('light')}><FaSun /></button>
      :
      <button className="text-2xl text-[#e1e1e1]" onClick={() => setTheme('dark')}><FaMoon /></button>
  )
};