import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button, SectionHeader, EmptyState, Tabs } from "../shared/UI";
import { INGREDIENT_CATEGORIES } from "../../data/seedData";

const CAT_COLORS = {
  "Vegetables": "#22c55e", "Pulses & Legumes": "#84cc16", "Dairy & Eggs": "#f59e0b",
  "Meat & Fish": "#ef4444", "Grains & Cereals": "#f97316", "Fruits": "#ec4899",
  "Nuts & Seeds": "#a855f7", "Oils & Fats": "#6366f1", "Herbs & Spices": "#14b8a6",
  "Condiments & Sauces": "#0ea5e9", "Other": "#94a3b8",
};

export default function ShoppingList() {
  const { getUserFamily, getWeekKey, generateShoppingList } = useApp();
  const family = getUserFamily();
  const weekKey = getWeekKey(new Date());
  const [activeTab, setActiveTab] = useState("totals");
  const [checked, setChecked] = useState({});
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!family) return <EmptyState icon="🛒" title="No family found" />;

  const { totals, breakdown } = generateShoppingList(family.id, weekKey);
  const totalItems = Object.keys(totals).length;
  const totalMeals = breakdown.length;

  if (totalItems === 0) {
    return (
      <div>
        <SectionHeader title="Shopping List" subtitle="Generated from your weekly meal plan" />
        <EmptyState
          icon="🛒"
          title="No meals planned yet"
          subtitle="Plan your meals for the week first, then your shopping list will appear here."
        />
      </div>
    );
  }

  // Group totals by category
  const byCategory = INGREDIENT_CATEGORIES.reduce((acc, cat) => {
    const items = Object.entries(totals).filter(([, v]) => v.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const toggleCheck = (id) => setChecked(c => ({ ...c, [id]: !c[id] }));
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const handlePrint = () => {
    const lines = ["SHOPPING LIST", `Week of ${weekKey}`, "─────────────────────────────", ""];
    INGREDIENT_CATEGORIES.forEach(cat => {
      const items = byCategory[cat];
      if (!items) return;
      lines.push(cat.toUpperCase());
      items.forEach(([id, v]) => lines.push(`  ☐ ${v.name} — ${v.amount}${v.unit}`));
      lines.push("");
    });
    const w = window.open("", "_blank");
    w.document.write(`<pre style="font-family:monospace;padding:20px;font-size:14px">${lines.join("\n")}</pre>`);
    w.print();
  };

  return (
    <div>
      <SectionHeader
        title="Shopping List"
        subtitle={`${totalItems} ingredients across ${totalMeals} meals`}
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" onClick={handlePrint}>🖨 Print</Button>
          </div>
        }
      />

      {/* Progress */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Items checked off</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>{checkedCount} / {totalItems}</span>
        </div>
        <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "var(--accent)", width: `${(checkedCount / totalItems) * 100}%`, transition: "width 0.3s", borderRadius: 4 }} />
        </div>
        {checkedCount === totalItems && totalItems > 0 && (
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#22c55e", fontWeight: 600 }}>✅ All done! Happy cooking! 🎉</p>
        )}
      </div>

      {/* Tabs */}
      <Tabs tabs={["Shopping List", "Recipe Breakdown"]} activeTab={activeTab === "totals" ? "Shopping List" : "Recipe Breakdown"} onTabChange={t => setActiveTab(t === "Shopping List" ? "totals" : "breakdown")} />
      <div style={{ height: 20 }} />

      {activeTab === "totals" && (
        <div>
          {INGREDIENT_CATEGORIES.map(cat => {
            const items = byCategory[cat];
            if (!items) return null;
            return (
              <div key={cat} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: CAT_COLORS[cat] || "#94a3b8", display: "inline-block" }} />
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>{cat}</h3>
                </div>
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                  {items.map(([id, v], idx) => (
                    <div key={id} onClick={() => toggleCheck(id)} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                      borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none",
                      cursor: "pointer", transition: "background 0.1s",
                      background: checked[id] ? "rgba(74,144,217,0.05)" : "transparent",
                      textDecoration: checked[id] ? "line-through" : "none",
                    }}
                      onMouseEnter={e => { if (!checked[id]) e.currentTarget.style.background = "var(--surface)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = checked[id] ? "rgba(74,144,217,0.05)" : "transparent"; }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                        border: `2px solid ${checked[id] ? "var(--accent)" : "var(--border)"}`,
                        background: checked[id] ? "var(--accent)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, color: "#fff", transition: "all 0.1s",
                      }}>
                        {checked[id] && "✓"}
                      </div>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: checked[id] ? "var(--text-secondary)" : "var(--text)" }}>{v.name}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>{v.amount}{v.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "breakdown" && (
        <div>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--text-secondary)" }}>
            See exactly which ingredients are needed for each recipe.
          </p>
          {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => {
            const dayItems = breakdown.filter(b => b.day === day);
            if (dayItems.length === 0) return null;
            return (
              <div key={day} style={{ marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "var(--text)", paddingBottom: 6, borderBottom: "1px solid var(--border)" }}>{day}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {dayItems.map((item, i) => (
                    <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, background: "var(--surface)", color: "var(--text-secondary)", borderRadius: 6, padding: "2px 8px", marginRight: 8 }}>{item.mealType}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{item.recipeName}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>for {item.memberNames.join(", ")}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {item.ingredients.map((ing, j) => (
                          <span key={j} style={{
                            background: "var(--surface)", border: "1px solid var(--border)",
                            borderRadius: 8, padding: "3px 10px", fontSize: 12, color: "var(--text)",
                          }}>
                            {ing.name} <strong>{ing.amount}{ing.unit}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
