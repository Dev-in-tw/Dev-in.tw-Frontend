import type { Variants } from "framer-motion";

// 共用進場動畫變體（fade + 上移）。
// 在 "use client" 元件搭配 framer-motion 使用；
// 透過 useReducedMotion() 在偏好減少動態時改用「無位移」版本。

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } }
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 }
  }
};

export function getFadeUp(reduced: boolean): Variants {
  return reduced ? fadeUpReduced : fadeUp;
}
