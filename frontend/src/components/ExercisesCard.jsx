const MUSCLE_GROUP_LABELS = {
  quads: "Quads",
  hams: "Hamstrings",
  glutes: "Glutes",
  calves: "Calves",
};

export default function ExercisesCard({ exercise }) {
  return (
    <li className={exercise.done ? "exercise-card done" : "exercise-card"}>
      <div className="exercise-main">
        <h3>{exercise.name}.</h3>
        <p className="exercise-details">{exercise.executionForm}</p>
        <span className={`badge badge-${exercise.muscleGroup}`}>
          ✳ {MUSCLE_GROUP_LABELS[exercise.muscleGroup]}
        </span>
      </div>
      <div className="exercise-side">
        <span className="exercise-pr">{exercise.PR}</span>
        <span className="status">{exercise.done ? "Done" : "To do"}</span>
      </div>
    </li>
  );
}