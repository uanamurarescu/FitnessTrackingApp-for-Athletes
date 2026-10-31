import WorkoutLogCard from "./Exercises_LogCard.jsx";
import WorkoutAddForm, { SPLIT_OPTIONS } from "./Exercises_AddForm.jsx";
import ExercisesSteps from "./Exercises_Steps.jsx";
import "./Exercises_Log.css";

export default function WorkoutLogList({ workouts, onAdd, onToggle, onDelete, steps, stepsGoal, onStepsChange }) {
  const left = workouts.filter((w) => !w.done).length;

  return (
    <section className="workout-panel" id="workout-log" aria-labelledby="workoutLogListTitle">
      <div className="workout-panel-head">
        <h2 className="section-title" id="workoutLogListTitle">
          Today's workout.
        </h2>
        <p className="workout-count">
          {workouts.length} {workouts.length === 1 ? "exercise" : "exercises"}, {left} left to do
        </p>
      </div>
      <p className="workout-panel-sub">Tick an exercise when you finish it.</p>

      <WorkoutAddForm onAdd={onAdd} />

      <div className="split-columns">
        {SPLIT_OPTIONS.map((split) => {
          const splitWorkouts = workouts.filter((w) => w.split === split.value);
          const splitDone = splitWorkouts.filter((w) => w.done).length;

          return (
            <section
              key={split.value}
              className={`split-col split-col--${split.value.toLowerCase()}`}
              aria-label={split.label}
            >
              <header className="split-head">
                <h3 className="split-title">{split.label}</h3>
                <p className="split-total">
                  {splitDone} / {splitWorkouts.length} done
                </p>
              </header>

              {splitWorkouts.length === 0 ? (
                <p className="split-empty">No exercises yet.</p>
              ) : (
                <ul className="workout-items">
                  {splitWorkouts.map((workout) => (
                    <WorkoutLogCard
                      key={workout.id}
                      workout={workout}
                      onToggle={onToggle}
                      onDelete={onDelete}
                    />
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        <ExercisesSteps steps={steps} goal={stepsGoal} onChange={onStepsChange} />
      </div>
    </section>
  );
}