import MyTasksHeader from "../../components/my-task-header/my-tasks-header";
import { useCallback, useEffect, useState } from "react";
import { getTasks } from "../../api/taskApi";
import type { Task } from "../../types/tasks";
import EmptyPage from "./emptyPage/EmptyPage";
import TaskList from "./taskList/TaskList";

type TaskDisplayProps = {
  refreshKey: number;
  onTaskChange: () => void;
};

const TasksDisplay = ({ refreshKey, onTaskChange }: TaskDisplayProps) => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    const tasks = await getTasks();
    setTaskList(tasks);
  }, []);

  useEffect(() => {
    // const fetchTasks = async () => {
    //   const tasks = await getTasks();
    //   setTaskList(tasks);
    // };
    fetchTasks();
  }, [fetchTasks, refreshKey]);

  return (
    <>
      <MyTasksHeader onTaskChange={onTaskChange} />
      <div className="tasks-display">
        {/* Task display logic goes here */}
        {taskList?.length === 0 ? (
          <EmptyPage />
        ) : (
          <TaskList tasks={taskList} onTaskChange={onTaskChange} />
        )}
      </div>
    </>
  );
};

export default TasksDisplay;
