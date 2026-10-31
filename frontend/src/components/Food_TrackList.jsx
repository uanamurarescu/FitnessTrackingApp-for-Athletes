import FoodTrackCard from "./Food_TrackCard.jsx";
import FoodWaterIntake from "./Food_WaterIntake.jsx";
import "./Food_Tracker.css";
import { MEAL_OPTIONS } from "./Food_AddForm.jsx";

function toClassName(value) {
  return String(value).toLowerCase().replace(/\s+/g, "-");
}

export default function FoodTrackList({ foods, onDelete, waterMl, waterGoalMl, onWaterChange }) {
  const totalGrams = foods.reduce((sum, e) => sum + e.quantity, 0);
 
  return (
    <section className="food-panel" id="food-list" aria-labelledby="foodListTitle">
      <div className="food-panel-head">
        <h2 className="section-title" id="foodListTitle">
          Food eaten today.
        </h2>
        <p className="food-count">
          {foods.length} {foods.length === 1 ? "item" : "items"}, {totalGrams} g in total
        </p>
      </div>
      <p className="food-panel-sub">Shortcut logger for your meals from today.</p>
 
      <div className="meal-columns">
        {MEAL_OPTIONS.map((meal) => {
          const mealFoods = foods.filter((e) => e.mealLog === meal.value);
          const mealGrams = mealFoods.reduce((sum, e) => sum + e.quantity, 0);
 
          return (
            <section
              key={meal.value}
              className={`meal-col meal-col--${toClassName(meal.value)}`}
              aria-label={meal.label}
            >
              <header className="meal-head">
                <h3 className="meal-title">{meal.label}</h3>
                <p className="meal-total">
                  {mealFoods.length} · {mealGrams} g
                </p>
              </header>
 
              {mealFoods.length === 0 ? (
                <p className="meal-empty">No food yet.</p>
              ) : (
                <ul className="meal-items">
                  {mealFoods.map((food) => (
                    <FoodTrackCard key={food.id} food={food} onDelete={onDelete} />
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <FoodWaterIntake waterMl={waterMl} goalMl={waterGoalMl} onChange={onWaterChange} />
    </section>
  );
 
}
 
