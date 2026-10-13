const names = ['Squats', 'Lunges', 'Deadlifts', 'LegPress', 'CalfRaises', 'LegExtensions', 'LegCurls', 'GluteBridges', 'StepUps'];
const PR = ['100 kg', '80 kg', '120 kg', '150 kg', '60 kg', '70 kg', '50 kg', '90 kg', '40 kg'];
const executionForm = ['deep squats', 'forward lunges', 'Romanian deadlifts', 'machine leg press', 'standing calf raises', 'seated leg extensions', 'lying leg curls', 'lateral step-ups'];

const exercises = [
  { id: 1, name: names[0], PR: PR[0], executionForm: executionForm[0] },
  { id: 2, name: names[1], PR: PR[1], executionForm: executionForm[1] },
  { id: 3, name: names[2], PR: PR[2], executionForm: executionForm[2] },
  { id: 4, name: names[3], PR: PR[3], executionForm: executionForm[3] }
];

export default function App() {
  const count = exercises.filter((e) => !e.active).length;

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
          <pre>{JSON.stringify(exercises, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}