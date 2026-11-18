import { Alert, Button, Snackbar } from "@mui/material";
import "./my-tasks-header.css";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModalForm, { type TaskFormValues } from "../modal-form/ModalForm";
import { createTask } from "../../api/taskApi";
import type { SnackBarType } from "../../types/general";

const emptyTaskForm: TaskFormValues = {
  title: "",
  description: "",
};

type MyTasksHeaderProps = {
  onTaskChange: () => void;
};

const MyTasksHeader = ({ onTaskChange }: MyTasksHeaderProps) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [snackbar, setSnackBar] = useState<SnackBarType>({
    open: false,
    message: "",
    severity: "success",
  });

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleCreateTask = async (taskData: TaskFormValues) => {
    try {
      const newTask = await createTask(taskData);
      onTaskChange();
      closeForm();
      setSnackBar({
        open: true,
        message: "Task added successfully",
        severity: "success",
      });
      console.log("Added new task", newTask);
    } catch (error) {
      console.log("Unable to create task due to ", error);
      setSnackBar({
        open: true,
        message: "Unable to create task",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="my-tasks-header">
        <div className="my-tasks-header-title-subtitle">
          <div className="my-tasks-header-title">My Tasks</div>
          <div className="my-tasks-header-subtitle">
            Your Personal to-do List
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="my-tasks-header-add-task-button"
          onClick={() => setOpenForm(true)}
          sx={{
            backgroundColor: "var(--primary)",
            color: "var(--text-primary)",
            borderRadius: "1rem",
            textTransform: "none",
            fontWeight: "bold",
            gap: "0.5rem",
          }}
        >
          <Plus size={30} />
          <span>Add Task</span>
        </Button>
      </div>
      <ModalForm
        open={openForm}
        mode="create"
        initialValues={emptyTaskForm}
        onClose={closeForm}
        onSave={handleCreateTask}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackBar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default MyTasksHeader;
