import { Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./ModalForm.css";

export type TaskFormValues = {
  title: string;
  description: string;
};

type ModalFormProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues: TaskFormValues;
  onClose: () => void;
  onSave: (values: TaskFormValues) => Promise<void>;
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "3rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--text-secondary)",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary)",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    color: "var(--text-primary)",
  },
};

const descriptionTextfieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--text-secondary)",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary)",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    color: "var(--text-primary)",
  },
};

const saveButtonSX = {
  background: "var(--primary)",
  color: "var(--text-primary)",
  borderRadius: "2rem",
  fontSize: "0.8rem",
  fontWeight: "bold",
  "&.Mui-disabled": {
    backgroundColor: "var(--disabled-bg)",
    color: "var(--disabled-text)",
  },
  "&:hover:not(.Mui-disabled)": {
    backgroundColor: "var(--primary-hover)",
  },
};

const textButtonSx = {
  color: "var(--primary)",
  fontSize: "0.8rem",
  fontWeight: "bold",
  "&.Mui-disabled": {
    color: "var(--disabled-text)",
  },
  "&:hover:not(.Mui-disabled)": {
    color: "var(--primary-light)",
    backgroundColor: "transparent",
  },
};

const ModalForm = ({
  open,
  mode,
  initialValues,
  onClose,
  onSave,
}: ModalFormProps) => {
  const [formData, setFormData] = useState<TaskFormValues>(initialValues);

  useEffect(() => {
    if (open) {
      setFormData(initialValues);
    }
  }, [open, initialValues.title, initialValues.description]);

  const resetForm = () => {
    setFormData(initialValues);
  };

  const hasChanges =
    formData.title !== initialValues.title ||
    formData.description !== initialValues.description;

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.65)" },
        },
      }}
    >
      <div className="form">
        <div className="form-name">
          {mode === "create" ? "New Task" : "Edit Task"}
        </div>
        <div className="form-fields">
          <div className="task-title-field">
            <label className="form-label">Task title</label>
            <TextField
              className="input-field"
              fullWidth
              placeholder="What needs to be done"
              value={formData.title}
              sx={textFieldSx}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div className="task-title-field">
            <label className="form-label">Description (optional)</label>
            <TextField
              className="description-field"
              sx={descriptionTextfieldSx}
              multiline
              maxRows={4}
              minRows={2}
              placeholder="Add more details.."
              value={formData.description}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  description: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="action-buttons">
          <Button
            sx={saveButtonSX}
            disabled={
              formData.title.length === 0 || (mode === "edit" && !hasChanges)
            }
            onClick={() => {
              void onSave(formData);
            }}
          >
            {mode === "create" ? "Save" : "Update"}
          </Button>
          <Button
            sx={textButtonSx}
            onClick={resetForm}
            disabled={!formData.description.trim() && !formData.title.trim()}
          >
            Reset
          </Button>
          <Button variant="text" sx={textButtonSx} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalForm;