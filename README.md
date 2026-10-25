# FITNESS TRACKING APP FOR ATHLETES

Description: Fully focused on any athletes' fitness needs, the purpose of the app is to become an all-in-one place for all types of fitness trackings of people who practice any physical activity from weightlifting or running to elite-sports athletes. The functions of the app cover the tracking of food, water, recovery, injuries, training, as it is meant to serve as a personal journal of fitness progress.

## Data model

| Field | Type | Notes |
| :--- | :--- | :--- |
| `Users` | relation | FullName, Age, Sex, ActiveLevel, Target |
| `DailyLog` | relation | Date, Steps, WaterIntake, CaloriesEaten, CaloriesLeft, SelfNotes |
| `Food` | relation | Barcode, Name, Category (fruit, vegetable, meat, etc.) |
| `Exercises` | relation | Name, PR, ExecutionForm |
| `Workouts` | relation | Date, Type, SelfNotes |
| `Recovery` | relation | Date, RecovType |
| `Injuries` | relation | Diagnosis, MuscleGroup, Status |
| `Measurements` | relation | Neck, Chest, Arm, Waist, Hips, Thigh, Calf |

Sample data used across all stages:
1. `John Doe`, active, `Users`
2. `Chicken Breast`, 9686546468779, `Food`
3. `Bench Press`, working set, `Exercises`

## AI usage

| Model / Tool | Integration Scope |
| :--- | :--- |
| `Gemini PRO` | HTML debugging code |
| `Claude PRO` | CSS styling, structure refinement, and debugging code, stage 1 |

Details per stage: see the `ai-log/` folder.

## Stage 2: data logic
Plain JavaScript, no DOM. `quick_food_tracked.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).
## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the list is still printed raw.
## How to run
cd frontend
npm install
npm run dev
Then open the address printed in the terminal (http://localhost:5173).
## Stage 4: components
The food tracker is rendered from the data, through three components. The data lives in `App.jsx`, which keeps the food list in state (`useState`), saves it in `localStorage` and passes it down through props:
- `Food_AddForm.jsx` – the "Food Tracker Shortcut." form: reads the food name, quantity and meal, validates them and sends the new food to `App.jsx` through the `onAdd` prop. It also defines and exports the `MEAL_OPTIONS` array (the 6 meals).
- `Food_TrackList.jsx` – receives the whole array and groups it into 6 columns, one per meal from `MEAL_OPTIONS`, with the number of items and total grams for each meal.
- `Food_TrackCard.jsx` – receives a single food through props and displays its name and quantity, with an X button that deletes it through the `onDelete` prop.
- `Food_Tracker.css` – the styles of the three components: the form layout, the meal columns and their colors, and the food cards. General components and variables come from `index.css`.



## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite & React
- [x] Stage 4: components rendered from data
- ☐ Stage 5: local state and events

