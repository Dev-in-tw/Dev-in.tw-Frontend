import type { AxiosInstance } from "axios";
import type { DomainCheckResponse } from "@/types/apiType";

export class DomainCheckApi {
  constructor(private instance: AxiosInstance) {}

  async get(name: string, signal?: AbortSignal): Promise<DomainCheckResponse> {
    const res = await this.instance.get("/domain/check", {
      params: { name },
      signal
    });
    return res.data;
  }
}
