import { Badge } from "@/components/ui/badge";
import type { DomainStatus } from "@/types/domainType";

type StatusConfig = {
  label: string;
  className: string;
};

const STATUS_MAP: Record<DomainStatus, StatusConfig> = {
  active: {
    label: "已開通",
    className: "bg-success/15 text-success border-success/30"
  },
  pending: {
    label: "審核中",
    className: "bg-warning/15 text-warning border-warning/30"
  },
  reject: {
    label: "已駁回",
    className: "bg-destructive/15 text-destructive border-destructive/30"
  },
  inactive: {
    label: "未啟用",
    className: "bg-muted text-muted-foreground border-border"
  }
};

export default function StatusBadge({ status }: { status: DomainStatus }) {
  const config = STATUS_MAP[status] ?? STATUS_MAP.inactive;
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
