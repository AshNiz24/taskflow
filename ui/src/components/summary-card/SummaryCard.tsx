import { Layers, Clock4, CircleCheck } from "lucide-react";
import "./SummaryCard.css";

// Define an enum for categorizing the summary cards
export enum SummaryCardKind {
  Total = "total",
  Completed = "completed",
  Pending = "pending",
}

const SummaryCardIcons = {
  [SummaryCardKind.Total]: Layers,
  [SummaryCardKind.Completed]: CircleCheck,
  [SummaryCardKind.Pending]: Clock4,
} as const;

type SummaryCardProps = {
  title: string;
  value: number;
  kind: SummaryCardKind;
};

const SummaryCard = ({ title, value, kind }: SummaryCardProps) => {
  const Icon = SummaryCardIcons[kind];

  return (
    <div className={`summary-card summary-card--${kind}`}>
      <div className="summary-card-icon">
        <Icon size={24} />
      </div>

      <div className="summary-card-value">{value}</div>
      <div className="summary-card-title">{title}</div>
    </div>
  );
};
export default SummaryCard;
