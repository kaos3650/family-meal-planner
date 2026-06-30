import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RECIPE_CATEGORIES } from "../../data/seedData";
import { Card, Tag, NutritionRow, SectionHeader, EmptyState, Tabs } from "../shared/UI";

const TAG_COLORS = { "high-protein":"#4a90d9","low-calorie":"#22c55e","high-fibre":"#84cc16","vegan":"#22c55e","vegetarian":"#84cc16","gluten-free":"#f59e0b","dairy-free":"#f97316","quick":"#ec4899","meal-prep":"#a855f7","no-cook":"#14b8a6","family-friendly":"#f59e0b","omega-3":"#0ea5e9" };
const FILTER_TAGS = ["high-protein","low-calorie","high-fibre","vegan","vegetarian","gluten-free","quick","meal-prep"];

function RecipeDetailModal({ recipe, onClose }) {
  const { calcRecipeNutrition, state } = useApp();
  const nutrition = calcRecipeNutrition(recipe);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "var(--card)", borderRadius: 18, width: "100%", maxWidth: 640, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 0", position: "sticky", top: 0, background: "var(--card)", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, background: "var(--accent)", color: "#fff", borderRadius: 6, padding: "2px 8px" }}>{recipe.category}</span>
              <h2 style={{ margin: "8px 0 4px", fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: -0.5 }}>{recipe.name}</h2>
              <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>{recipe.description}</p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "var(--text-secondary)", flexShrink: 0, marginLeft: 10 }}>✕</button>
          </div>

          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }}>
            <span>⏱ Prep: {recipe.prepTime} mins</span>
            <span>🔥 Cook: {recipe.cookTime} mins</span>
            <span>🍽 Serves: {recipe.servings}</span>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {recipe.tags?.map(t => <Tag key={t} label={t} color={TAG_COLORS[t] || "#4a90d9"} />)}
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>Per serving</p>
            <NutritionRow nutrition={nutrition} />
          </div>
          <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 20 }} />
        </div>

        <div style={{ padding: "0 28px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Ingredients */}
          <div>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Ingredients</h3>
            {recipe.ingredients.map(({ ingredientId, amount }, i) => {
              const ing = state.ingredients.find(x => x.id === ingredientId);
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <span style={{ color: "var(--text)" }}>{ing?.name || "Unknown"}</span>
                  <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{amount}{ing?.unit || "g"}</span>
                </div>
              );
            })}
          </div>

          {/* Instructions */}
          <div>
            <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Method</h3>
            {recipe.instructions.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <span style={{ minWidth: 22, height: 22, borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ margin: 0, fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecipeBrowser() {
  const { state, calcRecipeNutrition } = useApp();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [activeTags, setActiveTags] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const toggleTag = (tag) => setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filtered = state.recipes.filter(r => {
    const matchCat = filterCat === "All" || r.category === filterCat;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase());
    const matchTags = activeTags.length === 0 || activeTags.every(t => r.tags?.includes(t));
    return matchCat && matchSearch && matchTags;
  });

  return (
    <div>
      <SectionHeader title="Recipe Library" subtitle="Browse our full recipe collection" />

      {/* Search & filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search recipes..."
          style={{ flex: 1, minWidth: 180, background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 14px", fontSize: 14, color: "var(--text)", outline: "none" }}
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ background: "var(--input-bg)", border: "1px solid var(--border)", borderRadius: 9, padding: "8px 12px", fontSize: 13, color: "var(--text)", outline: "none" }}>
          <option value="All">All categories</option>
          {RECIPE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Tag filters */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {FILTER_TAGS.map(tag => (
          <button key={tag} onClick={() => toggleTag(tag)} style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: activeTags.includes(tag) ? (TAG_COLORS[tag] || "#4a90d9") : "transparent",
            color: activeTags.includes(tag) ? "#fff" : "var(--text-secondary)",
            border: `1px solid ${TAG_COLORS[tag] || "#4a90d9"}55`,
            transition: "all 0.1s",
          }}>{tag}</button>
        ))}
      </div>

      <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--text-secondary)" }}>{filtered.length} recipes found</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.map(recipe => {
          const nutrition = calcRecipeNutrition(recipe);
          return (
            <Card key={recipe.id} onClick={() => setSelectedRecipe(recipe)} style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, background: "var(--accent)", color: "#fff", borderRadius: 6, padding: "2px 8px" }}>{recipe.category}</span>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>⏱ {recipe.prepTime + recipe.cookTime}m</span>
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{recipe.name}</h3>
              <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {recipe.description}
              </p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                {recipe.tags?.slice(0, 3).map(t => <Tag key={t} label={t} color={TAG_COLORS[t] || "#4a90d9"} />)}
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                <span style={{ color: "#e07b39", fontWeight: 700 }}>{nutrition.calories} kcal</span>
                <span style={{ color: "#4a90d9" }}>P: {nutrition.protein}g</span>
                <span style={{ color: "#e8c84a" }}>C: {nutrition.carbs}g</span>
                <span style={{ color: "#a855f7" }}>F: {nutrition.fat}g</span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>Click to view recipe →</p>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && <EmptyState icon="🍽" title="No recipes found" subtitle="Try adjusting your search or filters." />}

      {selectedRecipe && <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </div>
  );
}
