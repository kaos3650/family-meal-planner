import React, { createContext, useContext, useReducer, useEffect } from "react";
import { initialIngredients, initialRecipes, initialFamilies, DEMO_ACCOUNTS } from "../data/seedData";

const AppContext = createContext(null);

const initialState = {
  currentUser: null,
  ingredients: initialIngredients,
  recipes: initialRecipes,
  families: initialFamilies,
  // weeklyPlans: { [familyId]: { [weekKey]: { [day]: { Breakfast: [{memberId, recipeId}], Lunch: [...], Dinner: [...], Snack: [...] } } } }
  weeklyPlans: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };

    // ─── INGREDIENTS ──────────────────────────────────────────────
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "UPDATE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map(i => i.id === action.payload.id ? action.payload : i)
      };
    case "DELETE_INGREDIENT":
      return { ...state, ingredients: state.ingredients.filter(i => i.id !== action.payload) };

    // ─── RECIPES ──────────────────────────────────────────────────
    case "ADD_RECIPE":
      return { ...state, recipes: [...state.recipes, action.payload] };
    case "UPDATE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map(r => r.id === action.payload.id ? action.payload : r)
      };
    case "DELETE_RECIPE":
      return { ...state, recipes: state.recipes.filter(r => r.id !== action.payload) };

    // ─── FAMILIES ─────────────────────────────────────────────────
    case "UPDATE_FAMILY":
      return {
        ...state,
        families: state.families.map(f => f.id === action.payload.id ? action.payload : f)
      };
    case "ADD_FAMILY":
      return { ...state, families: [...state.families, action.payload] };

    // ─── WEEKLY PLAN ──────────────────────────────────────────────
    case "SET_MEAL_PLAN":
      // payload: { familyId, weekKey, day, mealType, assignments }
      // assignments: [ { memberId, recipeId } ]
      const { familyId, weekKey, day, mealType, assignments } = action.payload;
      return {
        ...state,
        weeklyPlans: {
          ...state.weeklyPlans,
          [familyId]: {
            ...(state.weeklyPlans[familyId] || {}),
            [weekKey]: {
              ...((state.weeklyPlans[familyId] || {})[weekKey] || {}),
              [day]: {
                ...(((state.weeklyPlans[familyId] || {})[weekKey] || {})[day] || {}),
                [mealType]: assignments,
              }
            }
          }
        }
      };

    default:
      return state;
  }
}

// ─── LOCAL STORAGE PERSISTENCE ───────────────────────────────────────────────
const STORAGE_KEY = "familyMealPlannerState";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed, currentUser: null };
    }
  } catch (e) {}
  return initialState;
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    const { currentUser, ...toSave } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  // ─── AUTH ────────────────────────────────────────────────────────
  const login = (email, password) => {
    const account = Object.values(DEMO_ACCOUNTS).find(
      a => a.email === email && a.password === password
    );
    if (!account) return false;
    const user = {
      ...account,
      id: account.role === "admin" ? "admin_1" : "user_1",
    };
    dispatch({ type: "LOGIN", payload: user });
    return true;
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  // ─── HELPERS ─────────────────────────────────────────────────────
  const getUserFamily = () => {
    if (!state.currentUser?.familyId) return null;
    return state.families.find(f => f.id === state.currentUser.familyId) || null;
  };

  const calcRecipeNutrition = (recipe) => {
    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
    recipe.ingredients.forEach(({ ingredientId, amount }) => {
      const ing = state.ingredients.find(i => i.id === ingredientId);
      if (!ing) return;
      const factor = amount / 100;
      totals.calories += (ing.calories || 0) * factor;
      totals.protein += (ing.protein || 0) * factor;
      totals.carbs += (ing.carbs || 0) * factor;
      totals.fat += (ing.fat || 0) * factor;
      totals.fibre += (ing.fibre || 0) * factor;
    });
    // Per serving
    return {
      calories: Math.round(totals.calories / recipe.servings),
      protein: Math.round((totals.protein / recipe.servings) * 10) / 10,
      carbs: Math.round((totals.carbs / recipe.servings) * 10) / 10,
      fat: Math.round((totals.fat / recipe.servings) * 10) / 10,
      fibre: Math.round((totals.fibre / recipe.servings) * 10) / 10,
    };
  };

  const getWeekKey = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay() + 1); // Monday
    return d.toISOString().split("T")[0];
  };

  const getCurrentWeekPlan = (familyId) => {
    const weekKey = getWeekKey(new Date());
    return (state.weeklyPlans[familyId] || {})[weekKey] || {};
  };

  const getWeekPlan = (familyId, weekKey) => {
    return (state.weeklyPlans[familyId] || {})[weekKey] || {};
  };

  const generateShoppingList = (familyId, weekKey) => {
    const plan = getWeekPlan(familyId, weekKey);
    const family = state.families.find(f => f.id === familyId);
    if (!family) return { totals: {}, breakdown: [] };

    // Gather all recipe assignments
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    const totals = {}; // { ingredientId: { amount, unit, name } }
    const breakdown = []; // [ { day, mealType, recipeName, memberNames, ingredients: [...] } ]

    days.forEach(day => {
      mealTypes.forEach(mealType => {
        const assignments = (plan[day] || {})[mealType] || [];
        // Group by recipe
        const recipeCounts = {};
        assignments.forEach(({ memberId, recipeId }) => {
          if (!recipeId) return;
          if (!recipeCounts[recipeId]) recipeCounts[recipeId] = [];
          const member = family.members.find(m => m.id === memberId);
          if (member) recipeCounts[recipeId].push(member.name);
        });

        Object.entries(recipeCounts).forEach(([recipeId, memberNames]) => {
          const recipe = state.recipes.find(r => r.id === recipeId);
          if (!recipe) return;
          const portionFactor = memberNames.length / recipe.servings;

          const recipeIngredients = recipe.ingredients.map(({ ingredientId, amount }) => {
            const ing = state.ingredients.find(i => i.id === ingredientId);
            if (!ing) return null;
            const scaledAmount = Math.round(amount * portionFactor);
            return { ingredientId, name: ing.name, amount: scaledAmount, unit: ing.unit, category: ing.category };
          }).filter(Boolean);

          breakdown.push({ day, mealType, recipeName: recipe.name, memberNames, ingredients: recipeIngredients });

          recipeIngredients.forEach(({ ingredientId, name, amount, unit, category }) => {
            if (!totals[ingredientId]) totals[ingredientId] = { name, amount: 0, unit, category };
            totals[ingredientId].amount += amount;
          });
        });
      });
    });

    return { totals, breakdown };
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      login,
      logout,
      getUserFamily,
      calcRecipeNutrition,
      getWeekKey,
      getCurrentWeekPlan,
      getWeekPlan,
      generateShoppingList,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
