import "./Exercises_Log.css";

export default function WorkoutLogCard({ workout, onToggle, onDelete }) {
  return (
    <li className={workout.done ? "workout-card done" : "workout-card"}>
      <label className="workout-main">
        <input
          type="checkbox"
          checked={workout.done}
          onChange={() => onToggle(workout.id)}
        />
        <span className="workout-text">
          <span className="workout-name">{workout.exercises}</span>
          <span className="workout-volume">{workout.volume}</span>
        </span>
      </label>
      <button
        type="button"
        className="workout-delete"
        onClick={() => onDelete(workout.id)}
        aria-label={`Delete ${workout.exercises}`}
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          close
        </span>
      </button>
    </li>
  );
}