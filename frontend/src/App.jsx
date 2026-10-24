import { useState , useEffect } from "react";
import FoodTrackList from "./components/Food_TrackList.jsx";
import FoodAddForm from "./components/Food_AddForm.jsx";
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
  const [foods, setFoods] = useState(() => {
    try {
      const memorizeDeleted = localStorage.getItem("foods");
      return memorizeDeleted ? JSON.parse(memorizeDeleted) : initialFoods;
    } catch {
      return initialFoods;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("foods", JSON.stringify(foods));
    } catch {
    }
  }, [foods]);

  const totalGrams = foods.reduce((sum, e) => sum + e.quantity, 0);

  function addMeal(food) {
    setFoods((prev) => addFood(prev, food));
  }
 
  function deleteMeal(id) {
    setFoods((prev) => deleteFood(prev, id));
  }
  return (
   <>
      <button type="button" className="menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
 
      <main className="dashboard">
      
        <section className="left-col" aria-label="Daily summary">
          <nav className="date-nav" aria-label="Date navigation">
            <button type="button" className="date-chip prev" aria-label="Previous day">
              <span className="material-symbols-rounded" aria-hidden="true">chevron_left</span>
              <span>22/10</span>
            </button>
            <h2 className="current-date">23 October 2026</h2>
            <button type="button" className="date-chip next" aria-label="Next day">
              <span>24/10</span>
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
                <span>15000</span>
              </p>
            </article>
 
            <article className="stat-card calories" data-table="DailyLog.CaloriesEaten">
              <h3>Calories</h3>
              <p className="stat-line">eaten : <b>1800</b></p>
              <p className="stat-line">
                left : <b>260</b>
                <span className="material-symbols-rounded" aria-hidden="true">rice_bowl</span>
              </p>
            </article>
 
            <article className="stat-card water" data-table="DailyLog.WaterIntake">
              <h3>Water<br />intake</h3>
              <div className="water-row">
                <p className="stat-value">4 L</p>
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
            <button type="button" className="macro" style={{ "--w": "100%" }} data-table="NutritionalValues.Carbs">
              <span>carbs.</span><b>250</b>
            </button>
            <button type="button" className="macro" style={{ "--w": "82%" }} data-table="NutritionalValues.Protein">
              <span>protein.</span><b>130</b>
            </button>
            <button type="button" className="macro" style={{ "--w": "64%" }} data-table="NutritionalValues.Fats">
              <span>fats.</span><b>60</b>
            </button>
            <button type="button" className="kcal-line" data-table="FoodTracker" aria-label="Total calories: 2060 kcal">
              <span className="spark" aria-hidden="true">✦</span>
              <span className="kcal-text">2060 kcal</span>
            </button>
          </div>
        </section>

        
        <section className="workout-log" aria-labelledby="workoutLogTitle">
          <h2 className="section-title" id="workoutLogTitle">Workout Log.</h2>
          <div className="btn-stack">
            <button type="button" className="pill-btn" data-table="Workouts">Workouts</button>
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
 
      
      <FoodTrackList foods={foods} onDelete={deleteMeal} />
 
      <footer className="site-footer">"Web Technology Project" - Fitness Tracking App</footer>
    </>
  );
}