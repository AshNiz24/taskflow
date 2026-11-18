
# Defines the task API endpoints and forwards requests to the task controller.

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.controllers import task_controller
from app.db.sessions import get_db
from app.schemas.task import TaskCreate, TaskRead, TaskReplace, TaskSummary


# Group all task endpoints under the /tasks URL.
router = APIRouter(prefix="/tasks", tags=["tasks"])


# Create a task and return the saved task.
@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    return task_controller.create_task(db, task_data)


# Return all tasks as a JSON list.
@router.get("/", response_model=list[TaskRead])
def list_tasks(db: Session = Depends(get_db)):
    return task_controller.list_tasks(db)


# Return the total, completed, and pending task counts.
@router.get("/summary", response_model=list[TaskSummary])
def get_task_summary(db: Session = Depends(get_db)):
    return task_controller.get_task_summary(db)


# Return one task or respond with 404 when it does not exist.
@router.get("/{task_id}", response_model=TaskRead)
def read_task(task_id: UUID, db: Session = Depends(get_db)):
    task = task_controller.get_task(db, task_id)
    # Tell the client when no task matches the requested UUID.
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# Replace a task's editable fields or respond with 404 when it is missing.
@router.put("/{task_id}", response_model=TaskRead)
def replace_task(
    task_id: UUID,
    task_data: TaskReplace,
    db: Session = Depends(get_db),
):
    task = task_controller.update_task(db, task_id, task_data)
    # Tell the client when no task matches the requested UUID.
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# Delete a task or respond with 404 when it does not exist.
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID, db: Session = Depends(get_db)) -> None:
    deleted = task_controller.delete_task(db, task_id)
    # Tell the client when no task matches the requested UUID.
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")