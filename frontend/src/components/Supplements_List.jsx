import "./Food_Tracker.css";
import { MEAL_OPTIONS } from "./Food_AddForm.jsx";


function mealLabel(value) {
  return MEAL_OPTIONS.find((m) => m.value === value)?.label ?? value;
}


export default function SupplementsList({ supplements, loading, error, onToggle, onDelete, children }) {
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

      {children}

      {loading && (
        <p className="info" data-testid="loading">
          Loading supplements...
        </p>
      )}

      {error && (
        <p className="error" data-testid="error">
          Something went wrong: {error}. Is <code>npm run api</code> running?
        </p>
      )}
      {!loading && supplements.length === 0 && (
        <p className="meal-empty" data-testid="empty">
          No supplements yet.
        </p>
      )}

      {!loading && supplements.length > 0 && (
        <ul className="supp-table">
          {supplements.map((s) => (
            <li
              key={s.id}
              className={`supp-cell${s.taken ? " supp-cell--taken" : ""}`}
              data-testid="item"
              data-id={s.id}
            >
              <label className="supp-check">
                <input
                  type="checkbox"
                  checked={s.taken}
                  onChange={() => onToggle(s.id)}
                  data-testid="item-toggle"
                />
                <span className="supp-text">
                  <span className="supp-name" data-testid="item-title">{s.name}</span>
                  <span className="supp-dose">{s.dose}</span>
                </span>
              </label>
              <span className="supp-meal">{mealLabel(s.mealLog)}</span>
              <button
                type="button"
                className="food-delete"
                onClick={() => onDelete(s.id)}
                aria-label={`Delete ${s.name}`}
                data-testid="item-delete"
              >
                <span className="material-symbols-rounded" aria-hidden="true">
                  close
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}