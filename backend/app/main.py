# Creates the FastAPI application, configures CORS, and registers API routes.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import tasks


# Create the application object used by Uvicorn.
app = FastAPI()

# Add the task endpoints to the application.
app.include_router(tasks.router)

# Allow the local Vite frontend to send browser requests to this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Permit requests from the local Vite frontend.
    allow_credentials=True,  # Allow browser requests that include credentials.
    allow_methods=["*"],  # Allow the frontend to use any HTTP method during development.
    allow_headers=["*"],  # Allow the frontend to send request headers.
)

