import ExercisesList from "./components/ExercisesList.jsx";

const exercises = [
  { id: 1, name: "Squats", PR: "100 kg", executionForm: "deep squats", muscleGroup: "quads", done: true },
  { id: 2, name: "Lunges", PR: "80 kg", executionForm: "forward lunges", muscleGroup: "glutes", done: false },
  { id: 3, name: "Deadlifts", PR: "120 kg", executionForm: "Romanian deadlifts", muscleGroup: "hams", done: false },
  { id: 4, name: "LegPress", PR: "150 kg", executionForm: "machine leg press", muscleGroup: "quads", done: true },
];

export default function App() {
  const count = exercises.filter((e) => e.done).length;

  return (
    <>
      <header className="app-header">
        <h1>Exercise Tracker</h1>
        <p>Organize your workout routines and track personal records.</p>
        <p className="app-count">
          {exercises.length} exercises, of which {count} done
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>My Exercises</h2>
          <ExercisesList exercises={exercises} />
        </section>
      </main>
    </>
  );
}