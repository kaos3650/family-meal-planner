import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button, Modal, SectionHeader, EmptyState } from "../shared/UI";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
const TAG_COLORS = { "high-protein":"#4a90d9","low-calorie":"#22c55e","high-fibre":"#84cc16","vegan":"#22c55e","vegetarian":"#84cc16","gluten-free":"#f59e0b","dairy-free":"#f97316","quick":"#ec4899","meal-prep":"#a855f7" };
const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙", Snack: "🍎" };

// Recipe picker modal
function RecipePicker({ members, currentAssignments, onSave, onClose }) {
  const { state } = useApp();
  const [assignments, setAssignments] = useState(
    members.reduce((acc, m) => {
      const existing = currentAssignments.find(a => a.memberId === m.id);
      acc[m.id] = { eating: existing ? true : currentAssignments.length === 0 ? true : !!existing, recipeId: existing?.recipeId || "" };
      return acc;
    }, {})
  );
  const [search, setSearch] = useState("");

  const toggleEating = (memberId) => setAssignments(a => ({ ...a, [memberId]: { ...a[memberId], eating: !a[memberId].eating } }));
  const setRecipe = (memberId, recipeId) => setAssignments(a => ({ ...a, [memberId]: { ...a[memberId], recipeId } }));
  const setAllRecipe = (recipeId) => {
    setAssignments(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => { if (next[id].eating) next[id] = { ...next[id], recipeId }; });
      return next;
    });
  };

  const filtered = state.recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    const result = members
      .filter(m => assignments[m.id]?.eating)
      .map(m => ({ memberId: m.id, recipeId: assignments[m.id]?.recipeId || "" }));
    onSave(result);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Who's eating */}
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>Who's eating this meal?</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {members.map(m => (
            <button key={m.id} onClick={() => toggleEating(m.id)} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: assignments[m.id]?.eating ? "var(--accent)" : "transparent",
              color: assignments[m.id]?.eating ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${assignments[m.id]?.eating ? "var(--accent)" : "var(--border)"}`,
              transition: "all 0.1s",
            }}>{m.name}</button>
          ))}
        </div>
      </div>

      {/* Set same recipe for everyone */}
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>
          Set same recipe for everyone
        </p>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search recipes..."
          style={{ width: "100%", background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text)", outline: "none", boxSizing: "border-box", marginBottom: 8 }}
        />
        <div style={{ maxHeight: 180, overflow: "auto", border: "1px solid var(--border)", borderRadius: 10 }}>
          <div onClick={() => setAllRecipe("")} style={{ padding: "8px 12px", cursor: "pointer", fontSize: 13, color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
            — No meal / skip
          </div>
          {filtered.map(r => (
            <div key={r.id} onClick={() => setAllRecipe(r.id)} style={{
              padding: "8px 12px", cursor: "pointer", fontSize: 13,
              color: "var(--text)", borderBottom: "1px solid var(--border)",
              background: "transparent",
              display: "flex", justifyContent: "space-between",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span>{r.name}</span>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{r.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-member assignments */}
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>
          Or set individual recipes
        </p>
        {members.map(m => {
          if (!assignments[m.id]?.eating) return null;
          return (
            <div key={m.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", minWidth: 70 }}>{m.name}</span>
              <select value={assignments[m.id]?.recipeId || ""} onChange={e => setRecipe(m.id, e.target.value)}
                style={{ flex: 1, background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 10px", fontSize: 13, color: "var(--text)", outline: "none" }}>
                <option value="">— Skip this meal —</option>
                {state.recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Meal</Button>
      </div>
    </div>
  );
}

function MealCell({ day, mealType, assignments, members, onEdit }) {
  const { state } = useApp();
  const active = (assignments || []).filter(a => a.recipeId);
  const recipeMap = {};
  active.forEach(a => {
    if (!recipeMap[a.recipeId]) recipeMap[a.recipeId] = [];
    const m = members.find(x => x.id === a.memberId);
    if (m) recipeMap[a.recipeId].push(m.name);
  });

  return (
    <div
      onClick={onEdit}
      style={{
        minHeight: 64, border: "1px dashed var(--border)", borderRadius: 10,
        padding: 8, cursor: "pointer", transition: "all 0.15s",
        background: active.length > 0 ? "rgba(74,144,217,0.05)" : "transparent",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(74,144,217,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = active.length > 0 ? "rgba(74,144,217,0.05)" : "transparent"; }}
    >
      {Object.keys(recipeMap).length === 0 ? (
        <div style={{ fontSize: 11, color: "var(--text-secondary)", textAlign: "center", paddingTop: 8 }}>+ Add</div>
      ) : (
        Object.entries(recipeMap).map(([recipeId, memberNames]) => {
          const recipe = state.recipes.find(r => r.id === recipeId);
          return (
            <div key={recipeId} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", lineHeight: 1.2 }}>{recipe?.name || "?"}</div>
              <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>{memberNames.join(", ")}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default function WeeklyPlanner() {
  const { state, dispatch, getUserFamily, getWeekKey } = useApp();
  const family = getUserFamily();
  const [editCell, setEditCell] = useState(null); // { day, mealType }
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  const weekKey = getWeekKey(new Date());
  const plan = (state.weeklyPlans[family?.id] || {})[weekKey] || {};

  if (!family) return <EmptyState icon="👨‍👩‍👧" title="No family found" subtitle="Set up your family first." />;

  const handleSave = (assignments) => {
    if (!editCell) return;
    dispatch({ type: "SET_MEAL_PLAN", payload: { familyId: family.id, weekKey, day: editCell.day, mealType: editCell.mealType, assignments } });
    setEditCell(null);
  };

  // Get current assignments for edit cell
  const currentAssignments = editCell ? ((plan[editCell.day] || {})[editCell.mealType] || []) : [];

  return (
    <div>
      <SectionHeader
        title="Weekly Meal Planner"
        subtitle={`Week of ${weekKey}`}
      />

      {/* Grid view */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", background: "var(--surface)", borderRadius: "8px 0 0 8px", width: 90 }}>Meal</th>
              {DAYS.map((day, i) => (
                <th key={day} style={{ padding: "8px 8px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", background: "var(--surface)", borderRight: i < 6 ? "1px solid var(--border)" : "none" }}>
                  <div>{day.slice(0, 3)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEAL_TYPES.map(mealType => (
              <tr key={mealType}>
                <td style={{ padding: "6px 12px", fontSize: 13, fontWeight: 700, color: "var(--text)", verticalAlign: "top" }}>
                  <span style={{ fontSize: 16 }}>{MEAL_ICONS[mealType]}</span><br />
                  <span style={{ fontSize: 11 }}>{mealType}</span>
                </td>
                {DAYS.map((day, i) => (
                  <td key={day} style={{ padding: "4px 4px", verticalAlign: "top", borderLeft: "1px solid var(--border)" }}>
                    <MealCell
                      day={day} mealType={mealType}
                      assignments={(plan[day] || {})[mealType] || []}
                      members={family.members}
                      onEdit={() => setEditCell({ day, mealType })}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick summary */}
      <div style={{ marginTop: 24, padding: 16, background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>This Week at a Glance</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {DAYS.map(day => {
            const dayPlan = plan[day] || {};
            const count = Object.values(dayPlan).reduce((s, a) => s + (a || []).filter(x => x.recipeId).length, 0);
            return (
              <div key={day} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 2 }}>{day.slice(0, 3)}</div>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: count > 0 ? "var(--accent)" : "var(--border)",
                  color: count > 0 ? "#fff" : "var(--text-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                }}>{count}</div>
              </div>
            );
          })}
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--text-secondary)" }}>
          Numbers show total meal assignments per day. Click any cell to add or change meals.
        </p>
      </div>

      {editCell && (
        <Modal title={`${MEAL_ICONS[editCell.mealType]} ${editCell.mealType} — ${editCell.day}`} onClose={() => setEditCell(null)} width={580}>
          <RecipePicker
            members={family.members}
            currentAssignments={currentAssignments}
            onSave={handleSave}
            onClose={() => setEditCell(null)}
          />
        </Modal>
      )}
    </div>
  );
}
