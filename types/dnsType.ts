export type DnsRecordType = "A" | "AAAA" | "CNAME" | "TXT" | "MX" | "NS";

export type dnsRecordType = {
  id: string;
  type: DnsRecordType;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
};

export type dnsRecordInput = Omit<dnsRecordType, "id">;
