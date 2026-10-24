const names = ['Chicken breast', '10% fat ground beef', 'Salmon fillet', 'Eggs', 'Broccoli', 'Spinach', 'Carrots', 'Sweet potatoes', 'Quinoa', 'Chocolate protein powder', 'Greek yogurt', 'Almonds'];
const quantity_in_grams = [100, 150, 120, 60, 200, 180, 150, 200, 100, 250, 150, 100, 150, 200, 250, 180, 160, 140, 120, 130];
const meal_log = ['breakfast', 'lunch', 'dinner', 'snack 1', 'snack 2', 'snack 3'];


const quick_food_tracker = [
    {id: 1, name: names[0], quantity: quantity_in_grams[0], mealLog: meal_log[0]},
    {id: 2, name: names[1], quantity: quantity_in_grams[1], mealLog: meal_log[1]},
    {id: 3, name: names[2], quantity: quantity_in_grams[2], mealLog: meal_log[2]},
    {id: 4, name: names[3], quantity: quantity_in_grams[3], mealLog: meal_log[3]},
    {id: 5, name: names[4], quantity: quantity_in_grams[4], mealLog: meal_log[4]},
    {id: 6, name: names[5], quantity: quantity_in_grams[5], mealLog: meal_log[5]},
    {id: 7, name: names[6], quantity: quantity_in_grams[6], mealLog: meal_log[0]},
    {id: 8, name: names[7], quantity: quantity_in_grams[7], mealLog: meal_log[1]},
    {id: 9, name: names[8], quantity: quantity_in_grams[8], mealLog: meal_log[2]},
    {id: 10, name: names[9], quantity: quantity_in_grams[9], mealLog: meal_log[3]},
    {id: 11, name: names[10], quantity: quantity_in_grams[10], mealLog: meal_log[4]},
    {id: 12, name: names[11], quantity: quantity_in_grams[11], mealLog: meal_log[5]},
]

function listNames(lista) {
    return lista.map((e) => e.name);
}

function countByMeal(lista, meal) {
    return lista.filter((e) => e.mealLog === meal).length;
}

function searchByName(lista, text) {
    return lista.filter((e) => e.name.toLowerCase().includes(text.toLowerCase()));
}

function nextId(lista) {
    return lista.reduce((max, e) => Math.max(max, e.id), 0) + 1;
}

function addFood(lista, names, quantity, mealLog) {
const ClearName = names.trim();
    if (ClearName === "") {
        console.log("A name needs to be written.");
        return lista;
    }
    if (!meal_log.includes(mealLog)) {
        console.log("Invalid meal.");
        return lista;
    }
    const nou = { id: nextId(lista), name: ClearName, quantity: quantity, mealLog: mealLog };
    return [...lista, nou];
}

function deleteFood(lista, id) {
    return lista.filter((e) => e.id !== id);
}

console.log("--- READ ---");
console.log("Name:", listNames(quick_food_tracker).join(", "));
console.log("Search 'press':", listNames(searchByName(quick_food_tracker, "press")).join(", "));

console.log("--- ADD ---");
let lista = addFood(quick_food_tracker, "Banana", 100, "breakfast");
console.log("New list:", lista.length, "exercises");
console.log("The original remained:", quick_food_tracker.length, "exercises");

console.log("--- DELETE ---");
lista = deleteFood(lista, 3);
console.log("After deleting id 3:", listNames(lista).join(", "));

console.log("--- VALIDATION ---");
addFood(lista, "");
addFood(lista, "Banana", 100, "invalid meal");