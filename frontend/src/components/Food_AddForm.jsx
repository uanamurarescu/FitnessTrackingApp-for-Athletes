import { useState } from "react";
import "./Food_Tracker.css";

export const MEAL_OPTIONS = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack 1", label: "Snack 1" },
  { value: "snack 2", label: "Snack 2" },
  { value: "snack 3", label: "Snack 3" },
];

export default function FoodAddForm({ onAdd }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mealLog, setMealLog] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const clearName = name.trim();
    const grams = Number(quantity);

    if (clearName === "") {
      setError("A name needs to be written.");
      return;
    }
    if (!Number.isFinite(grams) || grams <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }
    if (!MEAL_OPTIONS.some((m) => m.value === mealLog)) {
      setError("Invalid meal.");
      return;
    }

    onAdd({ name: clearName, quantity: grams, mealLog });

    setName("");
    setQuantity("");
    setMealLog("");
    setError("");
  }

  return (
    <form
      className="panel tracker"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="trackerTitle"
    >
      <div className="tracker-side">
        <button type="submit" className="add-btn">
          ADD
        </button>
        <h2 className="tracker-title" id="trackerTitle">
          Food <br />Tracker <br />Shortcut.
        </h2>
      </div>
 
      <div className="tracker-fields">
        <input
          className="field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Food Name.."
          aria-label="Food name"
          maxLength={60}
        />
        <input
          className="field"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter the quantity.."
          aria-label="Quantity (grams)"
          min="1"
          step="1"
        />
        <div className="select-wrap">
          <select
            className="field"
            value={mealLog}
            onChange={(e) => setMealLog(e.target.value)}
            aria-label="Meal"
            required
          >
            <option value="" disabled>
              Choose the meal
            </option>
            {MEAL_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-rounded" aria-hidden="true">
            expand_more
          </span>
        </div>
 
        {error && (
          <p className="tracker-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}