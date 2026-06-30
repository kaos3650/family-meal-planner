import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import FamilyManager from "./FamilyManager";
import RecipeBrowser from "./RecipeBrowser";
import WeeklyPlanner from "./WeeklyPlanner";
import ShoppingList from "./ShoppingList";

const NAV = [
  { id: "planner", label: "Meal Planner", icon: "📅" },
  { id: "recipes", label: "Recipes", icon: "📖" },
  { id: "shopping", label: "Shopping List", icon: "🛒" },
  { id: "family", label: "Our Family", icon: "👨‍👩‍👧" },
];

export default function UserDashboard() {
  const { state, logout, getUserFamily, getWeekKey } = useApp();
  const [activeNav, setActiveNav] = useState("planner");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const family = getUserFamily();
  const weekKey = getWeekKey(new Date());
  const plan = (state.weeklyPlans[family?.id] || {})[weekKey] || {};
  const totalPlanned = Object.values(plan).reduce((sum, dayPlan) =>
    sum + Object.values(dayPlan).reduce((s, meals) => s + (meals || []).filter(m => m.recipeId).length, 0), 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font)" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 220 : 64, flexShrink: 0,
        background: "var(--sidebar)", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", padding: "24px 0",
        transition: "width 0.2s",
      }}>
        <div style={{ padding: "0 16px 24px", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26, flexShrink: 0 }}>🥗</span>
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: 900, fontSize: 15, color: "var(--text)", whiteSpace: "nowrap" }}>FamilyPlate</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{family?.name || "My Family"}</div>
              </div>
            )}
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              title={!sidebarOpen ? item.label : ""}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                background: activeNav === item.id ? "var(--accent)" : "transparent",
                color: activeNav === item.id ? "#fff" : "var(--text-secondary)",
                fontSize: 14, fontWeight: 600, textAlign: "left",
                transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden",
              }}
            >
              <span style={{ flexShrink: 0, fontSize: 18 }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        {/* Stats */}
        {sidebarOpen && (
          <div style={{ margin: "0 10px 12px", background: "rgba(74,144,217,0.1)", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>This week</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>{totalPlanned}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>meals planned</div>
          </div>
        )}

        <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
          {sidebarOpen ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#4ade80,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                  {state.currentUser?.name?.[0] || "U"}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{state.currentUser?.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Family account</div>
                </div>
              </div>
              <button onClick={logout} style={{
                width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)",
                background: "transparent", cursor: "pointer", color: "var(--text-secondary)",
                fontSize: 13, fontWeight: 600,
              }}>Sign Out</button>
            </div>
          ) : (
            <button onClick={logout} title="Sign out" style={{ width: "100%", padding: "8px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 16 }}>↩</button>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px 36px" }}>
        {/* Toggle sidebar */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          style={{ position: "fixed", left: sidebarOpen ? 198 : 42, top: 20, zIndex: 100, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "left 0.2s" }}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {activeNav === "planner" && <WeeklyPlanner />}
        {activeNav === "recipes" && <RecipeBrowser />}
        {activeNav === "shopping" && <ShoppingList />}
        {activeNav === "family" && <FamilyManager />}
      </main>
    </div>
  );
}
