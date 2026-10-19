import ExercisesCard from "./ExercisesCard.jsx";

export default function ExercisesList({ exercises }) {
  if (exercises.length === 0) {
    return <p className="empty">No exercises logged yet.</p>;
  }

  return (
    <ul className="exercise-list">
      {exercises.map((exercise) => (
        <ExercisesCard key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  );
}