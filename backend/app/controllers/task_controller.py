
# Handles task database operations called by the API routes.

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskReplace, TaskSummary


# Create a task, save it, and return its database-generated values.
def create_task(db: Session, task_data: TaskCreate) -> Task:
    task = Task(**task_data.model_dump())
    db.add(task)  # Add the new task to the session before saving it.
    db.commit()  # Write the new task to PostgreSQL.
    db.refresh(task)  # Load generated values, such as the UUID, into the object.
    return task


# Return every task, sorted by its UUID.
def list_tasks(db: Session) -> list[Task]:
    query = select(Task).order_by(Task.id)
    return db.scalars(query).all()  # Run the query and return the task objects.


# Count all, completed, and pending tasks in one database query.
def get_task_summary(db: Session) -> list[TaskSummary]:
    total_expr = func.count(Task.id)  # Count all tasks.
    completed_expr = func.count(Task.id).filter(Task.is_completed.is_(True))  # Count completed tasks.
    pending_expr = func.count(Task.id).filter(Task.is_completed.is_(False))  # Count pending tasks.

    query = select(total_expr, completed_expr, pending_expr)
    total_count, completed_count, pending_count = db.execute(query).one()

    # Format the counts as summary items for the API response.
    return [
        TaskSummary(category="Total", count=total_count),
        TaskSummary(category="Completed", count=completed_count),
        TaskSummary(category="Pending", count=pending_count),
    ]


# Find one task by UUID, or return None if it does not exist.
def get_task(db: Session, task_id: UUID) -> Task | None:
    return db.get(Task, task_id)


# Update a task's editable fields and save the changes.
def update_task(
    db: Session,
    task_id: UUID,
    task_data: TaskReplace,
) -> Task | None:
    # Find the task before applying the replacement fields.
    task = db.get(Task, task_id)
    if task is None:
        return None

    # Copy each validated field from the request onto the task.
    for field, value in task_data.model_dump().items():
        setattr(task, field, value)  # Update the matching task field.

    # Save the changes and reload the task.
    db.commit()  # Write the updated values to PostgreSQL.
    db.refresh(task)
    return task


# Delete a task and report whether it existed.
def delete_task(db: Session, task_id: UUID) -> bool:
    # Find the task before trying to delete it.
    task = db.get(Task, task_id)
    if task is None:
        return False

    # Delete the task and save the change.
    db.delete(task)  # Mark the task for deletion.
    db.commit()  # Apply the deletion in PostgreSQL.
    return True