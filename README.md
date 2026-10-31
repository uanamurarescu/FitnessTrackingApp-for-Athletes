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

## Stage 1: checklist
 
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S1-R1 | README: description, fields, sample data, how to run | [README.md#L1-L21](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/README.md#L1-L21), [README.md#L38-L42](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/README.md#L38-L42) | read |
| S1-R2 | AI usage section | [README.md#L23-L30](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/README.md#L23-L30) | read |
| S1-R3 | AI log for stage 1 | [etapa-01.md](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L55](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/index.html#L10-L55) | open the page |
| S1-R5 | finished card looks different | [style.css#L173-L176](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/styles/style.css#L173-L176) (.done), [index.html#L40](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/index.html#L40) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L46-L54](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/styles/style.css#L46-L54) (grid), [style.css#L190-L194](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/styles/style.css#L190-L194) (@media) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L185-L188](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/styles/style.css#L185-L188) (:focus-visible), [style.css#L196-L205](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/6364b9534277da60389c6ec7ba2d5d5992e195c4/frontend/static/styles/style.css#L196-L205) (dark theme) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [ac4655a](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/ac4655aae38d07045cfdd7c2eafd81e2738d7975), [55c6240](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/55c62405abd6829893cd4877ce8789d541a80549) | commit history |

