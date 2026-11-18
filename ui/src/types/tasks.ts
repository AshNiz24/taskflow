export type Task = {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TaskCreate = {
  title: string;
  description?: string | null;
};

export type TaskUpdate = {
  id: string;
  title?: string;
  description?: string | null;
  is_completed?: boolean;
};

export type TaskDelete = {
  id: string;
};
