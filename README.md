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
| `Claude` | CSS styling, structure refinement, and debugging code, stage 1 |

Details per stage: see the `ai-log/` folder.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript