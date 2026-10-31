import { useState , useEffect } from "react";
import FoodTrackList from "./components/Food_TrackList.jsx";
import FoodAddForm from "./components/Food_AddForm.jsx";
import WorkoutLogList from "./components/Exercises_LogList.jsx";
import { DAILY_GOALS, sumMacros, kcalFrom, unknownFoods } from "./components/nutrition.js";
import "./App.css";

const initialFoods = [
  { id: 1, name: "Chicken breast", quantity: 100, mealLog: "breakfast" },
  { id: 2, name: "10% fat ground beef", quantity: 150, mealLog: "lunch" },
  { id: 3, name: "Salmon fillet", quantity: 120, mealLog: "dinner" },
  { id: 4, name: "Eggs", quantity: 60, mealLog: "snack 1" },
  { id: 5, name: "Broccoli", quantity: 200, mealLog: "snack 2" },
  { id: 6, name: "Spinach", quantity: 180, mealLog: "snack 3" },
  { id: 7, name: "Carrots", quantity: 150, mealLog: "breakfast" },
  { id: 8, name: "Sweet potatoes", quantity: 200, mealLog: "lunch" },
  { id: 9, name: "Quinoa", quantity: 100, mealLog: "dinner" },
  { id: 10, name: "Chocolate protein powder", quantity: 250, mealLog: "snack 1" },
  { id: 11, name: "Greek yogurt", quantity: 150, mealLog: "snack 2" },
  { id: 12, name: "Almonds", quantity: 100, mealLog: "snack 3" }
];

const initialWorkouts = [
  // PUSH
  { id: 1,  exercises: "Barbell Bench Press",        volume: "3x8",  split: "PushWorkout", done: false },
  { id: 2,  exercises: "Incline Dumbbell Press",     volume: "2x10", split: "PushWorkout", done: false },
  { id: 3,  exercises: "Overhead Press",             volume: "3x12", split: "PushWorkout", done: false },
  { id: 4,  exercises: "Cable Fly",                  volume: "3x12", split: "PushWorkout", done: false },
  { id: 5,  exercises: "Lateral Raise",              volume: "3x6",  split: "PushWorkout", done: false },
  { id: 6,  exercises: "Triceps Pushdown",           volume: "3x10", split: "PushWorkout", done: false },
  { id: 7,  exercises: "Overhead Triceps Extension", volume: "3x10", split: "PushWorkout", done: false },
  // PULL
  { id: 8,  exercises: "Pull-Up",                    volume: "2x8",  split: "PullWorkout", done: false },
  { id: 9,  exercises: "Lat Pulldown",               volume: "3x8",  split: "PullWorkout", done: false },
  { id: 10, exercises: "Barbell Row",                volume: "2x10", split: "PullWorkout", done: false },
  { id: 11, exercises: "Seated Cable Row",           volume: "3x12", split: "PullWorkout", done: false },
  { id: 12, exercises: "Face Pull",                  volume: "3x12", split: "PullWorkout", done: false },
  { id: 13, exercises: "Rear Delt Fly",              volume: "3x6",  split: "PullWorkout", done: false },
  { id: 14, exercises: "Barbell Curl",               volume: "3x10", split: "PullWorkout", done: false },
  { id: 15, exercises: "Hammer Curl",                volume: "3x10", split: "PullWorkout", done: false },
  // LEGS
  { id: 16, exercises: "Barbell Squat",              volume: "2x8",  split: "LegsWorkout", done: false },
  { id: 17, exercises: "Romanian Deadlift",          volume: "3x8",  split: "LegsWorkout", done: false },
  { id: 18, exercises: "Leg Press",                  volume: "2x10", split: "LegsWorkout", done: false },
  { id: 19, exercises: "Bulgarian Split Squat",      volume: "3x12", split: "LegsWorkout", done: false },
  { id: 20, exercises: "Leg Extension",              volume: "3x12", split: "LegsWorkout", done: false },
  { id: 21, exercises: "Leg Curl",                   volume: "3x6",  split: "LegsWorkout", done: false },
  { id: 22, exercises: "Calf Raise",                 volume: "3x10", split: "LegsWorkout", done: false },
];


function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}


function shortDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}


function longDate(date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}


function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}


function withDate(lista, key) {
  return lista.map((e) => (e.date ? e : { ...e, date: key }));
}


const MACRO_BARS = [
  { key: "carbs", label: "carbs.", table: "NutritionalValues.Carbs" },
  { key: "protein", label: "protein.", table: "NutritionalValues.Protein" },
  { key: "fats", label: "fats.", table: "NutritionalValues.Fats" },
];


const EMPTY_DAY = { steps: 0, waterMl: 0 };
const STEPS_GOAL = 10000;
const WATER_GOAL_ML = 4000;


