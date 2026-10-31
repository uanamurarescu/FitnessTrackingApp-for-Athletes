export const NUTRITION_PER_100G = {
  "chicken breast":           { carbs: 0,    protein: 22.5, fats: 2.6 },
  "10% fat ground beef":      { carbs: 0,    protein: 20,   fats: 10 },
  "salmon fillet":            { carbs: 0,    protein: 20,   fats: 13 },
  "eggs":                     { carbs: 0.7,  protein: 12.6, fats: 9.5 },
  "broccoli":                 { carbs: 6.6,  protein: 2.8,  fats: 0.4 },
  "spinach":                  { carbs: 3.6,  protein: 2.9,  fats: 0.4 },
  "carrots":                  { carbs: 9.6,  protein: 0.9,  fats: 0.2 },
  "sweet potatoes":           { carbs: 20.1, protein: 1.6,  fats: 0.1 },
  "quinoa":                   { carbs: 21.3, protein: 4.4,  fats: 1.9 },  
  "chocolate protein powder": { carbs: 10,   protein: 75,   fats: 5 },
  "greek yogurt":             { carbs: 3.9,  protein: 9.9,  fats: 1.9 },  
  "almonds":                  { carbs: 21.6, protein: 21.2, fats: 49.9 },
  "peanut butter":            { carbs: 20,   protein: 25,   fats: 50 },
  "oats":                     { carbs: 66.3, protein: 16.9, fats: 6.9 },
  "brown rice":               { carbs: 23.5, protein: 2.3,  fats: 0.8 }, 
  "lentils":                  { carbs: 20.1, protein: 9,    fats: 0.4 },  
  "chickpeas":                { carbs: 27.4, protein: 8.9,  fats: 2.6 }, 
  "black beans":              { carbs: 23.7, protein: 8.9,  fats: 0.5 },  
  "tofu":                     { carbs: 2.8,  protein: 17.3, fats: 8.7 },
  "banana":                   { carbs: 22.8, protein: 1.1,  fats: 0.3 },
};

export const DAILY_GOALS = { carbs: 250, protein: 130, fats: 60 };


export function macrosFor(food) {
  const per100 = NUTRITION_PER_100G[food.name.trim().toLowerCase()];
  if (!per100) return { carbs: 0, protein: 0, fats: 0 };
  const factor = food.quantity / 100;
  return {
    carbs: per100.carbs * factor,
    protein: per100.protein * factor,
    fats: per100.fats * factor,
  };
}


export function sumMacros(foods) {
  return foods.reduce(
    (total, food) => {
      const m = macrosFor(food);
      return {
        carbs: total.carbs + m.carbs,
        protein: total.protein + m.protein,
        fats: total.fats + m.fats,
      };
    },
    { carbs: 0, protein: 0, fats: 0 }
  );
}


export function kcalFrom(macros) {
  return macros.carbs * 4 + macros.protein * 4 + macros.fats * 9;
}


export function unknownFoods(foods) {
  return foods.filter((food) => !NUTRITION_PER_100G[food.name.trim().toLowerCase()]);
}