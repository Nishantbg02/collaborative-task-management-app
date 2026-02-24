"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Jira</h2>

      <div className="menu">
        <div className="menuItem">
          <LayoutDashboard size={18} /> Dashboard
        </div>

        <div className="menuItem">
          <FolderKanban size={18} /> Projects
        </div>

        <div className="menuItem">
          <CheckSquare size={18} /> Tasks
        </div>
      </div>

      <button className="logoutBtn" onClick={logout}>
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
