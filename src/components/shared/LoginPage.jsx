import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = login(email, password);
    if (!ok) setError("Invalid email or password.");
    setLoading(false);
  };

  const tryDemo = (type) => {
    if (type === "admin") { setEmail("admin@mealplanner.com"); setPassword("admin123"); }
    else { setEmail("sarah@example.com"); setPassword("user123"); }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      fontFamily: "'Nunito', sans-serif", padding: 20,
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo/Title */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🥗</div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>
            FamilyPlate
          </h1>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 15 }}>
            Meal planning for the whole family
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20,
          padding: "32px 32px",
        }}>
          <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: "#fff" }}>Sign in</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>Email</span>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                style={{
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#fff",
                  outline: "none",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>Password</span>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                style={{
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#fff",
                  outline: "none",
                }}
              />
            </label>

            {error && (
              <div style={{ background: "#ef444422", border: "1px solid #ef4444", color: "#fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                color: "#fff", border: "none", borderRadius: 11,
                padding: "12px", fontSize: 15, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, marginTop: 4,
              }}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          {/* Demo buttons */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>
              Try a demo account
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => tryDemo("admin")} style={{
                flex: 1, background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)",
                color: "#a5b4fc", borderRadius: 9, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                🛠 Admin
              </button>
              <button onClick={() => tryDemo("user")} style={{
                flex: 1, background: "rgba(251,146,60,0.2)", border: "1px solid rgba(251,146,60,0.4)",
                color: "#fdba74", borderRadius: 9, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                👨‍👩‍👧 Family
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
