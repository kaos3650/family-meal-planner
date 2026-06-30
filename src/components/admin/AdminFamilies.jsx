import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card, Button, SectionHeader, EmptyState, NutritionRow } from "../shared/UI";

export default function AdminFamilies() {
  const { state, getWeekKey, generateShoppingList } = useApp();
  const [selectedFamily, setSelectedFamily] = useState(null);

  const weekKey = getWeekKey(new Date());

  return (
    <div>
      <SectionHeader
        title="Family Accounts"
        subtitle={`${state.families.length} registered family accounts`}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {state.families.map(family => {
          const plan = (state.weeklyPlans[family.id] || {})[weekKey] || {};
          const days = Object.keys(plan);
          const totalMealsPlanned = days.reduce((sum, d) => {
            return sum + Object.values(plan[d]).reduce((s, meals) => s + (meals || []).filter(m => m.recipeId).length, 0);
          }, 0);

          return (
            <Card key={family.id} onClick={() => setSelectedFamily(selectedFamily?.id === family.id ? null : family)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{family.name}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)" }}>
                    {family.members.length} members · {totalMealsPlanned} meals planned this week
                  </p>
                </div>
                <span style={{ fontSize: 28 }}>👨‍👩‍👧‍👦</span>
              </div>
              <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {family.members.map(m => (
                  <span key={m.id} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: m.type === "guest" ? "rgba(251,146,60,0.15)" : "var(--surface)",
                    border: `1px solid ${m.type === "guest" ? "#f97316" : "var(--border)"}`,
                    borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "var(--text)",
                  }}>
                    {m.type === "guest" ? "👤" : "👥"} {m.name}
                    {m.dietaryNotes && <span style={{ color: "#f59e0b" }}>⚠</span>}
                  </span>
                ))}
              </div>
              {selectedFamily?.id === family.id && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Member Details</h4>
                  {family.members.map(m => (
                    <div key={m.id} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                      <span style={{ fontWeight: 600, color: "var(--text)", flex: 1 }}>{m.name}</span>
                      <span style={{ color: "var(--text-secondary)" }}>Age {m.age}</span>
                      {m.dietaryNotes && <span style={{ color: "#f59e0b" }}>⚠ {m.dietaryNotes}</span>}
                      <span style={{ color: m.type === "guest" ? "#f97316" : "var(--accent)", fontWeight: 600 }}>{m.type}</span>
                    </div>
                  ))}

                  <h4 style={{ margin: "16px 0 10px", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>This Week's Plan</h4>
                  {days.length === 0 ? (
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>No meals planned yet.</p>
                  ) : (
                    ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => {
                      const dayPlan = plan[day];
                      if (!dayPlan) return null;
                      return (
                        <div key={day} style={{ marginBottom: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{day}</span>
                          {["Breakfast","Lunch","Dinner","Snack"].map(mt => {
                            const assignments = (dayPlan[mt] || []).filter(a => a.recipeId);
                            if (!assignments.length) return null;
                            const recipes = [...new Set(assignments.map(a => a.recipeId))].map(rid => state.recipes.find(r => r.id === rid)?.name).filter(Boolean);
                            return (
                              <div key={mt} style={{ fontSize: 12, color: "var(--text-secondary)", paddingLeft: 12 }}>
                                {mt}: {recipes.join(", ")}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </Card>
          );
        })}
        {state.families.length === 0 && <EmptyState icon="👨‍👩‍👧" title="No families yet" subtitle="Families will appear here once users register." />}
      </div>
    </div>
  );
}
