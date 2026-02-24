"use client";

import { useEffect, useState } from "react";
import {
  getTasksByProject,
  createTask,
  updateTaskStatus,
  deleteTask,
  editTask,
} from "../lib/api";

type Task = {
  id: number;
  title: string;
  status: string;
  projectId: number;
};

export default function TaskBoard({ projectId }: { projectId: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const loadTasks = async () => {
    const data = await getTasksByProject(projectId);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createTask(title, projectId);
    setTitle("");
    loadTasks();
  };

  const move = async (id: number, status: string) => {
    await updateTaskStatus(id, status);
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = async (id: number) => {
    if (!editText.trim()) return;

    await editTask(id, editText);
    setEditingId(null);
    setEditText("");
    loadTasks();
  };

  const todo = tasks.filter((t) => t.status === "Todo");
  const progress = tasks.filter((t) => t.status === "InProgress");
  const done = tasks.filter((t) => t.status === "Done");

  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ marginBottom: 20 }}>Task Board</h2>

      <div style={{ marginBottom: 25, display: "flex", gap: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Create new task..."
          style={{
            padding: 12,
            width: 300,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={handleCreate}
          style={{
            padding: "12px 20px",
            background: "#2d6cdf",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 25,
          overflowX: "auto",
          paddingBottom: 10,
        }}
      >
        <Column
          title="Todo"
          tasks={todo}
          move={move}
          onDelete={handleDelete}
          onEdit={startEdit}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
        />

        <Column
          title="InProgress"
          tasks={progress}
          move={move}
          onDelete={handleDelete}
          onEdit={startEdit}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
        />

        <Column
          title="Done"
          tasks={done}
          move={move}
          onDelete={handleDelete}
          onEdit={startEdit}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
        />
      </div>
    </div>
  );
}

function Column({
  title,
  tasks,
  move,
  onDelete,
  onEdit,
  editingId,
  editText,
  setEditText,
  saveEdit,
}: any) {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.style.background = "#e8edff";
      }}
      onDragLeave={(e) => {
        e.currentTarget.style.background = "#f4f6f8";
      }}
      onDrop={(e) => {
        e.preventDefault();
        const id = Number(e.dataTransfer.getData("taskId"));
        move(id, title);
        e.currentTarget.style.background = "#f4f6f8";
      }}
      style={{
        background: "#f4f6f8",
        padding: 20,
        minWidth: 300,
        flexShrink: 0,
        borderRadius: 12,
        minHeight: 450,
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{title}</h3>

      {tasks.map((t: Task) => (
        <div
          key={t.id}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("taskId", t.id.toString());
          }}
          style={{
            background: "white",
            padding: 16,
            marginTop: 12,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            cursor: "grab",
            transition: "0.2s",
          }}
        >
          {editingId === t.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => saveEdit(t.id)}
                style={{
                  background: "#2d6cdf",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 6,
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{t.title}</div>

              <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                {title === "Todo" && (
                  <button onClick={() => move(t.id, "InProgress")} style={btn}>
                    Start
                  </button>
                )}

                {title === "InProgress" && (
                  <button onClick={() => move(t.id, "Done")} style={btn}>
                    Done
                  </button>
                )}

                <button onClick={() => onEdit(t)} style={btn}>
                  Edit
                </button>

                <button
                  onClick={() => onDelete(t.id)}
                  style={{ ...btn, background: "#ff4d4f" }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const btn = {
  padding: "6px 10px",
  border: "none",
  borderRadius: 6,
  background: "#2d6cdf",
  color: "white",
  cursor: "pointer",
};
