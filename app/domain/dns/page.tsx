"use client";

// module
import { Globe, Pencil, Plus, Server, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
// component
import DnsRecordDialog from "@/components/Domain/DnsRecordDialog";
import ConfirmDialog from "@/components/Global/ConfirmDialog";
import EmptyState from "@/components/Global/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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
import { useDnsRecords } from "@/hooks/useDnsRecords";
import { useDomains } from "@/hooks/useDomains";
// type
import type { dnsRecordType } from "@/types/dnsType";

function Records({ domainId }: { domainId: string }) {
  const { records, isLoading, create, update, remove } =
    useDnsRecords(domainId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<dnsRecordType | null>(null);
  const [pendingDelete, setPendingDelete] = useState<dnsRecordType | null>(
    null
  );

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(record: dnsRecordType) {
    setEditing(record);
    setDialogOpen(true);
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    try {
      await remove(pendingDelete.id);
      toast.success("DNS 記錄已刪除");
    } catch {
      toast.error("刪除失敗，請稍後再試");
    } finally {
      setPendingDelete(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          共 {records.length} 筆記錄 · 變更即時同步到 Cloudflare
        </p>
        <Button
          onClick={openCreate}
          className="bg-brand text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-glow"
        >
          <Plus className="size-4" />
          新增記錄
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon={Server}
          title="尚無 DNS 記錄"
          description="新增第一筆記錄，把子網域指向你的伺服器。"
          action={
            <Button
              onClick={openCreate}
              className="bg-brand text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-glow"
            >
              <Plus className="size-4" />
              新增記錄
            </Button>
          }
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>類型</TableHead>
              <TableHead>名稱</TableHead>
              <TableHead>內容</TableHead>
              <TableHead>TTL</TableHead>
              <TableHead className="text-center">動作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.id}
                className="transition-colors hover:bg-accent/40"
              >
                <TableCell>
                  <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-xs text-brand">
                    {record.type}
                  </span>
                </TableCell>
                <TableCell className="font-mono">{record.name}</TableCell>
                <TableCell className="font-mono break-all">
                  {record.content}
                </TableCell>
                <TableCell>{record.ttl === 1 ? "自動" : record.ttl}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label="編輯記錄"
                          onClick={() => openEdit(record)}
                          className="text-muted-foreground transition-colors hover:text-foreground active:opacity-50"
                        >
                          <Pencil className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>編輯</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label="刪除記錄"
                          onClick={() => setPendingDelete(record)}
                          className="text-destructive transition-opacity hover:opacity-80 active:opacity-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-destructive text-white">
                        刪除
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <DnsRecordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        record={editing}
        onCreate={create}
        onUpdate={update}
      />
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="確定要刪除這筆 DNS 記錄？"
        description={
          pendingDelete
            ? `${pendingDelete.type} ${pendingDelete.name} 將從 Cloudflare 移除，此動作無法復原。`
            : undefined
        }
        confirmLabel="刪除"
        destructive
        onConfirm={handleDelete}
      />
    </div>
  );
}

function DnsContent() {
  const searchParams = useSearchParams();
  const { domains, isLoading } = useDomains();
  const [selected, setSelected] = useState("");

  // 預設選第一個子網域;若網址帶了有效的 ?domain= 則用它(無效/undefined 就退回第一個)
  useEffect(() => {
    if (selected || domains.length === 0) return;
    const fromUrl = searchParams.get("domain");
    const valid = domains.some((item) => item._id === fromUrl);
    setSelected(valid ? (fromUrl as string) : domains[0]._id);
  }, [domains, selected, searchParams]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    );
  }

  if (domains.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <EmptyState
          icon={Globe}
          title="你還沒有任何子網域"
          description="先申請一個子網域，才能管理它的 DNS 記錄。"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">DNS 設定</h1>
          <p className="text-sm text-muted-foreground">
            選擇子網域，管理它的 DNS 記錄。
          </p>
        </div>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="選擇子網域" />
          </SelectTrigger>
          <SelectContent>
            {domains.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                <span className="font-mono">{item.name}.dev-in.tw</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selected ? <Records key={selected} domainId={selected} /> : null}
    </div>
  );
}

export default function DnsPage() {
  return (
    <Suspense>
      <DnsContent />
    </Suspense>
  );
}
