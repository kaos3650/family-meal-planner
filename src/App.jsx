import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import LoginPage from "./components/shared/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";

// CSS variables for theming
const globalStyles = `
  :root {
    --bg: #f0f4f8;
    --card: #ffffff;
    --surface: #f7f9fc;
    --sidebar: #ffffff;
    --border: #e2e8f0;
    --text: #1a202c;
    --text-secondary: #64748b;
    --accent: #4a90d9;
    --input-bg: #f7f9fc;
    --font: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: var(--font); background: var(--bg); color: var(--text); }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  input, select, textarea, button { font-family: inherit; }
  a { color: var(--accent); }
`;

function AppRouter() {
  const { state } = useApp();

  if (!state.currentUser) return <LoginPage />;
  if (state.currentUser.role === "admin") return <AdminDashboard />;
  return <UserDashboard />;
}

export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </>
  );
}
