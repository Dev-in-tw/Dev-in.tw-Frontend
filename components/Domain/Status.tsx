import StatusBadge from "@/components/Global/StatusBadge";
import type { DomainStatus } from "@/types/domainType";

export default function Status({ status }: { status: DomainStatus }) {
  return <StatusBadge status={status} />;
}
