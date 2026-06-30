# 🥗 FamilyPlate — Family Meal Planner

A full-featured family meal planning app with an admin interface and family user accounts.

## Features

- 👨‍👩‍👧 **Family accounts** with staple members and temporary guests
- 📅 **Weekly meal planner** — assign different recipes to different family members per meal
- 📖 **Recipe library** — searchable and filterable by category and dietary tags
- 🛒 **Auto-generated shopping list** — aggregated from the week's meals, with a recipe breakdown view
- 🛠 **Admin panel** — manage ingredients (with full nutrition data), recipes, and view all family accounts
- 🔒 **Two-role system** — admin sees everything; families only see their own data and the recipe library

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mealplanner.com | admin123 |
| Family | sarah@example.com | user123 |

---

## How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- A free [GitHub account](https://github.com)
- [Git](https://git-scm.com/) installed on your computer

### Step 1 — Install Node.js
Go to https://nodejs.org and download the **LTS** version. Install it with all defaults.

To check it worked, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
```
node --version
```
You should see something like `v20.x.x`.

### Step 2 — Download this project
Save all the project files into a folder on your computer called `family-meal-planner`.

### Step 3 — Open a terminal in the project folder
- **Mac**: Right-click the folder → "New Terminal at Folder"
- **Windows**: Open the folder, then type `cmd` in the address bar and press Enter

### Step 4 — Install dependencies
In the terminal, type:
```
npm install
```
Wait for it to finish (may take a minute).

### Step 5 — Run the app locally
```
npm start
```
Your browser will open automatically at `http://localhost:3000`. The app is running!

---

## How to Deploy to GitHub (Free Hosting)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up for a free account if you don't have one.

### Step 2 — Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it exactly: `family-meal-planner`
3. Leave it set to **Public**
4. Do **NOT** tick "Add a README" (we already have one)
5. Click **Create repository**

### Step 3 — Update the homepage URL in package.json
Open `package.json` and change this line:
```
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/family-meal-planner",
```
Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username. For example, if your username is `johnsmith`:
```
"homepage": "https://johnsmith.github.io/family-meal-planner",
```

### Step 4 — Upload your code to GitHub
Back in the terminal (in your project folder), run these commands one at a time:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/family-meal-planner.git
git push -u origin main
```

Again, replace `YOUR-GITHUB-USERNAME` with your actual username.

If asked for a password, GitHub now uses a **Personal Access Token** instead. Here's how to get one:
1. Go to GitHub → Click your profile picture → **Settings**
2. Scroll down to **Developer settings** (bottom left)
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token**
4. Give it a name, set expiry to 90 days, tick the **repo** checkbox
5. Click **Generate token** and copy it — use this as your password

### Step 5 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 6 — Trigger the deployment
The deployment runs automatically when you push code. Go to your repository → **Actions** tab — you'll see a workflow running. Wait 2–3 minutes.

### Step 7 — Visit your live app!
Your app will be live at:
```
https://YOUR-GITHUB-USERNAME.github.io/family-meal-planner
```

---

## Project Structure

```
family-meal-planner/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── App.jsx                 # Root component + routing
│   ├── index.js                # React entry point
│   ├── context/
│   │   └── AppContext.jsx      # Global state (all data + actions)
│   ├── data/
│   │   └── seedData.js         # Ingredients, recipes, demo accounts
│   └── components/
│       ├── shared/
│       │   ├── UI.jsx          # Reusable UI components
│       │   └── LoginPage.jsx   # Login screen
│       ├── admin/
│       │   ├── AdminDashboard.jsx
│       │   ├── AdminIngredients.jsx
│       │   ├── AdminRecipes.jsx
│       │   └── AdminFamilies.jsx
│       └── user/
│           ├── UserDashboard.jsx
│           ├── FamilyManager.jsx
│           ├── WeeklyPlanner.jsx
│           ├── RecipeBrowser.jsx
│           └── ShoppingList.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy to GitHub Pages
├── package.json
└── .gitignore
```

## Data & Privacy
All data is stored in your browser's **localStorage** — nothing is sent to any server. Each user's data stays on their own device.

## Making Changes
After editing any file, the app updates live in your browser (while running `npm start`). To publish changes to GitHub:
```bash
git add .
git commit -m "Describe what you changed"
git push
```
GitHub Actions will automatically redeploy within a few minutes.
