import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { INGREDIENT_CATEGORIES } from "../../data/seedData";
import { Card, Button, Input, Select, Modal, Tag, SectionHeader, EmptyState } from "../shared/UI";

function IngredientForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    name: "", category: INGREDIENT_CATEGORIES[0],
    calories: "", protein: "", carbs: "", fat: "", fibre: "", unit: "g",
  });
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Input label="Ingredient name" value={form.name} onChange={set("name")} placeholder="e.g. Brown Rice" style={{ gridColumn: "1 / -1" }} />
        <Select label="Category" value={form.category} onChange={set("category")} options={INGREDIENT_CATEGORIES} />
        <Select label="Unit" value={form.unit} onChange={set("unit")} options={[{ value: "g", label: "grams (g)" }, { value: "ml", label: "millilitres (ml)" }]} />
      </div>
      <div style={{ background: "var(--surface)", borderRadius: 10, padding: 14 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>
          Nutrition per 100{form.unit}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <Input label="Calories (kcal)" type="number" value={form.calories} onChange={set("calories")} placeholder="0" min="0" step="0.1" />
          <Input label="Protein (g)" type="number" value={form.protein} onChange={set("protein")} placeholder="0" min="0" step="0.1" />
          <Input label="Carbs (g)" type="number" value={form.carbs} onChange={set("carbs")} placeholder="0" min="0" step="0.1" />
          <Input label="Fat (g)" type="number" value={form.fat} onChange={set("fat")} placeholder="0" min="0" step="0.1" />
          <Input label="Fibre (g)" type="number" value={form.fibre} onChange={set("fibre")} placeholder="0" min="0" step="0.1" />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave({ ...form, calories: +form.calories, protein: +form.protein, carbs: +form.carbs, fat: +form.fat, fibre: +form.fibre })} disabled={!form.name.trim()}>
          Save Ingredient
        </Button>
      </div>
    </div>
  );
}

const CAT_COLORS = {
  "Vegetables": "#22c55e", "Pulses & Legumes": "#84cc16", "Dairy & Eggs": "#f59e0b",
  "Meat & Fish": "#ef4444", "Grains & Cereals": "#f97316", "Fruits": "#ec4899",
  "Nuts & Seeds": "#a855f7", "Oils & Fats": "#6366f1", "Herbs & Spices": "#14b8a6",
  "Condiments & Sauces": "#0ea5e9", "Other": "#94a3b8",
};

export default function AdminIngredients() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editIngredient, setEditIngredient] = useState(null);

  const filtered = state.ingredients.filter(i => {
    const matchCat = filterCat === "All" || i.category === filterCat;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const byCategory = INGREDIENT_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = filtered.filter(i => i.category === cat);
    return acc;
  }, {});

  const handleAdd = (form) => {
    dispatch({ type: "ADD_INGREDIENT", payload: { ...form, id: `ing_${Date.now()}` } });
    setShowAdd(false);
  };

  const handleEdit = (form) => {
    dispatch({ type: "UPDATE_INGREDIENT", payload: form });
    setEditIngredient(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this ingredient?")) dispatch({ type: "DELETE_INGREDIENT", payload: id });
  };

  return (
    <div>
      <SectionHeader
        title="Ingredients Database"
        subtitle={`${state.ingredients.length} ingredients across ${INGREDIENT_CATEGORIES.length} categories`}
        action={<Button onClick={() => setShowAdd(true)}>+ Add Ingredient</Button>}
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search ingredients..."
          style={{
            flex: 1, minWidth: 200, background: "var(--input-bg)", border: "1px solid var(--border)",
            borderRadius: 9, padding: "8px 14px", fontSize: 14, color: "var(--text)", outline: "none",
          }}
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{
          background: "var(--input-bg)", border: "1px solid var(--border)",
          borderRadius: 9, padding: "8px 14px", fontSize: 13, color: "var(--text)", outline: "none",
        }}>
          <option value="All">All categories</option>
          {INGREDIENT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Category sections */}
      {INGREDIENT_CATEGORIES.map(cat => {
        const items = byCategory[cat];
        if (!items || items.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: CAT_COLORS[cat], display: "inline-block" }} />
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>
                {cat}
              </h3>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>({items.length})</span>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "var(--surface)" }}>
                    {["Name", "Unit", "Calories", "Protein", "Carbs", "Fat", "Fibre", ""].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "var(--text-secondary)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((ing, idx) => (
                    <tr key={ing.id} style={{ borderTop: "1px solid var(--border)", background: idx % 2 === 0 ? "transparent" : "var(--surface)" }}>
                      <td style={{ padding: "9px 12px", fontWeight: 600, color: "var(--text)" }}>{ing.name}</td>
                      <td style={{ padding: "9px 12px", color: "var(--text-secondary)" }}>per 100{ing.unit}</td>
                      <td style={{ padding: "9px 12px", color: "#e07b39", fontWeight: 600 }}>{ing.calories}</td>
                      <td style={{ padding: "9px 12px", color: "#4a90d9" }}>{ing.protein}g</td>
                      <td style={{ padding: "9px 12px", color: "#e8c84a" }}>{ing.carbs}g</td>
                      <td style={{ padding: "9px 12px", color: "#a855f7" }}>{ing.fat}g</td>
                      <td style={{ padding: "9px 12px", color: "#22c55e" }}>{ing.fibre}g</td>
                      <td style={{ padding: "9px 12px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <Button size="sm" variant="ghost" onClick={() => setEditIngredient(ing)}>Edit</Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(ing.id)}>Del</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && <EmptyState icon="🥕" title="No ingredients found" subtitle="Try adjusting your search or add a new ingredient." />}

      {showAdd && (
        <Modal title="Add Ingredient" onClose={() => setShowAdd(false)}>
          <IngredientForm onSave={handleAdd} onClose={() => setShowAdd(false)} />
        </Modal>
      )}
      {editIngredient && (
        <Modal title="Edit Ingredient" onClose={() => setEditIngredient(null)}>
          <IngredientForm initial={editIngredient} onSave={handleEdit} onClose={() => setEditIngredient(null)} />
        </Modal>
      )}
    </div>
  );
}
