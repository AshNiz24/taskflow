import "./EmptyPage.css";
import { NotebookPen } from "lucide-react";

const EmptyPage = () => {
  return (
    <div className="empty-page">
      <div className="empty-page-content">
        <div className="empty-page-icon">
          <NotebookPen size={48} />
        </div>
        <div className="empty-page-text">
          <div className="empty-page-title">A fresh start!</div>
          <div className="empty-page-description">
            Your task list is looking a little empty. Add your first task and
            start turning plans into accomplishments.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
