import type { AxiosInstance } from "axios";
import { DomainCheckApi } from "@/api/domain/check";
import { DomainDnsApi } from "@/api/domain/dns";
import type { DomainApplyInput, DomainListResponse } from "@/types/apiType";
import type { domainType } from "@/types/domainType";

export class DomainApi {
  public check: DomainCheckApi;
  public dns: DomainDnsApi;

  constructor(private instance: AxiosInstance) {
    this.check = new DomainCheckApi(instance);
    this.dns = new DomainDnsApi(instance);
  }

  async list(): Promise<DomainListResponse> {
    const res = await this.instance.get("/domain");
    return res.data;
  }

  async apply(input: DomainApplyInput): Promise<domainType> {
    const res = await this.instance.post("/domain", input);
    return res.data;
  }

  async remove(id: string): Promise<void> {
    await this.instance.delete(`/domain/${id}`);
  }
}
