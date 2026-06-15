"use client";

// module
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// api
import apiClient from "@/api";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// type
import type { DomainApplyInput } from "@/types/apiType";

const applySchema = z.object({
  name: z.string().min(1, "請輸入子網域名稱"),
  first_name: z.string().min(1, "請輸入名字"),
  last_name: z.string().min(1, "請輸入姓氏"),
  birth: z.string().min(1, "請選擇出生日期"),
  identy_id: z.string().min(1, "請輸入身分證字號"),
  address: z.string().min(1, "請輸入聯絡地址"),
  phone: z.string().min(1, "請輸入聯絡電話")
});

type ApplyFormValues = z.infer<typeof applySchema>;

type ApplyDomainDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  onApplied?: () => void;
};

export default function ApplyDomainDialog({
  open,
  onOpenChange,
  name,
  onApplied
}: ApplyDomainDialogProps) {
  const router = useRouter();
  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name,
      first_name: "",
      last_name: "",
      birth: "",
      identy_id: "",
      address: "",
      phone: ""
    }
  });

  // 帶入最新的 name（開啟時搜尋值可能改變）
  useEffect(() => {
    form.setValue("name", name);
  }, [name, form]);

  async function onSubmit(values: ApplyFormValues) {
    try {
      const created = await apiClient.domain.apply(values as DomainApplyInput);
      toast.success(`${created.name}.dev-in.tw 已開通`);
      onOpenChange(false);
      form.reset();
      onApplied?.();
      router.push("/domain");
    } catch (err) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response: { data: { message: string } } }).response.data
              .message
          : "申請失敗，請稍後再試";
      toast.error(message);
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>申請子網域</DialogTitle>
          <DialogDescription>
            送出後即時開通，請填寫身分驗證資料。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>子網域</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input {...field} readOnly className="pr-24 font-mono" />
                      <span className="pointer-events-none absolute right-3 text-sm text-muted-foreground">
                        .dev-in.tw
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 pt-1">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                身分驗證
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>姓氏</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名字</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>出生日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identy_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>身分證字號</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>聯絡地址</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>聯絡電話</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
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
                送出申請
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
