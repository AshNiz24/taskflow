import { Alert, Checkbox, IconButton, Snackbar } from "@mui/material";
import type { Task, TaskUpdate } from "../../types/tasks";
import { Circle, CircleCheck, Pencil, Trash } from "lucide-react";
import "./TaskItem.css";
import { useState } from "react";
import { updateTask, deleteTask } from "../../api/taskApi";
import type { SnackBarType } from "../../types/general";
import ModalForm, { type TaskFormValues } from "../modal-form/ModalForm";

type TaskItemProp = {
  task: Task;
  onTaskChange: () => void;
};

const TaskItem = ({ task, onTaskChange }: TaskItemProp) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [snackBar, setSnackBar] = useState<SnackBarType>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOnchange = async (updatedTask: TaskUpdate) => {
    try {
      await updateTask(updatedTask);
      onTaskChange();
    } catch (error) {
      console.log("There was an error in updating task");
    }
  };

  const handleEditTask = async (formValues: TaskFormValues) => {
    try {
      await updateTask({
        id: task.id,
        title: formValues.title,
        description: formValues.description,
        is_completed: task.is_completed,
      });
      onTaskChange();
      setOpenEditForm(false);
      setSnackBar({
        open: true,
        message: "Task updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Unable to update task:", error);
      setSnackBar({
        open: true,
        message: "Unable to update task",
        severity: "error",
      });
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id: task.id });
      onTaskChange();
      setSnackBar({
        open: true,
        message: "Task deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackBar({
        open: true,
        message: "Unable to delete task",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div key={task.id} className="task-item">
        <div className="check-title-desc">
          <Checkbox
            checked={task.is_completed}
            onChange={(_, checked) => {
              handleOnchange({
                id: task.id,
                title: task.title,
                description: task.description,
                is_completed: checked,
              });
            }}
            icon={
              <Circle
                style={{
                  color: "var(--text-primary)",
                }}
              />
            }
            checkedIcon={
              <CircleCheck
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: 0,
                  borderRadius: "0.8rem",
                }}
              />
            }
          />
          <div className="task-title-desc">
            <div
              className={`task-title task-title--${task.is_completed ? "completed" : "pending"}`}
            >
              {task.title}
            </div>
            <div
              className={`task-desc task-desc--${task.is_completed ? "completed" : "pending"}`}
            >
              {task.description}
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <IconButton
            sx={{ color: "var(--text-primary)", padding: "1rem" }}
            onClick={() => setOpenEditForm(true)}
          >
            <Pencil fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ color: "var(--danger)", padding: "1rem" }}
            onClick={handleDeleteTask}
          >
            <Trash fontSize="small" />
          </IconButton>
        </div>
      </div>
      <ModalForm
        open={openEditForm}
        mode="edit"
        initialValues={{
          title: task.title,
          description: task.description ?? "",
        }}
        onClose={() => setOpenEditForm(false)}
        onSave={handleEditTask}
      />
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackBar((previous) => ({ ...previous, open: false }))
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default TaskItem;
