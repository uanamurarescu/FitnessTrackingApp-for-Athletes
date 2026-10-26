import { useState } from "react";
import "./Exercises_Log.css";

export const SPLIT_OPTIONS = [
  { value: "PushWorkout", label: "Push" },
  { value: "PullWorkout", label: "Pull" },
  { value: "LegsWorkout", label: "Legs" },
];

export default function WorkoutAddForm({ onAdd }) {
  const [exercise, setExercise] = useState("");
  const [volume, setVolume] = useState("");
  const [split, setSplit] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const clearName = exercise.trim();
    // "3 x 10" sau "3X10" devin "3x10"
    const clearVolume = volume.replace(/\s+/g, "").toLowerCase();

    if (clearName === "") {
      setError("An exercise name needs to be written.");
      return;
    }
    if (!/^\d+x\d+$/.test(clearVolume)) {
      setError("Volume must look like 3x10 (sets x reps).");
      return;
    }
    if (!SPLIT_OPTIONS.some((s) => s.value === split)) {
      setError("Invalid split.");
      return;
    }

    onAdd({ exercises: clearName, volume: clearVolume, split });

    setExercise("");
    setVolume("");
    setSplit("");
    setError("");
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit} noValidate aria-label="Add exercise">
      <div className="workout-row">
        <input
          className="workout-input workout-input--name"
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Enter exercise name.."
          aria-label="Exercise name"
          maxLength={60}
        />
        <input
          className="workout-input"
          type="text"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder="Sets x reps (e.g. 3x10).."
          aria-label="Volume (sets x reps)"
          maxLength={10}
        />
        <div className="select-wrap workout-select">
          <select
            className="workout-input"
            value={split}
            onChange={(e) => setSplit(e.target.value)}
            aria-label="Split"
            required
          >
            <option value="" disabled>
              Choose the split
            </option>
            {SPLIT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-rounded" aria-hidden="true">
            expand_more
          </span>
        </div>

        <button type="submit" className="workout-add">
          ADD
        </button>
      </div>

      {error && (
        <p className="workout-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}