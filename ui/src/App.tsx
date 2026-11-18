import Header from "./sections/header/Header";
import { Divider } from "@mui/material";
import Summary from "./sections/summary/Summary";
import TasksDisplay from "./sections/tasksDisplay";
import { useState } from "react";

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskChanged = () => {
    setRefreshKey((key) => key + 1);
  };
  return (
    <>
      <Header />
      <Divider
        flexItem
        sx={{ borderColor: "var(--border-color)", margin: "1rem 0" }}
      />
      <Summary refreshKey={refreshKey} />
      <TasksDisplay refreshKey={refreshKey} onTaskChange={handleTaskChanged} />
    </>
  );
};

export default App;
