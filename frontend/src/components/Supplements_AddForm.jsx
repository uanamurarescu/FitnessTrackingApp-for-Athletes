import { useState } from "react";
import { MEAL_OPTIONS } from "./Food_AddForm.jsx";
import "./Food_Tracker.css";
import "./Exercises_Log.css"; //stil css ca in formularul de workout pentru o logica de stil

const NAME_MAX = 60;
const DOSE_MAX = 20;
const DOSE_PATTERN = /^\d+([.,]\d+)?\s?(g|mg|mcg|iu|ml)$/i;

export default function SupplementsAddForm({ onAdd }) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [mealLog, setMealLog] = useState("");
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  function validate() {
    const n = name.trim();
    const d = dose.trim();
    if (n === "") return "Supplement name is required.";
    if (n.length > NAME_MAX) return `The name has at most ${NAME_MAX} characters.`;
    if (d === "") return "Dose is required.";
    if (d.length > DOSE_MAX) return `The dose has at most ${DOSE_MAX} characters.`;
    if (!DOSE_PATTERN.test(d)) return "The dose is not valid. Please use the format: 5 g, 2000 IU, etc.";
    if (!MEAL_OPTIONS.some((m) => m.value === mealLog)) return "Choose the meal.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    const message = validate();
    if (message) {
      setFormError(message);
      return;
    }
    setFormError("");
    setSending(true);
    try {
      await onAdd({ name: name.trim(), dose: dose.trim(), mealLog, taken: false });
      setName("");
      setDose("");
      setMealLog("");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="workout-form supp-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Add supplement"
      data-testid="form"
    >
      <div className="workout-row">
        <input
          className="workout-input workout-input--name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter supplement name.."
          aria-label="Supplement name"
          maxLength={NAME_MAX}
          aria-invalid={Boolean(formError)}
          data-testid="form-title"
        />
        <input
          className="workout-input"
          type="text"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          placeholder="Dose (e.g. 5 g).."
          aria-label="Dose"
          maxLength={DOSE_MAX}
          aria-invalid={Boolean(formError)}
          data-testid="form-dose"
        />
        <div className="select-wrap workout-select">
          <select
            className="workout-input"
            value={mealLog}
            onChange={(e) => setMealLog(e.target.value)}
            aria-label="Meal"
            required
            data-testid="form-mealLog"
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

        <button type="submit" className="workout-add" disabled={sending} data-testid="form-submit">
          {sending ? "SAVING..." : "ADD"}
        </button>
      </div>

      {formError && (
        <p className="workout-error" role="alert" data-testid="form-error">
          {formError}
        </p>
      )}
    </form>
  );
}