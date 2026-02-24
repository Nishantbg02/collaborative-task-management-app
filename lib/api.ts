const BASE_URL = "https://localhost:7038/api";

export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/Project`);
  return res.json();
};

export const createProject = async (name: string) => {
  const res = await fetch(`${BASE_URL}/Project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/Task`);
  return res.json();
};

export const getTasksByProject = async (projectId: number) => {
  const res = await fetch(`${BASE_URL}/Task/project/${projectId}`);
  return res.json();
};

export const createTask = async (title: string, projectId: number) => {
  const res = await fetch(`${BASE_URL}/Task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      status: "Todo",
      projectId: projectId,
    }),
  });

  return res.json();
};

export const updateTaskStatus = async (id: number, status: string) => {
  await fetch(`${BASE_URL}/Task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
};

export const deleteTask = async (id: number) => {
  await fetch(`${BASE_URL}/Task/${id}`, {
    method: "DELETE",
  });
};

export const editTask = async (id: number, title: string) => {
  await fetch(`${BASE_URL}/Task/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
};
