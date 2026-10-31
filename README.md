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
## Stage 5: local state and events
The dashboard now works with data kept in React state, owned by `App.jsx` and passed down through props.

- **Workout log (Push / Pull / Legs):** exercises can be added, ticked and deleted from the page. A ticked exercise gets its name crossed out, and the counters ("22 exercises, 21 left to do", "1 / 7 done") are computed from the list, not stored separately.
- **One log per day:** the arrows next to the date move between days. Each day has its own foods, exercises, water intake and steps, so a new day starts empty.
- **Calories and macros:** carbs, protein, fats and the total kcal are calculated from the foods logged that day, using the values per 100 g in `nutrition.js`. The bars show the progress towards the daily goal (2060 kcal), and the Calories card shows what was eaten and what is left.
- **Water and steps:** water is added in steps of 250 / 500 ml under the food tracker, and daily steps are saved next to the workout splits. Both update the Water intake and Steps cards.
- **Light / dark mode:** a button switches the theme by setting `data-theme` on `<html>`. All colours come from CSS variables in `index.css`, in a Daisy Bush (#4C1C9F) and Orchid (#E97AD3) palette, with a matching dark version.

New components added in this stage:
- `Exercises_AddForm.jsx` – the white row for adding an exercise (name, sets x reps, split), with validation. It also defines and exports the `SPLIT_OPTIONS` array.
- `Exercises_LogList.jsx` – groups the day's exercises into Push / Pull / Legs columns and computes the counters.
- `Exercises_LogCard.jsx` – one exercise, with a controlled checkbox (`onToggle`) and a delete button (`onDelete`).
- `Exercises_Steps.jsx` – the Steps column: shows the day's steps and progress, and saves a new total.
- `Food_WaterIntake.jsx` – the Water intake row under the meal columns, with a progress bar and +250 / +500 / −250 ml buttons.
- `Exercises_Log.css` – the styles of the workout log and the Steps column.
- `nutrition.js` – the nutrition values per 100 g and the functions that add up the macros and calories.

All updates are immutable (`map`, `filter`, spread), never `push` or direct assignment. The data is saved in `localStorage`, so it stays after a refresh in the same browser. Stage 6 will load it from an API and stage 10 will store it in the database.



## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite & React
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API


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

## Stage 2: checklist
 
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S2-R1 | JS file linked, logs on page load | [index.html#L160](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/frontend/static/index.html#L160) (script) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [exercises.js#L7-L12](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/frontend/static/exercises.js#L7-L12) (no state field) | read |
| S2-R3 | list, count, search, add, toggle, delete | [exercises.js#L14-L46](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/frontend/static/exercises.js#L14-L46) (no toggle function) | console output |
| S2-R4 | add rejects empty name and invalid tag | [exercises.js#L30-L39](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/frontend/static/exercises.js#L30-L39), [exercises.js#L61-L63](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/frontend/static/exercises.js#L61-L63) (tag check inverted) | last 2 console lines |
| S2-R5 | original array unchanged after add | [exercises.js#L55](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/frontend/static/exercises.js#L55) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md#L32-L34](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/README.md#L32-L34), [etapa-02.md](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/b5a0a1c7451b8a0326f8466cfd109de4f069c334/ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [0de6357](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/0de6357ac22da14bce412f6c4626c59ebd3afab2) | commit history |

## Stage 3: checklist
 
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S3-R1 | npm run dev starts without errors | [package.json#L6-L11](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/frontend/package.json#L6-L11) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx#L13-L22](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/frontend/src/App.jsx#L13-L22) | edit data, save |
| S3-R3 | data from README, not from the example | [App.jsx#L1-L10](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/frontend/src/App.jsx#L1-L10) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [.gitignore#L10](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/frontend/.gitignore#L10) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md#L35-L42](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/README.md#L35-L42), [etapa-03.md](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/a29b48a5fe84de979cd8d64aa8fc5489807c63d1/ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [a29b48a](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/a29b48a5fe84de979cd8d64aa8fc5489807c63d1) | commit history |

## Stage 4: checklist
 
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/tree/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [Food_TrackCard.jsx#L3-L9](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6/frontend/src/components/Food_TrackCard.jsx#L3-L9) | read |
| S4-R3 | map + key={id}, no console warnings | [Food_TrackList.jsx#L25-L53](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6/frontend/src/components/Food_TrackList.jsx#L25-L53) | F12, Console |
| S4-R4 | message for empty list | [Food_TrackList.jsx#L42-L43](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6/frontend/src/components/Food_TrackList.jsx#L42-L43) | set array to [] |
| S4-R5 | state changes the card look | — (the food card has no state-dependent look) | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | [README.md#L43-L48](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6/README.md#L43-L48), [etapa-04.md](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6/ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [1944004](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/19440042c113cab62ecfb3e0e0f342031bed5875), [06837ee](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/06837eee6841c7c8f488721fb68eeb2b3fb6b9b6) | commit history |

## Stage 5: checklist
 
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S5-R1 | list kept in useState, in App | [App.jsx#L99](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/App.jsx#L99) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L110-L114](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/App.jsx#L110-L114), [Exercises_LogCard.jsx#L5-L11](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/components/Exercises_LogCard.jsx#L5-L11) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L115-L117](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/App.jsx#L115-L117), [Exercises_LogCard.jsx#L17-L22](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/components/Exercises_LogCard.jsx#L17-L22) | click ✕ |
| S5-R4 | header counter derived, not in state | [Exercises_LogList.jsx#L6-L16](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/components/Exercises_LogList.jsx#L6-L16) | tick an exercise, watch the counter |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L91-L117](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/App.jsx#L91-L117) | read |
| S5-R6 | light / dark toggle: state + data-theme on html | [App.jsx#L119-L124](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/App.jsx#L119-L124), [App.jsx#L134-L136](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/App.jsx#L134-L136), [index.css#L45-L102](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/7f9621472c200b201e315115b7315b99f1fbfbd5/frontend/src/index.css#L45-L102) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/main/README.md), [ai-log/etapa-05.md](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/blob/main/ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [4959932](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/495993220bc65ee016408b4cf8e8e35a25f5b6c6), [7f96214](https://github.com/uanamurarescu/FitnessTrackingApp-for-Athletes/commit/7f9621472c200b201e315115b7315b99f1fbfbd5) | commit history |