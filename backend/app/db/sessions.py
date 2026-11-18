# Creates the shared ORM base and provides a database session to each API request.
from collections.abc import Generator

from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.db.database import engine


# Give all database models a shared base and metadata registry.
class Base(DeclarativeBase):
    pass


# Create a factory that opens sessions connected to the database engine.
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,  # Wait for explicit database operations before sending pending changes.
    autocommit=False,  # Let the controller decide when to commit a transaction.
)


# Provide one session to a route and close it when the request ends.
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db  # Make this request's session available to its route.
    finally:
        db.close()  # Release the session when the request finishes.