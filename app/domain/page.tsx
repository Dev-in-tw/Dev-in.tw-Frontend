"use client";

// module
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Globe, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// component
import ConfirmDialog from "@/components/Global/ConfirmDialog";
import EmptyState from "@/components/Global/EmptyState";
import PageHeader from "@/components/Global/PageHeader";
import StatusBadge from "@/components/Global/StatusBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
// hook
import { useDomains } from "@/hooks/useDomains";
import { getFadeUp } from "@/lib/motion";
// type
import type { domainType } from "@/types/domainType";

export default function Domain() {
  const router = useRouter();
  const reduced = useReducedMotion() ?? false;
  const { domains, isLoading, remove } = useDomains();
  const [pendingDelete, setPendingDelete] = useState<domainType | null>(null);

  function visit(name: string) {
    window.open(`https://${name}.dev-in.tw`, "_blank", "noopener,noreferrer");
  }

  function editDns(id: string) {
    router.push(`/domain/dns?domain=${id}`);
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    try {
      await remove(pendingDelete._id);
      toast.success(`${pendingDelete.name}.dev-in.tw 已刪除`);
    } catch {
      toast.error("刪除失敗，請稍後再試");
    } finally {
      setPendingDelete(null);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3 p-2">
        <Skeleton className="mb-6 h-8 w-48" />
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (domains.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <EmptyState
          icon={Globe}
          title="你還沒有任何子網域"
          description="搜尋並申請一個專屬於你的 .dev-in.tw 子網域。"
          action={
            <Button
              onClick={() => router.push("/find")}
              className="bg-brand text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-glow"
            >
              <Plus className="size-4" />
              去申請子網域
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-5 p-2"
      variants={getFadeUp(reduced)}
      initial="hidden"
      animate="show"
    >
      <PageHeader
        title="我的子網域"
        description={`你目前擁有 ${domains.length} 個子網域。`}
        action={
          <Button
            onClick={() => router.push("/find")}
            className="bg-brand text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-glow"
          >
            <Plus className="size-4" />
            申請子網域
          </Button>
        }
      />
      <Table className="max-h-[42rem] overflow-y-auto">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-4/12 text-[1.1rem]">子網域</TableHead>
            <TableHead className="w-4/12 text-center text-[1.1rem]">
              狀態
            </TableHead>
            <TableHead className="w-4/12 text-center text-[1.1rem]">
              動作
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((item) => (
            <TableRow
              key={item._id}
              className="transition-colors hover:bg-accent/40"
            >
              <TableCell className="font-mono text-lg font-bold">
                {item.name}
                <span className="text-muted-foreground">.dev-in.tw</span>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <StatusBadge status={item.status} />
                </div>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center justify-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="訪問子網域"
                        onClick={() => visit(item.name)}
                        className="text-muted-foreground transition-colors hover:text-foreground active:opacity-50"
                      >
                        <Eye className="size-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>訪問子網域</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="管理 DNS"
                        onClick={() => editDns(item._id)}
                        className="text-muted-foreground transition-colors hover:text-brand active:opacity-50"
                      >
                        <Pencil className="size-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>管理 DNS</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label="刪除子網域"
                        onClick={() => setPendingDelete(item)}
                        className="text-destructive transition-opacity hover:opacity-80 active:opacity-50"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-destructive text-white">
                      刪除子網域
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="確定要刪除這個子網域？"
        description={
          pendingDelete
            ? `${pendingDelete.name}.dev-in.tw 及其 DNS 記錄將一併刪除，此動作無法復原。`
            : undefined
        }
        confirmLabel="刪除"
        destructive
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}
