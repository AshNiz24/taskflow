import axios from "axios";
import type { SummaryCardType } from "../types/taskSummary";
import type { Task, TaskCreate, TaskUpdate, TaskDelete } from "../types/tasks";

const API_BASE_URL = "http://127.0.0.1:8000";

//API for summary data
export const getSummaryData: () => Promise<SummaryCardType[]> = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks/summary`);
  return response.data;
};

//API for getting task list
export const getTasks: () => Promise<Task[]> = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks/`);
  return response.data;
};

//API for creating a new task
export const createTask: (task: TaskCreate) => Promise<Task> = async (task) => {
  const response = await axios.post(`${API_BASE_URL}/tasks/`, task);
  return response.data;
};

//API for updating existing task
export const updateTask: (task: TaskUpdate) => Promise<Task> = async (task) => {
  const { id, ...taskData } = task;
  const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
  return response.data;
};

//API for deleting a task
export const deleteTask: (task: TaskDelete) => Promise<void> = async ({
  id,
}) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};
