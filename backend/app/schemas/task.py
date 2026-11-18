# Defines and validates the data accepted and returned by the task API.

from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


# Validate the fields a client can send when creating a task.
class TaskCreate(BaseModel):
    # Require a non-empty title that fits the database column.
    title: str = Field(min_length=1, max_length=200)
    # Allow the client to leave the description empty.
    description: str | None = None


# Validate all editable fields required to replace a task.
class TaskReplace(BaseModel):
    # Require a non-empty title that fits the database column.
    title: str = Field(min_length=1, max_length=200)
    # Require the field but allow its value to be null.
    description: str | None
    # Require the new completion status.
    is_completed: bool


# Describe a task returned by the API.
class TaskRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)  # Read response values from a SQLAlchemy Task object.

    id: UUID
    title: str
    description: str | None
    is_completed: bool
    created_at: datetime
    updated_at: datetime


# Describe one count returned by the task summary endpoint.
class TaskSummary(BaseModel):
    category: Literal["Total", "Completed", "Pending"]
    count: int
