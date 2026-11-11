import "./Food_Tracker.css";
import { MEAL_OPTIONS } from "./Food_AddForm.jsx";


function mealLabel(value) {
  return MEAL_OPTIONS.find((m) => m.value === value)?.label ?? value;
}

export default function SupplementsList({ supplements, loading, error, onToggle }) {
  const taken = supplements.filter((s) => s.taken).length;

  return (
    <section className="food-panel" id="supplements-list" aria-labelledby="supplementsTitle">
      <div className="food-panel-head">
        <h2 className="section-title" id="supplementsTitle">
          Daily supplements.
        </h2>
        <p className="food-count">
          {supplements.length} supplements, {taken} taken
        </p>
      </div>
      <p className="food-panel-sub">What to take today and with which meal.</p>

      {loading && <p className="info">Loading supplements...</p>}

      {error && (
        <p className="error">
          Could not load the supplements: {error}. Did you run <code>npm run api</code>?
        </p>
      )}

      {!loading && !error && (
        <ul className="supp-table">
          {supplements.map((s) => (
            <li key={s.id} className={`supp-cell${s.taken ? " supp-cell--taken" : ""}`}>
              <label className="supp-check">
                <input
                  type="checkbox"
                  checked={s.taken}
                  onChange={() => onToggle(s.id)}
                />
                <span className="supp-text">
                  <span className="supp-name">{s.name}</span>
                  <span className="supp-dose">{s.dose}</span>
                </span>
              </label>
              <span className="supp-meal">{mealLabel(s.mealLog)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}