import React from "react";

// ─── MACRO BADGE ─────────────────────────────────────────────────────────────
export function MacroBadge({ label, value, unit = "g", color }) {
  const colors = {
    calories: "#e07b39",
    protein: "#4a90d9",
    carbs: "#e8c84a",
    fat: "#a855f7",
    fibre: "#22c55e",
  };
  return (
    <span style={{
      display: "inline-flex", flexDirection: "column", alignItems: "center",
      background: colors[color] + "22", border: `1px solid ${colors[color]}44`,
      borderRadius: 8, padding: "4px 10px", minWidth: 60,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: colors[color] }}>{value}{unit}</span>
      <span style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
    </span>
  );
}

// ─── NUTRITION ROW ────────────────────────────────────────────────────────────
export function NutritionRow({ nutrition }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0" }}>
      <MacroBadge label="Cals" value={nutrition.calories} unit="kcal" color="calories" />
      <MacroBadge label="Protein" value={nutrition.protein} color="protein" />
      <MacroBadge label="Carbs" value={nutrition.carbs} color="carbs" />
      <MacroBadge label="Fat" value={nutrition.fat} color="fat" />
      <MacroBadge label="Fibre" value={nutrition.fibre} color="fibre" />
    </div>
  );
}

// ─── TAG ──────────────────────────────────────────────────────────────────────
export function Tag({ label, color = "#4a90d9" }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, background: color + "22",
      color: color, border: `1px solid ${color}44`,
      borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: 14, padding: "18px 20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.15s, box-shadow 0.15s",
      ...style,
    }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)"; }}}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"; }}
    >
      {children}
    </div>
  );
}

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export function Button({ children, onClick, variant = "primary", size = "md", disabled = false, style = {} }) {
  const variants = {
    primary: { background: "var(--accent)", color: "#fff", border: "none" },
    secondary: { background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)" },
    danger: { background: "#ef4444", color: "#fff", border: "none" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)" },
  };
  const sizes = {
    sm: { fontSize: 12, padding: "5px 12px", borderRadius: 7 },
    md: { fontSize: 14, padding: "8px 18px", borderRadius: 9 },
    lg: { fontSize: 15, padding: "11px 24px", borderRadius: 11 },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant], ...sizes[size],
        fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s",
        display: "inline-flex", alignItems: "center", gap: 6,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
export function Input({ label, value, onChange, type = "text", placeholder, style = {}, min, max, step }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</span>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} min={min} max={max} step={step}
        style={{
          background: "var(--input-bg)", border: "1px solid var(--border)",
          borderRadius: 8, padding: "8px 12px", fontSize: 14,
          color: "var(--text)", outline: "none",
          transition: "border-color 0.15s",
          ...style,
        }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"}
      />
    </label>
  );
}

// ─── SELECT ───────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, options, style = {} }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</span>}
      <select
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          background: "var(--input-bg)", border: "1px solid var(--border)",
          borderRadius: 8, padding: "8px 12px", fontSize: 14,
          color: "var(--text)", outline: "none", cursor: "pointer",
          ...style,
        }}
      >
        {options.map(opt => (
          typeof opt === "string"
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children, width = 560 }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 20,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "var(--card)", borderRadius: 16, width: "100%", maxWidth: width,
        maxHeight: "90vh", overflow: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 24px", borderBottom: "1px solid var(--border)",
          position: "sticky", top: 0, background: "var(--card)", zIndex: 1,
        }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 20, color: "var(--text-secondary)", lineHeight: 1,
          }}>✕</button>
        </div>
        <div style={{ padding: "20px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "4px", background: "var(--surface)", borderRadius: 12, width: "fit-content" }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: "7px 16px", fontSize: 13, fontWeight: 600,
            borderRadius: 9, border: "none", cursor: "pointer",
            background: activeTab === tab ? "var(--accent)" : "transparent",
            color: activeTab === tab ? "#fff" : "var(--text-secondary)",
            transition: "all 0.15s",
          }}
        >{tab}</button>
      ))}
    </div>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text-secondary)" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 14 }}>{subtitle}</div>}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text)" }}>{title}</h2>
        {subtitle && <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--text-secondary)" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
