"use client";

// module
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// ui
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// type
import type { dnsRecordInput, dnsRecordType } from "@/types/dnsType";

const DNS_TYPES = ["A", "AAAA", "CNAME", "TXT", "MX", "NS"] as const;

const TTL_OPTIONS = [
  { value: "1", label: "自動" },
  { value: "60", label: "1 分鐘" },
  { value: "300", label: "5 分鐘" },
  { value: "1800", label: "30 分鐘" },
  { value: "3600", label: "1 小時" },
  { value: "86400", label: "1 天" }
];

const recordSchema = z.object({
  type: z.enum(DNS_TYPES),
  name: z.string().min(1, "請輸入名稱"),
  content: z.string().min(1, "請輸入內容"),
  ttl: z.string().min(1, "請選擇 TTL"),
  proxied: z.boolean()
});

type RecordFormValues = z.infer<typeof recordSchema>;

type DnsRecordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record?: dnsRecordType | null;
  onCreate: (input: dnsRecordInput) => Promise<unknown>;
  onUpdate: (
    recordId: string,
    input: Partial<dnsRecordInput>
  ) => Promise<unknown>;
};

export default function DnsRecordDialog({
  open,
  onOpenChange,
  record,
  onCreate,
  onUpdate
}: DnsRecordDialogProps) {
  const isEdit = Boolean(record);

  const form = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      type: "A",
      name: "",
      content: "",
      ttl: "1",
      proxied: false
    }
  });

  // 開啟時依 record 重置表單（新增/編輯共用）
  useEffect(() => {
    if (!open) return;
    if (record) {
      form.reset({
        type: record.type,
        name: record.name,
        content: record.content,
        ttl: String(record.ttl),
        proxied: record.proxied
      });
    } else {
      form.reset({
        type: "A",
        name: "",
        content: "",
        ttl: "1",
        proxied: false
      });
    }
  }, [open, record, form]);

  async function onSubmit(values: RecordFormValues) {
    const input: dnsRecordInput = {
      type: values.type,
      name: values.name,
      content: values.content,
      ttl: Number(values.ttl),
      proxied: values.proxied
    };

    try {
      if (record) {
        await onUpdate(record.id, input);
        toast.success("DNS 記錄已更新");
      } else {
        await onCreate(input);
        toast.success("DNS 記錄已新增");
      }
      onOpenChange(false);
    } catch (err) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response: { data: { message: string } } }).response.data
              .message
          : "操作失敗，請稍後再試";
      toast.error(message);
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "編輯 DNS 記錄" : "新增 DNS 記錄"}
          </DialogTitle>
          <DialogDescription>設定會即時同步到 Cloudflare。</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>類型</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="選擇類型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DNS_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名稱</FormLabel>
                  <FormControl>
                    <Input {...field} className="font-mono" />
                  </FormControl>
                  <FormDescription>
                    例如 sub.dev-in.tw 或 www.sub.dev-in.tw
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>內容</FormLabel>
                  <FormControl>
                    <Input {...field} className="font-mono" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TTL</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="選擇 TTL" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TTL_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proxied"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Proxy（橙色雲）</FormLabel>
                    <FormDescription>
                      透過 Cloudflare 代理流量。
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                取消
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-glow"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                {isEdit ? "儲存變更" : "新增記錄"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
