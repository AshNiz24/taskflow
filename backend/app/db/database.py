# Loads database settings, creates the PostgreSQL engine, and checks connectivity.
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import URL, create_engine, text

# Load the backend .env file relative to this module.
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

# Build the database URL from the required and optional environment settings.
database_url = URL.create(
    "postgresql+psycopg",
    username=os.environ["DB_USER"],  # Read the required PostgreSQL username.
    password=os.environ["DB_PASSWORD"],  # Read the required PostgreSQL password.
    host=os.getenv("DB_HOST", "localhost"),  # Use localhost when no host is configured.
    port=int(os.getenv("DB_PORT", "5432")),  # Use PostgreSQL's default port when omitted.
    database=os.environ["DB_NAME"],  # Read the required database name.
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