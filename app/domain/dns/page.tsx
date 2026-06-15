"use client";

// module
import { Globe, Pencil, Plus, Server, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
// component
import DnsRecordDialog from "@/components/Domain/DnsRecordDialog";
import ConfirmDialog from "@/components/Global/ConfirmDialog";
import EmptyState from "@/components/Global/EmptyState";
import PageHeader from "@/components/Global/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
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

function SubdomainSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const { domains, isLoading } = useDomains();

  if (isLoading) {
    return <Skeleton className="h-9 w-64" />;
  }

  if (domains.length === 0) {
    return (
      <EmptyState
        icon={Globe}
        title="你還沒有任何子網域"
        description="先申請一個子網域，才能管理它的 DNS 記錄。"
      />
    );
  }

  return (
    <div className="glass space-y-3 rounded-xl p-6 shadow-glow">
      <div className="space-y-1">
        <p className="text-base font-medium">管理 DNS 記錄</p>
        <p className="text-sm text-muted-foreground">選擇要管理的子網域</p>
      </div>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-72">
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
  );
}

function DnsManager({ domainId }: { domainId: string }) {
  const { domains } = useDomains();
  const { records, isLoading, create, update, remove } =
    useDnsRecords(domainId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<dnsRecordType | null>(null);
  const [pendingDelete, setPendingDelete] = useState<dnsRecordType | null>(
    null
  );

  const current = domains.find((item) => item._id === domainId);
  const title = current ? `DNS 記錄 — ${current.name}.dev-in.tw` : "DNS 記錄";

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
    <div className="space-y-6 p-2">
      <PageHeader
        title={title}
        description="所有變更會即時同步到 Cloudflare。"
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

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon={Server}
          title="尚無 DNS 記錄"
          description="新增第一筆記錄，將你的子網域指向伺服器。"
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
              <TableHead className="text-center">Proxy</TableHead>
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
                  <Badge
                    variant="outline"
                    className="border-brand/30 bg-brand/10 font-mono text-brand"
                  >
                    {record.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{record.name}</TableCell>
                <TableCell className="font-mono break-all">
                  {record.content}
                </TableCell>
                <TableCell>{record.ttl === 1 ? "自動" : record.ttl}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Switch checked={record.proxied} disabled />
                  </div>
                </TableCell>
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
                      <TooltipContent>編輯記錄</TooltipContent>
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
                        刪除記錄
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainId = searchParams.get("domain");

  if (!domainId) {
    return (
      <div className="p-4">
        <SubdomainSelector
          onSelect={(id) => router.replace(`/domain/dns?domain=${id}`)}
        />
      </div>
    );
  }

  return <DnsManager domainId={domainId} />;
}

export default function DnsPage() {
  return (
    <Suspense>
      <DnsContent />
    </Suspense>
  );
}
