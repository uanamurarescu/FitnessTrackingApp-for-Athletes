import { useState } from "react";
import "./Exercises_Log.css";

export default function ExercisesSteps({ steps, goal, onChange }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const progress = Math.min(steps / goal, 1);

  function handleSubmit(event) {
    event.preventDefault();

    const count = Number(value);
    if (value.trim() === "" || !Number.isInteger(count) || count < 0 || count > 100000) {
      setError("Steps must be a whole number between 0 and 100000.");
      return;
    }

    onChange(count);
    setValue("");
    setError("");
  }

  return (
    <section className="split-col steps-col" aria-labelledby="stepsTitle">
      <header className="split-head">
        <h3 className="split-title" id="stepsTitle">Steps</h3>
        <p className="split-total">
          {steps} / {goal}
        </p>
      </header>

      <div className="steps-card">
        <p className="steps-value">
          <span className="material-symbols-rounded" aria-hidden="true">directions_walk</span>
          {steps}
        </p>

        <div
          className="steps-bar"
          role="progressbar"
          aria-label="Daily steps"
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={steps}
        >
          <span className="steps-fill" style={{ width: `${progress * 100}%` }} />
        </div>

        <form className="steps-form" onSubmit={handleSubmit} noValidate>
          <input
            className="workout-input"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter steps.."
            aria-label="Total steps for this day"
            min="0"
            step="1"
          />
          <button type="submit" className="workout-add">
            SAVE
          </button>
        </form>

        <button type="button" className="steps-quick" onClick={() => onChange(steps + 1000)}>
          + 1000 steps
        </button>

        {error && (
          <p className="steps-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}