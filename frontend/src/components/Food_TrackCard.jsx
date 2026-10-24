import "./Food_Tracker.css";

export default function FoodTrackCard({ food, onDelete }) {
  return (
    <li className="food-card">
      <div className="food-main">
        <h4 className="food-name">{food.name}</h4>
        <p className="food-details">{food.quantity} g</p>
      </div>
      {onDelete && (
        <button
          type="button"
          className="food-delete"
          onClick={() => onDelete(food.id)}
          aria-label={`Delete ${food.name}`}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            close
          </span>
        </button>
      )}
    </li>
  );
}