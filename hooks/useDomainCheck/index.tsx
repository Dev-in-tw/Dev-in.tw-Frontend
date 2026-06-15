"use client";

// module
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
// api
import apiClient from "@/api";

export type DomainCheckStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error";

type UseDomainCheckReturn = {
  status: DomainCheckStatus;
  reason?: string;
};

// 子網域格式：小寫英數字與連字號，1–63 字
const SUBDOMAIN_REGEX = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

export function useDomainCheck(name: string | null): UseDomainCheckReturn {
  const [status, setStatus] = useState<DomainCheckStatus>("idle");
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [debouncedName, setDebouncedName] = useDebounceValue(name ?? "", 350);

  // 同步外部 name 到 debounce 來源
  useEffect(() => {
    setDebouncedName(name ?? "");
  }, [name, setDebouncedName]);

  useEffect(() => {
    const value = debouncedName.trim().toLowerCase();

    if (!value) {
      setStatus("idle");
      setReason(undefined);
      return;
    }

    if (!SUBDOMAIN_REGEX.test(value)) {
      setStatus("taken");
      setReason("名稱格式不正確（僅限小寫英數字與連字號）");
      return;
    }

    const controller = new AbortController();
    setStatus("checking");
    setReason(undefined);

    (async () => {
      try {
        const res = await apiClient.domain.check.get(value, controller.signal);
        if (controller.signal.aborted) return;
        if (res.available) {
          setStatus("available");
          setReason(undefined);
        } else {
          setStatus("taken");
          setReason(res.reason);
        }
      } catch (err) {
        // 被新請求取消的不更新狀態
        if (controller.signal.aborted) return;
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          (err as { code?: string }).code === "ERR_CANCELED"
        ) {
          return;
        }
        setStatus("error");
        setReason("查詢失敗，請稍後再試");
      }
    })();

    // 過期請求取消
    return () => controller.abort();
  }, [debouncedName]);

  return { status, reason };
}
