import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RECIPE_CATEGORIES } from "../../data/seedData";
import { Card, Button, Input, Select, Modal, Tag, SectionHeader, EmptyState, NutritionRow, Tabs } from "../shared/UI";

const TAG_OPTIONS = ["high-protein","low-calorie","high-fibre","vegan","vegetarian","gluten-free","dairy-free","quick","meal-prep","no-cook","family-friendly","omega-3"];
const TAG_COLORS = { "high-protein":"#4a90d9","low-calorie":"#22c55e","high-fibre":"#84cc16","vegan":"#22c55e","vegetarian":"#84cc16","gluten-free":"#f59e0b","dairy-free":"#f97316","quick":"#ec4899","meal-prep":"#a855f7","no-cook":"#14b8a6","family-friendly":"#f59e0b","omega-3":"#0ea5e9" };

function RecipeForm({ initial, onSave, onClose }) {
  const { state } = useApp();
  const [form, setForm] = useState(initial || {
    name: "", category: RECIPE_CATEGORIES[0], description: "", prepTime: 10, cookTime: 20,
    servings: 4, tags: [], instructions: [""], ingredients: [],
  });
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const addInstruction = () => set("instructions")([...form.instructions, ""]);
  const updateInstruction = (i, v) => {
    const arr = [...form.instructions]; arr[i] = v; set("instructions")(arr);
  };
  const removeInstruction = (i) => set("instructions")(form.instructions.filter((_, idx) => idx !== i));

  const addIngredient = () => set("ingredients")([...form.ingredients, { ingredientId: state.ingredients[0]?.id || "", amount: 100 }]);
  const updateIngr = (i, k, v) => {
    const arr = [...form.ingredients]; arr[i] = { ...arr[i], [k]: k === "amount" ? +v : v };
    set("ingredients")(arr);
  };
  const removeIngr = (i) => set("ingredients")(form.ingredients.filter((_, idx) => idx !== i));

  const toggleTag = (tag) => {
    const arr = form.tags.includes(tag) ? form.tags.filter(t => t !== tag) : [...form.tags, tag];
    set("tags")(arr);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Basic info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Recipe Name" value={form.name} onChange={set("name")} placeholder="e.g. Chicken Stir Fry" style={{ gridColumn: "1 / -1" }} />
        <Select label="Category" value={form.category} onChange={set("category")} options={RECIPE_CATEGORIES} />
        <Input label="Servings" type="number" value={form.servings} onChange={set("servings")} min="1" max="20" />
        <Input label="Prep Time (mins)" type="number" value={form.prepTime} onChange={set("prepTime")} min="0" />
        <Input label="Cook Time (mins)" type="number" value={form.cookTime} onChange={set("cookTime")} min="0" />
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>Description</span>
        <textarea value={form.description} onChange={e => set("description")(e.target.value)} rows={2}
          style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 14, color: "var(--text)", resize: "vertical", outline: "none" }}
        />
      </label>

      {/* Tags */}
      <div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 8 }}>Tags</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TAG_OPTIONS.map(tag => (
            <button key={tag} onClick={() => toggleTag(tag)} style={{
              padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: "pointer", transition: "all 0.1s",
              background: form.tags.includes(tag) ? (TAG_COLORS[tag] || "#4a90d9") : "transparent",
              color: form.tags.includes(tag) ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${TAG_COLORS[tag] || "#4a90d9"}66`,
            }}>{tag}</button>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>Ingredients</span>
          <Button size="sm" onClick={addIngredient}>+ Add</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {form.ingredients.map((ing, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                {i === 0 && <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Ingredient</span>}
                <select value={ing.ingredientId} onChange={e => updateIngr(i, "ingredientId", e.target.value)}
                  style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: "var(--text)", outline: "none" }}>
                  {state.ingredients.map(ingr => <option key={ingr.id} value={ingr.id}>{ingr.name}</option>)}
                </select>
              </label>
              <label style={{ width: 90, display: "flex", flexDirection: "column", gap: 4 }}>
                {i === 0 && <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Amount</span>}
                <input type="number" value={ing.amount} min="1" onChange={e => updateIngr(i, "amount", e.target.value)}
                  style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: "var(--text)", outline: "none", width: "100%" }}
                />
              </label>
              <span style={{ fontSize: 12, color: "var(--text-secondary)", paddingBottom: 10 }}>
                {state.ingredients.find(x => x.id === ing.ingredientId)?.unit || "g"}
              </span>
              <button onClick={() => removeIngr(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18, paddingBottom: 6 }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>Instructions</span>
          <Button size="sm" onClick={addInstruction}>+ Add Step</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {form.instructions.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ width: 24, height: 24, minWidth: 24, borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginTop: 8 }}>{i + 1}</span>
              <textarea value={step} onChange={e => updateInstruction(i, e.target.value)} rows={2}
                style={{ flex: 1, background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text)", resize: "vertical", outline: "none" }}
              />
              {form.instructions.length > 1 && (
                <button onClick={() => removeInstruction(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18, marginTop: 8 }}>✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={!form.name.trim()}>Save Recipe</Button>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, onEdit, onDelete }) {
  const { calcRecipeNutrition } = useApp();
  const [expanded, setExpanded] = useState(false);
  const nutrition = calcRecipeNutrition(recipe);
  const { state } = useApp();

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: "var(--accent)", color: "#fff", borderRadius: 6, padding: "2px 8px" }}>{recipe.category}</span>
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>⏱ {recipe.prepTime + recipe.cookTime} mins · 🍽 {recipe.servings} servings</span>
          </div>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{recipe.name}</h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.4 }}>{recipe.description}</p>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
            {recipe.tags?.map(t => <Tag key={t} label={t} color={TAG_COLORS[t] || "#4a90d9"} />)}
          </div>
          <NutritionRow nutrition={nutrition} />
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <Button size="sm" variant="ghost" onClick={() => setExpanded(e => !e)}>{expanded ? "Hide" : "View"}</Button>
          <Button size="sm" onClick={() => onEdit(recipe)}>Edit</Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(recipe.id)}>Del</Button>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Ingredients</h4>
              {recipe.ingredients.map(({ ingredientId, amount }, i) => {
                const ing = state.ingredients.find(x => x.id === ingredientId);
                return <div key={i} style={{ fontSize: 13, color: "var(--text)", padding: "3px 0" }}>• {ing?.name || "?"} — {amount}{ing?.unit || "g"}</div>;
              })}
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Instructions</h4>
              {recipe.instructions.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "var(--accent)", minWidth: 18, fontSize: 13 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.4 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AdminRecipes() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const filtered = state.recipes.filter(r => {
    const matchCat = filterCat === "All" || r.category === filterCat;
    const matchTag = filterTag === "All" || (r.tags && r.tags.includes(filterTag));
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchTag && matchSearch;
  });

  const handleAdd = (form) => {
    dispatch({ type: "ADD_RECIPE", payload: { ...form, id: `rec_${Date.now()}`, prepTime: +form.prepTime, cookTime: +form.cookTime, servings: +form.servings } });
    setShowAdd(false);
  };
  const handleEdit = (form) => {
    dispatch({ type: "UPDATE_RECIPE", payload: { ...form, prepTime: +form.prepTime, cookTime: +form.cookTime, servings: +form.servings } });
    setEditRecipe(null);
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this recipe?")) dispatch({ type: "DELETE_RECIPE", payload: id });
  };

  return (
    <div>
      <SectionHeader
        title="Recipe Library"
        subtitle={`${state.recipes.length} recipes available`}
        action={<Button onClick={() => setShowAdd(true)}>+ Add Recipe</Button>}
      />
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search recipes..."
          style={{ flex: 1, minWidth: 180, background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 14px", fontSize: 14, color: "var(--text)", outline: "none" }}
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "var(--text)", outline: "none" }}>
          <option value="All">All categories</option>
          {RECIPE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterTag} onChange={e => setFilterTag(e.target.value)} style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "var(--text)", outline: "none" }}>
          <option value="All">All tags</option>
          {TAG_OPTIONS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} onEdit={setEditRecipe} onDelete={handleDelete} />)}
        {filtered.length === 0 && <EmptyState icon="📖" title="No recipes found" subtitle="Try adjusting your filters or add a new recipe." />}
      </div>

      {showAdd && (
        <Modal title="Add Recipe" onClose={() => setShowAdd(false)} width={700}>
          <RecipeForm onSave={handleAdd} onClose={() => setShowAdd(false)} />
        </Modal>
      )}
      {editRecipe && (
        <Modal title="Edit Recipe" onClose={() => setEditRecipe(null)} width={700}>
          <RecipeForm initial={editRecipe} onSave={handleEdit} onClose={() => setEditRecipe(null)} />
        </Modal>
      )}
    </div>
  );
}
