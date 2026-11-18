
# Loads database settings, creates the PostgreSQL engine, and checks connectivity.

import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import URL, create_engine, text

# Load the backend .env file relative to this module.
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

# Prefer a complete database URL (used for cloud deployment).
# Otherwise, build the URL using individual local PostgreSQL settings.
database_url = os.getenv("DATABASE_URL")

if database_url:
    # Neon provides a postgresql:// URL.
    # Explicitly use the Psycopg 3 driver installed in this project.
    if database_url.startswith("postgresql://"):
        database_url = database_url.replace(
            "postgresql://",
            "postgresql+psycopg://",
            1
        )

else:
    # Build the URL using local PostgreSQL settings.
    database_url = URL.create(
        "postgresql+psycopg",
        username=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        database=os.environ["DB_NAME"],
    )

# Create an engine that manages and reuses database connections.
engine = create_engine(
    database_url,
    pool_pre_ping=True,  # Check a pooled connection before using it.
)

# Run a small query to check that the database connection works.
def check_database() -> int:
    # Open a connection and close it automatically after the query.
    with engine.connect() as connection:
        return connection.execute(text("SELECT 1")).scalar_one()  # Run a query that does not change data.
