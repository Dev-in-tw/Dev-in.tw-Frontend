"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NextLink from "next/link";

import SearchInput from "@/components/Domain/SearchInput";
import { getFadeUp, staggerContainer } from "@/lib/motion";

export default function Home() {
  const reduced = useReducedMotion() ?? false;
  const item = getFadeUp(reduced);

  return (
    <div className="relative flex h-full w-full select-none flex-col">
      {/* hero 網格背景 */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_55%_at_50%_35%,black,transparent)]" />

      <AnimatePresence>
        <motion.div
          className="my-auto flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-success" />
            專為臺灣開發者打造的子網域平台
          </motion.span>

          <motion.h1
            variants={item}
            className="mb-4 bg-gradient-to-b from-foreground via-foreground to-brand bg-clip-text font-bold text-9xl text-transparent max-[400px]:text-5xl max-[500px]:text-6xl max-md:text-8xl max-sm:text-7xl"
          >
            DEV-IN.TW
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-8 max-w-2xl text-balance text-xl text-muted-foreground max-[400px]:text-base max-md:text-lg max-sm:text-base"
          >
            還在為沒有網域架設自己的網站而煩惱嗎?
            <span className="max-lg:hidden">&nbsp;</span>
            <br className="lg:hidden" />
            立即註冊您的個人子網域吧!
          </motion.p>

          <motion.div variants={item} className="w-full max-w-2xl">
            <SearchInput />
          </motion.div>

          <motion.div variants={item} className="mt-7 flex items-center gap-4">
            <NextLink
              href="/domain"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              管理我的子網域
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </NextLink>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
