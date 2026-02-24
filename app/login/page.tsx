"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function Login() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) return;
    localStorage.setItem("user", name);
    router.push("/");
  };

  return (
    <div className="loginPage">
      {/* LEFT SIDE */}
      <div className="loginLeft">
        <h1>Collaborative Task Manager</h1>
        <p>
          Manage projects, track tasks and boost productivity with a clean
          workflow.
        </p>
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="loginCard">
        <h2>Welcome back 👋</h2>

        <div className="inputBox">
          <User size={18} />
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
