import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionCard({ children, className }: SectionCardProps) {
  return (
    <div
      className={cn("glass rounded-xl p-6 shadow-glow text-left", className)}
    >
      {children}
    </div>
  );
}
