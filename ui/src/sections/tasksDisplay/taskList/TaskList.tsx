import TaskItem from "../../../components/task-item/TaskItem";
import type { Task } from "../../../types/tasks";
import "./TaskList.css";

type TaskListProps = {
  tasks: Task[];
  onTaskChange: () => void;
};

const TaskList = ({ tasks, onTaskChange }: TaskListProps) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskChange={onTaskChange} />
      ))}
    </div>
  );
};
export default TaskList;
