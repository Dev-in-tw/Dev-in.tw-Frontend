"use client";

// module
import NextLink from "next/link";
import { usePathname } from "next/navigation";
// icon
import { AiOutlineGlobal } from "react-icons/ai";
import { FaServer } from "react-icons/fa";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdDns, MdLock } from "react-icons/md";
// component
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/domain", label: "我的子網域", icon: AiOutlineGlobal, exact: true },
  { href: "/domain/dns", label: "DNS 設定", icon: MdDns, exact: false }
];

export default function DomainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="flex h-full select-none">
      <div className="my-auto h-full max-h-[50rem] w-full py-6">
        <Card className="glass flex h-full w-full flex-row gap-0 overflow-hidden rounded-[1.5rem] py-0 shadow-glow">
          <div className="w-3/12 rounded-xl p-4 text-left">
            <h1 className="text-center font-mono text-2xl font-extrabold tracking-tight">
              DEV-IN
              <span className="text-brand">.TW</span>
            </h1>
            <div className="mt-5 flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center rounded-md py-2 px-2.5 text-left transition-colors",
                      active
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    {active ? (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand" />
                    ) : null}
                    <Icon
                      className={cn(
                        "my-auto mr-2 h-6 w-6 transition-colors",
                        active ? "text-brand" : "text-muted-foreground"
                      )}
                    />
                    {item.label}
                  </NextLink>
                );
              })}
              <button
                type="button"
                disabled
                className="flex cursor-not-allowed items-center rounded-md py-2 px-2.5 text-left text-muted-foreground opacity-50"
              >
                <MdLock className="my-auto mr-2 h-6 w-6 text-muted-foreground" />
                網站憑證 (開發中)
              </button>
              <button
                type="button"
                disabled
                className="flex cursor-not-allowed items-center rounded-md py-2 px-2.5 text-left text-muted-foreground opacity-50"
              >
                <IoExtensionPuzzle className="my-auto mr-2 h-6 w-6 text-muted-foreground" />
                擴充元件 (開發中)
              </button>
              <hr className="my-1 border-border" />
              <button
                type="button"
                disabled
                className="flex cursor-not-allowed items-center rounded-md py-2 px-2.5 text-left text-muted-foreground opacity-50"
              >
                <FaServer className="my-auto mr-2 h-6 w-6 text-muted-foreground" />
                租用伺服器 (開發中)
              </button>
            </div>
          </div>
          <div className="w-9/12 overflow-hidden rounded-xl rounded-l-none border-l border-border bg-card/40 p-3 text-left backdrop-blur-sm">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}
