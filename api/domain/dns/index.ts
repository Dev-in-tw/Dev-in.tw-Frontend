import type { AxiosInstance } from "axios";
import type { DnsListResponse } from "@/types/apiType";
import type { dnsRecordInput, dnsRecordType } from "@/types/dnsType";

export class DomainDnsApi {
  constructor(private instance: AxiosInstance) {}

  async list(domainId: string): Promise<DnsListResponse> {
    const res = await this.instance.get(`/domain/${domainId}/dns`);
    return res.data;
  }

  async create(
    domainId: string,
    input: dnsRecordInput
  ): Promise<dnsRecordType> {
    const res = await this.instance.post(`/domain/${domainId}/dns`, input);
    return res.data;
  }

  async update(
    domainId: string,
    recordId: string,
    input: Partial<dnsRecordInput>
  ): Promise<dnsRecordType> {
    const res = await this.instance.patch(
      `/domain/${domainId}/dns/${recordId}`,
      input
    );
    return res.data;
  }

  async remove(domainId: string, recordId: string): Promise<void> {
    await this.instance.delete(`/domain/${domainId}/dns/${recordId}`);
  }
}
