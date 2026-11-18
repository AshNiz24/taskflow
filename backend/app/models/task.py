# Maps the PostgreSQL tasks table to a typed Python model.
from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import Boolean, DateTime, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from app.db.sessions import Base


# Map the tasks table columns to Python attributes.
class Task(Base):
    __tablename__ = "tasks"

    # Use the database UUID column as each task's primary key.
    id: Mapped[UUID] = mapped_column(
        "task_id",
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid4,  # Generate a UUID when a new task is created.
    )
    # Store the required title and optional description.
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    # Store whether the task is complete.
    is_completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,  # New tasks start as incomplete.
        nullable=False,
    )
    # Store when the task was created and last updated.
    created_at: Mapped[datetime] = mapped_column(
        "created_date", DateTime(timezone=False), default=datetime.now, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        "updated_date",
        DateTime(timezone=False),
        default=datetime.now,
        onupdate=datetime.now,  # Refresh this timestamp when the task changes.
        nullable=False,
    )