// ─── INGREDIENTS DATABASE ───────────────────────────────────────────────────
// All nutritional values are per 100g
export const INGREDIENT_CATEGORIES = [
  "Vegetables", "Pulses & Legumes", "Dairy & Eggs", "Meat & Fish",
  "Grains & Cereals", "Fruits", "Nuts & Seeds", "Oils & Fats",
  "Herbs & Spices", "Condiments & Sauces", "Other"
];

export const initialIngredients = [
  // Vegetables
  { id: "ing_1", name: "Broccoli", category: "Vegetables", calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fibre: 2.6, unit: "g" },
  { id: "ing_2", name: "Spinach", category: "Vegetables", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fibre: 2.2, unit: "g" },
  { id: "ing_3", name: "Onion", category: "Vegetables", calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fibre: 1.7, unit: "g" },
  { id: "ing_4", name: "Garlic", category: "Vegetables", calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fibre: 2.1, unit: "g" },
  { id: "ing_5", name: "Tomato", category: "Vegetables", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fibre: 1.2, unit: "g" },
  { id: "ing_6", name: "Sweet Potato", category: "Vegetables", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fibre: 3.0, unit: "g" },
  { id: "ing_7", name: "Red Bell Pepper", category: "Vegetables", calories: 31, protein: 1.0, carbs: 6.0, fat: 0.3, fibre: 2.1, unit: "g" },
  { id: "ing_8", name: "Courgette", category: "Vegetables", calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fibre: 1.0, unit: "g" },
  { id: "ing_9", name: "Carrot", category: "Vegetables", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fibre: 2.8, unit: "g" },
  { id: "ing_10", name: "Mushrooms", category: "Vegetables", calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fibre: 1.0, unit: "g" },
  { id: "ing_11", name: "Kale", category: "Vegetables", calories: 35, protein: 2.9, carbs: 4.4, fat: 0.5, fibre: 3.6, unit: "g" },
  { id: "ing_12", name: "Cucumber", category: "Vegetables", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fibre: 0.5, unit: "g" },
  { id: "ing_13", name: "Cherry Tomatoes", category: "Vegetables", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fibre: 1.2, unit: "g" },
  { id: "ing_14", name: "Leek", category: "Vegetables", calories: 61, protein: 1.5, carbs: 14.2, fat: 0.3, fibre: 1.8, unit: "g" },
  { id: "ing_15", name: "Cauliflower", category: "Vegetables", calories: 25, protein: 1.9, carbs: 5.0, fat: 0.3, fibre: 2.0, unit: "g" },

  // Pulses & Legumes
  { id: "ing_20", name: "Chickpeas (cooked)", category: "Pulses & Legumes", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fibre: 7.6, unit: "g" },
  { id: "ing_21", name: "Red Lentils (cooked)", category: "Pulses & Legumes", calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4, fibre: 7.9, unit: "g" },
  { id: "ing_22", name: "Black Beans (cooked)", category: "Pulses & Legumes", calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5, fibre: 8.7, unit: "g" },
  { id: "ing_23", name: "Kidney Beans (cooked)", category: "Pulses & Legumes", calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fibre: 6.4, unit: "g" },
  { id: "ing_24", name: "Green Lentils (cooked)", category: "Pulses & Legumes", calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4, fibre: 7.9, unit: "g" },
  { id: "ing_25", name: "Edamame", category: "Pulses & Legumes", calories: 122, protein: 11.9, carbs: 8.9, fat: 5.2, fibre: 5.2, unit: "g" },

  // Dairy & Eggs
  { id: "ing_30", name: "Whole Milk", category: "Dairy & Eggs", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fibre: 0, unit: "ml" },
  { id: "ing_31", name: "Greek Yoghurt (full fat)", category: "Dairy & Eggs", calories: 97, protein: 9.0, carbs: 3.6, fat: 5.0, fibre: 0, unit: "g" },
  { id: "ing_32", name: "Cheddar Cheese", category: "Dairy & Eggs", calories: 402, protein: 25, carbs: 1.3, fat: 33.1, fibre: 0, unit: "g" },
  { id: "ing_33", name: "Eggs", category: "Dairy & Eggs", calories: 155, protein: 12.6, carbs: 1.1, fat: 11, fibre: 0, unit: "g" },
  { id: "ing_34", name: "Butter", category: "Dairy & Eggs", calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, fibre: 0, unit: "g" },
  { id: "ing_35", name: "Feta Cheese", category: "Dairy & Eggs", calories: 264, protein: 14.2, carbs: 4.1, fat: 21.3, fibre: 0, unit: "g" },
  { id: "ing_36", name: "Cream Cheese", category: "Dairy & Eggs", calories: 342, protein: 5.9, carbs: 4.1, fat: 34.4, fibre: 0, unit: "g" },
  { id: "ing_37", name: "Mozzarella", category: "Dairy & Eggs", calories: 280, protein: 28, carbs: 2.2, fat: 17, fibre: 0, unit: "g" },

  // Meat & Fish
  { id: "ing_40", name: "Chicken Breast", category: "Meat & Fish", calories: 165, protein: 31, carbs: 0, fat: 3.6, fibre: 0, unit: "g" },
  { id: "ing_41", name: "Salmon Fillet", category: "Meat & Fish", calories: 208, protein: 20, carbs: 0, fat: 13, fibre: 0, unit: "g" },
  { id: "ing_42", name: "Beef Mince (lean)", category: "Meat & Fish", calories: 215, protein: 26, carbs: 0, fat: 12, fibre: 0, unit: "g" },
  { id: "ing_43", name: "Cod Fillet", category: "Meat & Fish", calories: 82, protein: 18, carbs: 0, fat: 0.7, fibre: 0, unit: "g" },
  { id: "ing_44", name: "Turkey Mince", category: "Meat & Fish", calories: 170, protein: 20, carbs: 0, fat: 9.8, fibre: 0, unit: "g" },
  { id: "ing_45", name: "Tuna (tinned, in water)", category: "Meat & Fish", calories: 116, protein: 25.5, carbs: 0, fat: 0.8, fibre: 0, unit: "g" },
  { id: "ing_46", name: "Lamb Mince", category: "Meat & Fish", calories: 282, protein: 17, carbs: 0, fat: 24, fibre: 0, unit: "g" },
  { id: "ing_47", name: "King Prawns", category: "Meat & Fish", calories: 99, protein: 21, carbs: 0.9, fat: 0.9, fibre: 0, unit: "g" },

  // Grains & Cereals
  { id: "ing_50", name: "Brown Rice (dry)", category: "Grains & Cereals", calories: 370, protein: 7.9, carbs: 77, fat: 2.7, fibre: 3.5, unit: "g" },
  { id: "ing_51", name: "Wholemeal Pasta (dry)", category: "Grains & Cereals", calories: 352, protein: 13.4, carbs: 66.2, fat: 2.5, fibre: 8.0, unit: "g" },
  { id: "ing_52", name: "Quinoa (dry)", category: "Grains & Cereals", calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, fibre: 7.0, unit: "g" },
  { id: "ing_53", name: "Oats (rolled)", category: "Grains & Cereals", calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fibre: 10.6, unit: "g" },
  { id: "ing_54", name: "Wholemeal Bread", category: "Grains & Cereals", calories: 247, protein: 8.8, carbs: 41.3, fat: 3.4, fibre: 6.8, unit: "g" },
  { id: "ing_55", name: "Couscous (dry)", category: "Grains & Cereals", calories: 376, protein: 13, carbs: 72, fat: 0.6, fibre: 2.0, unit: "g" },
  { id: "ing_56", name: "White Rice (dry)", category: "Grains & Cereals", calories: 360, protein: 7.2, carbs: 79, fat: 0.6, fibre: 1.4, unit: "g" },

  // Fruits
  { id: "ing_60", name: "Banana", category: "Fruits", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fibre: 2.6, unit: "g" },
  { id: "ing_61", name: "Blueberries", category: "Fruits", calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fibre: 2.4, unit: "g" },
  { id: "ing_62", name: "Apple", category: "Fruits", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fibre: 2.4, unit: "g" },
  { id: "ing_63", name: "Lemon", category: "Fruits", calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, fibre: 2.8, unit: "g" },
  { id: "ing_64", name: "Avocado", category: "Fruits", calories: 160, protein: 2.0, carbs: 9.0, fat: 14.7, fibre: 6.7, unit: "g" },
  { id: "ing_65", name: "Mango", category: "Fruits", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fibre: 1.6, unit: "g" },
  { id: "ing_66", name: "Raspberries", category: "Fruits", calories: 52, protein: 1.2, carbs: 11.9, fat: 0.7, fibre: 6.5, unit: "g" },

  // Nuts & Seeds
  { id: "ing_70", name: "Almonds", category: "Nuts & Seeds", calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, fibre: 12.5, unit: "g" },
  { id: "ing_71", name: "Pumpkin Seeds", category: "Nuts & Seeds", calories: 559, protein: 30.2, carbs: 10.7, fat: 49.1, fibre: 6.0, unit: "g" },
  { id: "ing_72", name: "Chia Seeds", category: "Nuts & Seeds", calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, fibre: 34.4, unit: "g" },
  { id: "ing_73", name: "Walnuts", category: "Nuts & Seeds", calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2, fibre: 6.7, unit: "g" },
  { id: "ing_74", name: "Cashews", category: "Nuts & Seeds", calories: 553, protein: 18.2, carbs: 30.2, fat: 43.8, fibre: 3.3, unit: "g" },

  // Oils & Fats
  { id: "ing_80", name: "Olive Oil", category: "Oils & Fats", calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0, unit: "ml" },
  { id: "ing_81", name: "Coconut Oil", category: "Oils & Fats", calories: 862, protein: 0, carbs: 0, fat: 100, fibre: 0, unit: "ml" },

  // Herbs & Spices
  { id: "ing_90", name: "Cumin (ground)", category: "Herbs & Spices", calories: 375, protein: 17.8, carbs: 44.2, fat: 22.3, fibre: 10.5, unit: "g" },
  { id: "ing_91", name: "Turmeric", category: "Herbs & Spices", calories: 354, protein: 7.8, carbs: 64.9, fat: 9.9, fibre: 21.1, unit: "g" },
  { id: "ing_92", name: "Smoked Paprika", category: "Herbs & Spices", calories: 282, protein: 14.1, carbs: 54.0, fat: 13.0, fibre: 34.9, unit: "g" },
  { id: "ing_93", name: "Coriander (fresh)", category: "Herbs & Spices", calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5, fibre: 2.8, unit: "g" },
  { id: "ing_94", name: "Ginger (fresh)", category: "Herbs & Spices", calories: 80, protein: 1.8, carbs: 18, fat: 0.8, fibre: 2.0, unit: "g" },

  // Condiments
  { id: "ing_100", name: "Soy Sauce", category: "Condiments & Sauces", calories: 53, protein: 8.1, carbs: 4.9, fat: 0.1, fibre: 0.8, unit: "ml" },
  { id: "ing_101", name: "Tomato Paste", category: "Condiments & Sauces", calories: 82, protein: 4.3, carbs: 18.9, fat: 0.5, fibre: 4.2, unit: "g" },
  { id: "ing_102", name: "Coconut Milk (tinned)", category: "Condiments & Sauces", calories: 197, protein: 2.0, carbs: 6.0, fat: 21.3, fibre: 0, unit: "ml" },
  { id: "ing_103", name: "Vegetable Stock", category: "Condiments & Sauces", calories: 7, protein: 0.4, carbs: 1.4, fat: 0.1, fibre: 0, unit: "ml" },
  { id: "ing_104", name: "Honey", category: "Condiments & Sauces", calories: 304, protein: 0.3, carbs: 82.4, fat: 0, fibre: 0.2, unit: "g" },
  { id: "ing_105", name: "Tahini", category: "Condiments & Sauces", calories: 595, protein: 17, carbs: 21.2, fat: 53.8, fibre: 9.3, unit: "g" },
];