function formatLiters(ml) {
  return `${Number((ml / 1000).toFixed(2))} L`;
}

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function loadList(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function nextId(lista) {
  return lista.reduce((max, e) => Math.max(max, e.id), 0) + 1;
}
 
function addFood(lista, food) {
  return [...lista, { id: nextId(lista), ...food }];
}

function deleteFood(lista, id) {
  return lista.filter((e) => e.id !== id);
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const prevDay = addDays(selectedDate, -1);
  const nextDay = addDays(selectedDate, 1);
  const dayKey = dateKey(selectedDate);

  function goToPrevDay() {
    setSelectedDate((prev) => addDays(prev, -1));
  }

  function goToNextDay() {
    setSelectedDate((prev) => addDays(prev, 1));
  }


  const [foods, setFoods] = useState(() =>
    withDate(loadList("foods", initialFoods), dateKey(new Date()))
  );

  useEffect(() => {
    try {
      localStorage.setItem("foods", JSON.stringify(foods));
    } catch {
      // stocare indisponibila
    }
  }, [foods]);


  function addMeal(food) {
    setFoods((prev) => addFood(prev, { ...food, date: dayKey }));
  }

  function deleteMeal(id) {
    setFoods((prev) => deleteFood(prev, id));
  }


  const [workouts, setWorkouts] = useState(() =>
    withDate(loadList("workouts", initialWorkouts), dateKey(new Date()))
  );

  useEffect(() => {
    try {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    } catch {
      // stocare indisponibila
    }
  }, [workouts]);


  function addWorkout(workout) {
    setWorkouts((prev) => [...prev, { id: nextId(prev), done: false, date: dayKey, ...workout }]);
  }

  function toggleWorkout(id) {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
  }

  function deleteWorkout(id) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }

  const [dailyLog, setDailyLog] = useState(() =>
    loadList("dailyLog", { [dateKey(new Date())]: { steps: 15000, waterMl: 4000 } })
  );

  useEffect(() => {
    try {
      localStorage.setItem("dailyLog", JSON.stringify(dailyLog));
    } catch {
      // stocare indisponibila
    }
  }, [dailyLog]);


  function changeWater(deltaMl) {
    setDailyLog((prev) => {
      const current = prev[dayKey] ?? EMPTY_DAY;
      return { ...prev, [dayKey]: { ...current, waterMl: Math.max(current.waterMl + deltaMl, 0) } };
    });
  }

  function changeSteps(steps) {
    setDailyLog((prev) => {
      const current = prev[dayKey] ?? EMPTY_DAY;
      return { ...prev, [dayKey]: { ...current, steps } };
    });
  }


  const day = dailyLog[dayKey] ?? EMPTY_DAY;
  const dayFoods = foods.filter((f) => f.date === dayKey);
  const dayWorkouts = workouts.filter((w) => w.date === dayKey);

  const macros = sumMacros(dayFoods);
  const kcalEaten = Math.round(kcalFrom(macros));
  const kcalGoal = kcalFrom(DAILY_GOALS);
  const kcalLeft = Math.max(kcalGoal - kcalEaten, 0);
  const missingNutrition = unknownFoods(dayFoods).length;


  function barWidth(key) {
    const progress = Math.min(macros[key] / DAILY_GOALS[key], 1);
    return `${Math.round(40 + 60 * progress)}%`;
  }

  const [tema, setTema] = useState(temaInitiala);
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
   <>
      <button type="button" className="menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <button type="button" className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
  {tema === "dark" ? "Light mode" : "Dark mode"}
</button>
 
      <main className="dashboard">
      
        <section className="left-col" aria-label="Daily summary">
          <nav className="date-nav" aria-label="Date navigation">
            <button
              type="button"
              className="date-chip prev"
              onClick={goToPrevDay}
              aria-label={`Previous day, ${longDate(prevDay)}`}
            >
              <span className="material-symbols-rounded" aria-hidden="true">chevron_left</span>
              <span>{shortDate(prevDay)}</span>
            </button>
            <h2 className="current-date">{longDate(selectedDate)}</h2>
            <button
              type="button"
              className="date-chip next"
              onClick={goToNextDay}
              aria-label={`Next day, ${longDate(nextDay)}`}
            >
              <span>{shortDate(nextDay)}</span>
              <span className="material-symbols-rounded" aria-hidden="true">chevron_right</span>
            </button>
          </nav>
 
          <div className="greeting-row">
            <h1 className="greeting">
              <span className="hi">Hi,</span>
              <span className="name">Oana.</span>
            </h1>
            <div className="shortcuts">
              <button type="button" className="tag-link" data-table="Measurements">
                measurements.
              </button>
              <button type="button" className="tag-link" data-table="WeightHistory">
                weight history.
              </button>
            </div>
          </div>
 
          <p className="subtitle">Let's set up your log for today.</p>
 
          <div className="stat-grid">
            <article className="stat-card steps" data-table="DailyLog.Steps">
              <h3>Steps</h3>
              <p className="stat-big">
                <span className="material-symbols-rounded" aria-hidden="true">directions_walk</span>
                <span>{day.steps}</span>
              </p>
            </article>
 
            <article className="stat-card calories" data-table="DailyLog.CaloriesEaten">
              <h3>Calories</h3>
              <p className="stat-line">eaten : <b>{kcalEaten}</b></p>
              <p className="stat-line">
                left : <b>{kcalLeft}</b>
                <span className="material-symbols-rounded" aria-hidden="true">rice_bowl</span>
              </p>
            </article>
 
            <article className="stat-card water" data-table="DailyLog.WaterIntake">
              <h3>Water<br />intake</h3>
              <div className="water-row">
                <p className="stat-value">{formatLiters(day.waterMl)}</p>
                <span className="material-symbols-rounded water-icon" aria-hidden="true">water_bottle</span>
              </div>
            </article>
 
            <article className="stat-card rest" data-table="Workouts">
              <h3>Rest<br />day</h3>
              <span className="material-symbols-rounded rest-icon" aria-hidden="true">accessibility_new</span>
            </article>
 
            <button type="button" className="self-notes" data-table="DailyLog.SelfNotes">
              <span>Self<br />Notes.</span>
            </button>
          </div>
        </section>
 
        
        <section className="food-log" aria-labelledby="foodLogTitle">
          <div className="food-left">
            <h2 className="section-title" id="foodLogTitle">Food Log.</h2>
            <div className="chip-cloud">
              <button type="button" className="chip chip-wide" data-table="Supplements">Supplements</button>
              <button type="button" className="chip" data-table="Calories">Calories</button>
              <a href="#food-list" className="chip" data-table="FoodTracker">Food</a>
              <button type="button" className="mini-tag" data-table="Calories.Surplus">
                <span className="star" aria-hidden="true">✳</span> Surplus
              </button>
            </div>
          </div>
 
          <div className="macros">
            {MACRO_BARS.map((bar) => (
              <button
                key={bar.key}
                type="button"
                className="macro"
                style={{ "--w": barWidth(bar.key) }}
                data-table={bar.table}
                aria-label={`${bar.label} ${Math.round(macros[bar.key])} of ${DAILY_GOALS[bar.key]} g`}
              >
                <span>{bar.label}</span><b>{Math.round(macros[bar.key])}</b>
              </button>
            ))}
            <button
              type="button"
              className="kcal-line"
              data-table="FoodTracker"
              aria-label={`Total calories: ${kcalEaten} of ${kcalGoal} kcal`}
              title={missingNutrition ? `${missingNutrition} food(s) without nutrition data are not counted` : undefined}
            >
              <span className="spark" aria-hidden="true">✦</span>
              <span className="kcal-text">{kcalEaten} kcal</span>
            </button>
          </div>
        </section>

        
        <section className="workout-log" aria-labelledby="workoutLogTitle">
          <h2 className="section-title" id="workoutLogTitle">Workout Log.</h2>
          <div className="btn-stack">
            <a href="#workout-log" className="pill-btn" data-table="Workouts">Workouts</a>
            <button type="button" className="pill-btn" data-table="Cardio">Cardio</button>
          </div>
        </section>
 
        
        <FoodAddForm onAdd={addMeal} />
 
        
        <section className="recovery-log" aria-labelledby="recoveryLogTitle">
          <h2 className="section-title" id="recoveryLogTitle">Recovery Log.</h2>
          <div className="btn-grid">
            <button type="button" className="pill-btn" data-table="Sleep">Sleep</button>
            <button type="button" className="pill-btn" data-table="Massage">Massage</button>
            <button type="button" className="pill-btn" data-table="Mobility">Mobility</button>
            <button type="button" className="pill-btn" data-table="MedicalRecovery">Medical Recovery</button>
            <button type="button" className="mini-tag injuries-tag" data-table="Injuries">
              <span className="star" aria-hidden="true">✳</span> Injuries
            </button>
          </div>
        </section>
      </main>
 
      
      <FoodTrackList
        foods={dayFoods}
        onDelete={deleteMeal}
        waterMl={day.waterMl}
        waterGoalMl={WATER_GOAL_ML}
        onWaterChange={changeWater}
      />

      <WorkoutLogList
        workouts={dayWorkouts}
        onAdd={addWorkout}
        onToggle={toggleWorkout}
        onDelete={deleteWorkout}
        steps={day.steps}
        stepsGoal={STEPS_GOAL}
        onStepsChange={changeSteps}
      />
 
      <footer className="site-footer">"Web Technology Project" - Fitness Tracking App</footer>
    </>
  );
}