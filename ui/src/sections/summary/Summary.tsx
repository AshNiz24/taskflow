import SummaryCard, {
  SummaryCardKind,
} from "../../components/summary-card/SummaryCard";
import type { SummaryCardType } from "../../types/taskSummary";
import { useEffect, useState } from "react";
import { getSummaryData } from "../../api/taskApi";
import "./Summary.css";

type SummaryProps = {
  refreshKey: number;
};

const Summary = ({ refreshKey }: SummaryProps) => {
  const [summaryData, setSummaryData] = useState<SummaryCardType[]>([]);
  useEffect(() => {
    const fetchSummaryData = async () => {
      const data = await getSummaryData();
      setSummaryData(data);
    };
    fetchSummaryData();
  }, [refreshKey]);

  return (
    <div className="summary">
      <div className="summary-header">
        <div className="summary-title">Stay Organized.</div>
        <div className="summary-subtitle">
          Keep track of what matters, one task at a time
        </div>
      </div>
      <div className="summary-cards">
        {/* api response data will be mapped and used to populate the summary cards */}
        {summaryData.map((card) => (
          <SummaryCard
            key={card.category}
            title={card.category}
            value={card.count}
            kind={SummaryCardKind[card.category]}
          />
        ))}
      </div>
    </div>
  );
};

export default Summary;
