import "./Food_Tracker.css";


const WATER_AMOUNTS = [-250, 250, 500, 750, 1000];

function toLiters(ml) {
  return Number((ml / 1000).toFixed(2));
}

export default function FoodWaterIntake({ waterMl, goalMl, onChange }) {
  const progress = Math.min(waterMl / goalMl, 1);

  return (
    <section className="water-box" aria-labelledby="waterTitle">
      <div className="water-head">
        <h3 className="water-title" id="waterTitle">
          <span className="material-symbols-rounded" aria-hidden="true">water_drop</span>
          Water intake.
        </h3>
        <p className="water-amount">
          <b>{toLiters(waterMl)}</b> / {toLiters(goalMl)} L
        </p>
      </div>

      <div
        className="water-bar"
        role="progressbar"
        aria-label="Water intake"
        aria-valuemin={0}
        aria-valuemax={goalMl}
        aria-valuenow={waterMl}
        aria-valuetext={`${toLiters(waterMl)} of ${toLiters(goalMl)} liters`}
      >
        <span className="water-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="water-buttons">
        {WATER_AMOUNTS.map((ml) => (
          <button
            key={ml}
            type="button"
            className={ml < 0 ? "water-btn water-btn--minus" : "water-btn"}
            onClick={() => onChange(ml)}
            disabled={ml < 0 && waterMl === 0}
            aria-label={ml < 0 ? `Remove ${-ml} ml of water` : `Add ${ml} ml of water`}
          >
            {ml < 0 ? `− ${-ml} ml` : `+ ${ml} ml`}
          </button>
        ))}
      </div>
    </section>
  );
}