// ─── RECIPES DATABASE ────────────────────────────────────────────────────────
export const RECIPE_CATEGORIES = ["Breakfast", "Mains", "Snacks", "Desserts", "Sides", "Soups"];
export const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

export const initialRecipes = [
  {
    id: "rec_1",
    name: "Chicken & Vegetable Stir Fry",
    category: "Mains",
    description: "A quick, nutritious stir fry packed with colourful vegetables and lean protein.",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    tags: ["high-protein", "quick", "gluten-free"],
    instructions: [
      "Slice chicken breast into thin strips. Season with salt and pepper.",
      "Heat olive oil in a wok or large frying pan over high heat.",
      "Stir fry chicken for 5-6 minutes until cooked through. Remove and set aside.",
      "Add more oil if needed, then stir fry the vegetables for 3-4 minutes until tender-crisp.",
      "Return chicken to the pan, add soy sauce and toss everything together.",
      "Serve over brown rice."
    ],
    ingredients: [
      { ingredientId: "ing_40", amount: 500 },
      { ingredientId: "ing_7", amount: 150 },
      { ingredientId: "ing_2", amount: 100 },
      { ingredientId: "ing_10", amount: 150 },
      { ingredientId: "ing_3", amount: 100 },
      { ingredientId: "ing_4", amount: 15 },
      { ingredientId: "ing_80", amount: 15 },
      { ingredientId: "ing_100", amount: 30 },
      { ingredientId: "ing_50", amount: 300 },
    ]
  },
  {
    id: "rec_2",
    name: "Red Lentil Dahl",
    category: "Mains",
    description: "A warming, spiced lentil dahl that's perfect for meal prep. Vegan and high in fibre.",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    tags: ["vegan", "high-fibre", "meal-prep"],
    instructions: [
      "Heat olive oil in a large pot. Fry onion until softened, about 5 minutes.",
      "Add garlic, ginger, cumin and turmeric. Cook for 1-2 minutes until fragrant.",
      "Add red lentils and vegetable stock. Bring to a boil.",
      "Reduce heat and simmer for 20-25 minutes, stirring occasionally, until lentils are very soft.",
      "Stir in tomato paste and coconut milk. Season to taste.",
      "Serve with rice and fresh coriander."
    ],
    ingredients: [
      { ingredientId: "ing_21", amount: 400 },
      { ingredientId: "ing_3", amount: 200 },
      { ingredientId: "ing_4", amount: 20 },
      { ingredientId: "ing_94", amount: 20 },
      { ingredientId: "ing_90", amount: 8 },
      { ingredientId: "ing_91", amount: 5 },
      { ingredientId: "ing_103", amount: 800 },
      { ingredientId: "ing_102", amount: 200 },
      { ingredientId: "ing_101", amount: 50 },
      { ingredientId: "ing_80", amount: 20 },
      { ingredientId: "ing_93", amount: 20 },
      { ingredientId: "ing_56", amount: 300 },
    ]
  },
  {
    id: "rec_3",
    name: "Salmon with Sweet Potato & Greens",
    category: "Mains",
    description: "Pan-seared salmon served with roasted sweet potato and wilted spinach.",
    prepTime: 10,
    cookTime: 25,
    servings: 2,
    tags: ["high-protein", "omega-3", "gluten-free"],
    instructions: [
      "Preheat oven to 200°C. Cube sweet potato, toss with olive oil and roast for 20-25 minutes.",
      "Season salmon fillets with salt, pepper and a squeeze of lemon.",
      "Heat oil in a frying pan over medium-high heat. Cook salmon skin-side down for 4 minutes.",
      "Flip and cook for a further 2-3 minutes.",
      "Wilt spinach in the same pan. Season with salt and lemon juice.",
      "Serve salmon alongside sweet potato and spinach."
    ],
    ingredients: [
      { ingredientId: "ing_41", amount: 300 },
      { ingredientId: "ing_6", amount: 400 },
      { ingredientId: "ing_2", amount: 200 },
      { ingredientId: "ing_63", amount: 50 },
      { ingredientId: "ing_80", amount: 20 },
    ]
  },
  {
    id: "rec_4",
    name: "Greek-Style Chickpea Salad",
    category: "Mains",
    description: "A hearty, protein-rich salad with Mediterranean flavours. No cooking required.",
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    tags: ["vegan", "no-cook", "high-fibre", "high-protein"],
    instructions: [
      "Drain and rinse chickpeas. Pat dry.",
      "Dice cucumber, halve cherry tomatoes, and thinly slice red onion.",
      "Combine all vegetables and chickpeas in a large bowl.",
      "Crumble feta cheese over the top.",
      "Drizzle with olive oil and a squeeze of lemon. Season well.",
      "Toss gently and serve."
    ],
    ingredients: [
      { ingredientId: "ing_20", amount: 400 },
      { ingredientId: "ing_12", amount: 200 },
      { ingredientId: "ing_13", amount: 200 },
      { ingredientId: "ing_3", amount: 80 },
      { ingredientId: "ing_35", amount: 100 },
      { ingredientId: "ing_80", amount: 30 },
      { ingredientId: "ing_63", amount: 30 },
    ]
  },
  {
    id: "rec_5",
    name: "Overnight Oats",
    category: "Breakfast",
    description: "Creamy overnight oats topped with fruit and nuts. Prep the night before for a fuss-free morning.",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    tags: ["vegetarian", "high-fibre", "meal-prep", "quick"],
    instructions: [
      "Combine oats, milk and Greek yoghurt in a jar or container.",
      "Stir well, cover and refrigerate overnight (minimum 4 hours).",
      "In the morning, stir and add a splash more milk if too thick.",
      "Top with blueberries, banana slices, a drizzle of honey and a sprinkle of chia seeds.",
    ],
    ingredients: [
      { ingredientId: "ing_53", amount: 80 },
      { ingredientId: "ing_30", amount: 120 },
      { ingredientId: "ing_31", amount: 100 },
      { ingredientId: "ing_61", amount: 80 },
      { ingredientId: "ing_60", amount: 100 },
      { ingredientId: "ing_104", amount: 10 },
      { ingredientId: "ing_72", amount: 10 },
    ]
  },
  {
    id: "rec_6",
    name: "Beef & Vegetable Bolognese",
    category: "Mains",
    description: "A rich, hearty bolognese packed with hidden vegetables. Family favourite.",
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    tags: ["high-protein", "family-friendly", "meal-prep"],
    instructions: [
      "Heat oil in a large pan. Brown beef mince in batches, then set aside.",
      "In the same pan, soften onion, carrot and courgette for 8 minutes.",
      "Add garlic and cook for 1 minute.",
      "Return mince to the pan. Add tomato paste and cook for 2 minutes.",
      "Add chopped tomatoes and stock. Season well.",
      "Simmer on low heat for 30-40 minutes until rich and thick.",
      "Cook pasta according to package instructions. Serve with bolognese and grated cheese."
    ],
    ingredients: [
      { ingredientId: "ing_42", amount: 600 },
      { ingredientId: "ing_3", amount: 200 },
      { ingredientId: "ing_9", amount: 150 },
      { ingredientId: "ing_8", amount: 200 },
      { ingredientId: "ing_4", amount: 20 },
      { ingredientId: "ing_5", amount: 400 },
      { ingredientId: "ing_101", amount: 60 },
      { ingredientId: "ing_103", amount: 200 },
      { ingredientId: "ing_80", amount: 20 },
      { ingredientId: "ing_51", amount: 500 },
      { ingredientId: "ing_32", amount: 60 },
    ]
  },
  {
    id: "rec_7",
    name: "Hummus with Veggie Sticks",
    category: "Snacks",
    description: "Creamy homemade hummus with a platter of fresh vegetables for dipping.",
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    tags: ["vegan", "high-fibre", "no-cook"],
    instructions: [
      "Drain and rinse chickpeas, reserving the liquid.",
      "Blend chickpeas, tahini, lemon juice, garlic and olive oil until smooth.",
      "Add 2-3 tablespoons of reserved chickpea liquid to reach desired consistency.",
      "Season with salt and cumin.",
      "Cut carrot, cucumber and pepper into sticks. Serve alongside hummus.",
    ],
    ingredients: [
      { ingredientId: "ing_20", amount: 400 },
      { ingredientId: "ing_105", amount: 60 },
      { ingredientId: "ing_63", amount: 60 },
      { ingredientId: "ing_4", amount: 10 },
      { ingredientId: "ing_80", amount: 30 },
      { ingredientId: "ing_90", amount: 3 },
      { ingredientId: "ing_9", amount: 150 },
      { ingredientId: "ing_12", amount: 150 },
      { ingredientId: "ing_7", amount: 150 },
    ]
  },
  {
    id: "rec_8",
    name: "Banana & Almond Energy Balls",
    category: "Snacks",
    description: "No-bake energy balls made with oats, banana and almonds. Great for lunchboxes.",
    prepTime: 15,
    cookTime: 0,
    servings: 12,
    tags: ["vegan", "no-cook", "meal-prep", "high-fibre"],
    instructions: [
      "Mash ripe bananas in a large bowl.",
      "Blitz almonds in a food processor until they resemble rough crumbs.",
      "Mix oats, blended almonds, honey and chia seeds into the banana.",
      "Roll into 12 balls and refrigerate for at least 30 minutes to firm up.",
      "Store in the fridge for up to 5 days.",
    ],
    ingredients: [
      { ingredientId: "ing_60", amount: 200 },
      { ingredientId: "ing_53", amount: 100 },
      { ingredientId: "ing_70", amount: 80 },
      { ingredientId: "ing_104", amount: 30 },
      { ingredientId: "ing_72", amount: 20 },
    ]
  },
  {
    id: "rec_9",
    name: "Berry Chia Pudding",
    category: "Desserts",
    description: "A creamy, antioxidant-rich chia pudding topped with fresh berries.",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    tags: ["vegan", "high-fibre", "meal-prep", "low-calorie"],
    instructions: [
      "Combine chia seeds with coconut milk in a bowl or jar. Stir well.",
      "Let sit for 5 minutes, stir again to prevent clumping.",
      "Cover and refrigerate overnight or for at least 4 hours.",
      "Serve topped with blueberries, raspberries and a drizzle of honey.",
    ],
    ingredients: [
      { ingredientId: "ing_72", amount: 60 },
      { ingredientId: "ing_102", amount: 300 },
      { ingredientId: "ing_61", amount: 100 },
      { ingredientId: "ing_66", amount: 100 },
      { ingredientId: "ing_104", amount: 15 },
    ]
  },
  {
    id: "rec_10",
    name: "Turkey & Quinoa Stuffed Peppers",
    category: "Mains",
    description: "Colourful bell peppers stuffed with spiced turkey mince and quinoa.",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    tags: ["high-protein", "gluten-free", "family-friendly"],
    instructions: [
      "Preheat oven to 190°C. Halve peppers and remove seeds.",
      "Cook quinoa according to package instructions.",
      "Brown turkey mince in a pan with onion and garlic.",
      "Add cumin, smoked paprika, tomato paste and cook for 2 minutes.",
      "Mix in cooked quinoa and spinach. Season well.",
      "Fill pepper halves with the turkey mixture. Top with grated cheese.",
      "Bake for 25-30 minutes until peppers are tender and cheese is golden.",
    ],
    ingredients: [
      { ingredientId: "ing_44", amount: 400 },
      { ingredientId: "ing_7", amount: 400 },
      { ingredientId: "ing_52", amount: 200 },
      { ingredientId: "ing_3", amount: 150 },
      { ingredientId: "ing_4", amount: 15 },
      { ingredientId: "ing_2", amount: 100 },
      { ingredientId: "ing_90", amount: 8 },
      { ingredientId: "ing_92", amount: 5 },
      { ingredientId: "ing_101", amount: 40 },
      { ingredientId: "ing_32", amount: 60 },
      { ingredientId: "ing_80", amount: 15 },
    ]
  },
  {
    id: "rec_11",
    name: "Vegetable & Lentil Soup",
    category: "Soups",
    description: "A hearty, warming soup perfect for cold days. High in fibre and completely vegan.",
    prepTime: 15,
    cookTime: 35,
    servings: 6,
    tags: ["vegan", "high-fibre", "meal-prep"],
    instructions: [
      "Heat oil in a large pot. Fry onion, carrot and leek for 8 minutes.",
      "Add garlic, cumin and turmeric. Cook for 1 minute.",
      "Add lentils, vegetable stock and tomatoes. Bring to a boil.",
      "Reduce heat and simmer for 25-30 minutes until lentils are tender.",
      "Blend half the soup for a creamy texture, then stir back in.",
      "Season well and serve with bread.",
    ],
    ingredients: [
      { ingredientId: "ing_24", amount: 300 },
      { ingredientId: "ing_3", amount: 200 },
      { ingredientId: "ing_9", amount: 200 },
      { ingredientId: "ing_14", amount: 200 },
      { ingredientId: "ing_4", amount: 20 },
      { ingredientId: "ing_5", amount: 400 },
      { ingredientId: "ing_103", amount: 1000 },
      { ingredientId: "ing_90", amount: 8 },
      { ingredientId: "ing_91", amount: 5 },
      { ingredientId: "ing_80", amount: 20 },
      { ingredientId: "ing_54", amount: 200 },
    ]
  },
  {
    id: "rec_12",
    name: "Scrambled Eggs with Avocado Toast",
    category: "Breakfast",
    description: "Fluffy scrambled eggs on wholemeal toast with smashed avocado and chilli flakes.",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    tags: ["vegetarian", "high-protein", "quick"],
    instructions: [
      "Crack 4 eggs into a bowl, season and whisk well.",
      "Mash avocado with lemon juice and season.",
      "Toast bread.",
      "Melt butter in a non-stick pan over low heat. Pour in eggs.",
      "Stir gently with a spatula until just set but still creamy. Remove from heat.",
      "Spread avocado on toast, top with scrambled eggs.",
    ],
    ingredients: [
      { ingredientId: "ing_33", amount: 200 },
      { ingredientId: "ing_64", amount: 200 },
      { ingredientId: "ing_54", amount: 120 },
      { ingredientId: "ing_34", amount: 15 },
      { ingredientId: "ing_63", amount: 30 },
    ]
  },
];

// ─── DEMO ACCOUNTS ───────────────────────────────────────────────────────────
export const DEMO_ACCOUNTS = {
  admin: { email: "admin@mealplanner.com", password: "admin123", role: "admin", name: "Admin" },
  user1: { email: "sarah@example.com", password: "user123", role: "user", name: "Sarah", familyId: "fam_1" },
};

export const initialFamilies = [
  {
    id: "fam_1",
    name: "The Thompson Family",
    ownerId: "user_1",
    members: [
      { id: "mem_1", name: "Sarah", type: "staple", age: 38, dietaryNotes: "" },
      { id: "mem_2", name: "James", type: "staple", age: 40, dietaryNotes: "no shellfish" },
      { id: "mem_3", name: "Lily", type: "staple", age: 10, dietaryNotes: "picky eater" },
      { id: "mem_4", name: "Oliver", type: "staple", age: 7, dietaryNotes: "" },
    ]
  }
];
