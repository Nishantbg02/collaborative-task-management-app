"use client";

export default function Topbar() {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : "";

  return (
    <div
      style={{
        height: 60,
        background: "white",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 30,
      }}
    >
      <div>{user}</div>
    </div>
  );
}
