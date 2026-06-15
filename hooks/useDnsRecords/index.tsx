"use client";

// module
import { useCallback, useEffect, useState } from "react";
// api
import apiClient from "@/api";
// token helpers
import { getToken } from "@/lib/authToken";
// type
import type { dnsRecordInput, dnsRecordType } from "@/types/dnsType";

type UseDnsRecordsReturn = {
  records: dnsRecordType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (input: dnsRecordInput) => Promise<dnsRecordType>;
  update: (
    recordId: string,
    input: Partial<dnsRecordInput>
  ) => Promise<dnsRecordType>;
  remove: (recordId: string) => Promise<void>;
};

export function useDnsRecords(domainId: string | null): UseDnsRecordsReturn {
  const [records, setRecords] = useState<dnsRecordType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!domainId || !getToken()) {
      setRecords([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.domain.dns.list(domainId);
      setRecords(data);
    } catch {
      setError("無法取得 DNS 記錄");
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, [domainId]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const create = useCallback(
    async (input: dnsRecordInput) => {
      if (!domainId) {
        throw new Error("尚未選擇子網域");
      }
      const created = await apiClient.domain.dns.create(domainId, input);
      await fetchRecords();
      return created;
    },
    [domainId, fetchRecords]
  );

  const update = useCallback(
    async (recordId: string, input: Partial<dnsRecordInput>) => {
      if (!domainId) {
        throw new Error("尚未選擇子網域");
      }
      const updated = await apiClient.domain.dns.update(
        domainId,
        recordId,
        input
      );
      await fetchRecords();
      return updated;
    },
    [domainId, fetchRecords]
  );

  const remove = useCallback(
    async (recordId: string) => {
      if (!domainId) {
        throw new Error("尚未選擇子網域");
      }
      await apiClient.domain.dns.remove(domainId, recordId);
      setRecords((prev) => prev.filter((item) => item.id !== recordId));
    },
    [domainId]
  );

  return {
    records,
    isLoading,
    error,
    refetch: fetchRecords,
    create,
    update,
    remove
  };
}
