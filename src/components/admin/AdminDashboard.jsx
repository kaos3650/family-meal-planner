import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import AdminIngredients from "./AdminIngredients";
import AdminRecipes from "./AdminRecipes";
import AdminFamilies from "./AdminFamilies";

const NAV = [
  { id: "families", label: "Families", icon: "👨‍👩‍👧" },
  { id: "recipes", label: "Recipes", icon: "📖" },
  { id: "ingredients", label: "Ingredients", icon: "🥕" },
];

export default function AdminDashboard() {
  const { state, logout } = useApp();
  const [activeNav, setActiveNav] = useState("recipes");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0, background: "var(--sidebar)",
        borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column",
        padding: "24px 0",
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 26, marginBottom: 4 }}>🥗</div>
          <div style={{ fontWeight: 900, fontSize: 16, color: "var(--text)" }}>FamilyPlate</div>
          <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>Admin Panel</div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                background: activeNav === item.id ? "var(--accent)" : "transparent",
                color: activeNav === item.id ? "#fff" : "var(--text-secondary)",
                fontSize: 14, fontWeight: 600, textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🛠</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{state.currentUser?.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Administrator</div>
            </div>
          </div>
          <button onClick={logout} style={{
            width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)",
            background: "transparent", cursor: "pointer", color: "var(--text-secondary)",
            fontSize: 13, fontWeight: 600,
          }}>Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px 36px" }}>
        {activeNav === "ingredients" && <AdminIngredients />}
        {activeNav === "recipes" && <AdminRecipes />}
        {activeNav === "families" && <AdminFamilies />}
      </main>
    </div>
  );
}
