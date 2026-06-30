import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card, Button, Input, Modal, SectionHeader } from "../shared/UI";

function MemberForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { name: "", age: "", type: "staple", dietaryNotes: "" });
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Input label="Name" value={form.name} onChange={set("name")} placeholder="e.g. Emma" />
      <Input label="Age" type="number" value={form.age} onChange={set("age")} placeholder="e.g. 8" min="0" max="120" />
      <div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 8 }}>Member Type</span>
        <div style={{ display: "flex", gap: 10 }}>
          {["staple", "guest"].map(t => (
            <button key={t} onClick={() => set("type")(t)} style={{
              flex: 1, padding: "9px 14px", borderRadius: 9, border: `2px solid ${form.type === t ? "var(--accent)" : "var(--border)"}`,
              background: form.type === t ? "rgba(74,144,217,0.1)" : "transparent",
              color: form.type === t ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: 600, cursor: "pointer", fontSize: 13,
            }}>
              {t === "staple" ? "👥 Staple Member" : "👤 Guest"}
            </button>
          ))}
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--text-secondary)" }}>
          {form.type === "guest" ? "Guests are temporary members added when needed." : "Staple members are always part of your family."}
        </p>
      </div>
      <Input label="Dietary Notes (optional)" value={form.dietaryNotes} onChange={set("dietaryNotes")} placeholder="e.g. lactose intolerant, no nuts" />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={!form.name.trim()}>Save</Button>
      </div>
    </div>
  );
}

export default function FamilyManager() {
  const { state, dispatch, getUserFamily } = useApp();
  const family = getUserFamily();
  const [showAdd, setShowAdd] = useState(false);
  const [editMember, setEditMember] = useState(null);

  if (!family) return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍👩‍👧</div>
      <p style={{ color: "var(--text-secondary)" }}>No family account found.</p>
    </div>
  );

  const staple = family.members.filter(m => m.type === "staple");
  const guests = family.members.filter(m => m.type === "guest");

  const handleAdd = (form) => {
    const newMember = { ...form, id: `mem_${Date.now()}`, age: +form.age };
    const updated = { ...family, members: [...family.members, newMember] };
    dispatch({ type: "UPDATE_FAMILY", payload: updated });
    setShowAdd(false);
  };

  const handleEdit = (form) => {
    const updated = { ...family, members: family.members.map(m => m.id === editMember.id ? { ...editMember, ...form, age: +form.age } : m) };
    dispatch({ type: "UPDATE_FAMILY", payload: updated });
    setEditMember(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this family member?")) {
      const updated = { ...family, members: family.members.filter(m => m.id !== id) };
      dispatch({ type: "UPDATE_FAMILY", payload: updated });
    }
  };

  const MemberCard = ({ member }) => (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
      background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: member.type === "guest" ? "rgba(249,115,22,0.15)" : "rgba(74,144,217,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
      }}>
        {member.type === "guest" ? "👤" : "👥"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{member.name}</div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
          {member.age ? `Age ${member.age}` : "Age not set"}
          {member.dietaryNotes && <span style={{ color: "#f59e0b", marginLeft: 8 }}>⚠ {member.dietaryNotes}</span>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <Button size="sm" variant="ghost" onClick={() => setEditMember(member)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => handleDelete(member.id)}>Remove</Button>
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader
        title="Our Family"
        subtitle={family.name}
        action={<Button onClick={() => setShowAdd(true)}>+ Add Member</Button>}
      />

      {/* Staple members */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>
          👥 Staple Members ({staple.length})
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {staple.map(m => <MemberCard key={m.id} member={m} />)}
          {staple.length === 0 && (
            <div style={{ padding: 20, textAlign: "center", color: "var(--text-secondary)", fontSize: 14, background: "var(--surface)", borderRadius: 12, border: "1px dashed var(--border)" }}>
              No staple members yet. Add your family!
            </div>
          )}
        </div>
      </div>

      {/* Guests */}
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>
          👤 Guests ({guests.length})
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {guests.map(m => <MemberCard key={m.id} member={m} />)}
          {guests.length === 0 && (
            <div style={{ padding: 20, textAlign: "center", color: "var(--text-secondary)", fontSize: 14, background: "var(--surface)", borderRadius: 12, border: "1px dashed var(--border)" }}>
              No guests added. Add temporary guests as needed for special occasions.
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <Modal title="Add Family Member" onClose={() => setShowAdd(false)}>
          <MemberForm onSave={handleAdd} onClose={() => setShowAdd(false)} />
        </Modal>
      )}
      {editMember && (
        <Modal title="Edit Member" onClose={() => setEditMember(null)}>
          <MemberForm initial={editMember} onSave={handleEdit} onClose={() => setEditMember(null)} />
        </Modal>
      )}
    </div>
  );
}
