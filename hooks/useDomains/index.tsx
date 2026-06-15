"use client";

// module
import { useCallback, useEffect, useState } from "react";
// api
import apiClient from "@/api";
// token helpers
import { getToken } from "@/lib/authToken";
// type
import type { domainType } from "@/types/domainType";

type UseDomainsReturn = {
  domains: domainType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export function useDomains(): UseDomainsReturn {
  const [domains, setDomains] = useState<domainType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = useCallback(async () => {
    // gate：沒有 token 不打 API
    if (!getToken()) {
      setDomains([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.domain.list();
      setDomains(data);
    } catch {
      setError("無法取得子網域列表");
      setDomains([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const remove = useCallback(async (id: string) => {
    await apiClient.domain.remove(id);
    // 樂觀更新：直接從本地列表移除
    setDomains((prev) => prev.filter((item) => item._id !== id));
  }, []);

  return { domains, isLoading, error, refetch: fetchDomains, remove };
}
