"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import TaskBoard from "../components/TaskBoard";
import { getProjects, createProject } from "../lib/api";

type Project = {
  id: number;
  name: string;
};

export default function Home() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) router.push("/login");
    else {
      setUser(u);
      load();
    }
  }, []);

  const load = async () => {
    const data = await getProjects();
    setProjects(data);
    if (data.length > 0) setSelectedProjectId(data[0].id);
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createProject(name);
    setName("");
    load();
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        {/* HEADER */}
        <div className="topbar">
          <h2>Welcome back 👋</h2>
          <div className="userBox">👤 {user}</div>
        </div>

        {/* CARDS */}
        <div className="stats">
          <div className="card">📁 {projects.length} Projects</div>
          <div className="card">📝 Tasks Board</div>
          <div className="card">🚀 Productivity</div>
        </div>

        {/* CREATE PROJECT */}
        <div className="projectHeader">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Create new project..."
          />
          <button onClick={handleCreate}>Create</button>
        </div>

        {/* PROJECT LIST */}
        <div className="projectList">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`projectCard ${selectedProjectId === p.id ? "active" : ""}`}
            >
              {p.name}
            </div>
          ))}
        </div>

        {selectedProjectId && <TaskBoard projectId={selectedProjectId} />}
      </div>
    </div>
  );
}
