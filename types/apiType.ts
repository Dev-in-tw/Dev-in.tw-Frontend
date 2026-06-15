import type { dnsRecordType } from "@/types/dnsType";
import type { domainType } from "@/types/domainType";
import type { userType } from "@/types/userType";

export type AuthResponse = { token: string };
export type UserInfoResponse = { accountData: userType };
export type DomainCheckResponse = { available: boolean; reason?: string };
export type DomainListResponse = domainType[];
export type DnsListResponse = dnsRecordType[];

export type DomainApplyInput = {
  name: string;
  first_name: string;
  last_name: string;
  birth: string; // ISO date string from <input type="date">
  identy_id: string;
  address: string;
  phone: string;
};
