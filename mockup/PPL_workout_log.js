const exercises = ['Barbell Bench Press', 'Incline Dumbbell Press', 'Overhead Press', 'Cable Fly', 'Lateral Raise', 'Triceps Pushdown', 'Overhead Triceps Extension',
                'Pull-Up', 'Lat Pulldown', 'Barbell Row', 'Seated Cable Row', 'Face Pull', 'Rear Delt Fly', 'Barbell Curl', 'Hammer Curl',
                'Barbell Squat', 'Romanian Deadlift', 'Leg Press', 'Bulgarian Split Squat', 'Leg Extension', 'Leg Curl', 'Calf Raise'
];
const sets_x_reps = ['3x8', '2x10', '3x12', '3x12', '3x6', '3x10', '3x10', '2x8'];
const PPL = ['PushWorkout', 'PullWorkout', 'LegsWorkout'];


const PPL_Exercises_log = [
    // PUSH
    {id: 1,  exercises: exercises[0],  volume: sets_x_reps[0], split: PPL[0]},
    {id: 2,  exercises: exercises[1],  volume: sets_x_reps[1], split: PPL[0]},
    {id: 3,  exercises: exercises[2],  volume: sets_x_reps[2], split: PPL[0]},
    {id: 4,  exercises: exercises[3],  volume: sets_x_reps[3], split: PPL[0]},
    {id: 5,  exercises: exercises[4],  volume: sets_x_reps[4], split: PPL[0]},
    {id: 6,  exercises: exercises[5],  volume: sets_x_reps[5], split: PPL[0]},
    {id: 7,  exercises: exercises[6],  volume: sets_x_reps[6], split: PPL[0]},
    // PULL
    {id: 8,  exercises: exercises[7],  volume: sets_x_reps[7], split: PPL[1]},
    {id: 9,  exercises: exercises[8],  volume: sets_x_reps[0], split: PPL[1]},
    {id: 10, exercises: exercises[9],  volume: sets_x_reps[1], split: PPL[1]},
    {id: 11, exercises: exercises[10], volume: sets_x_reps[2], split: PPL[1]},
    {id: 12, exercises: exercises[11], volume: sets_x_reps[3], split: PPL[1]},
    {id: 13, exercises: exercises[12], volume: sets_x_reps[4], split: PPL[1]},
    {id: 14, exercises: exercises[13], volume: sets_x_reps[5], split: PPL[1]},
    {id: 15, exercises: exercises[14], volume: sets_x_reps[6], split: PPL[1]},
    // LEGS
    {id: 16, exercises: exercises[15], volume: sets_x_reps[7], split: PPL[2]},
    {id: 17, exercises: exercises[16], volume: sets_x_reps[0], split: PPL[2]},
    {id: 18, exercises: exercises[17], volume: sets_x_reps[1], split: PPL[2]},
    {id: 19, exercises: exercises[18], volume: sets_x_reps[2], split: PPL[2]},
    {id: 20, exercises: exercises[19], volume: sets_x_reps[3], split: PPL[2]},
    {id: 21, exercises: exercises[20], volume: sets_x_reps[4], split: PPL[2]},
    {id: 22, exercises: exercises[21], volume: sets_x_reps[5], split: PPL[2]},
]

function listExercises(lista) {
    return lista.map((e) => e.exercises);
}

function countBySplit(lista, split) {
    return lista.filter((e) => e.split === split).length;
}

function searchByExercise(lista, text) {
    return lista.filter((e) => e.exercises.toLowerCase().includes(text.toLowerCase()));
}

function nextId(lista) {
    return lista.reduce((max, e) => Math.max(max, e.id), 0) + 1;
}

function addExercise(lista, exercise, volume, split) {
    const clearName = (exercise ?? "").trim();
    if (clearName === "") {
        console.log("An exercise name needs to be written.");
        return lista;
    }
    if (!PPL.includes(split)) {
        console.log("Invalid split.");
        return lista;
    }
    const nou = { id: nextId(lista), exercises: clearName, volume: volume, split: split };
    return [...lista, nou];
}

function deleteExercise(lista, id) {
    return lista.filter((e) => e.id !== id);
}

console.log("--- READ ---");
console.log("Exercises:", listExercises(PPL_Exercises_log).join(", "));
console.log("Search 'press':", listExercises(searchByExercise(PPL_Exercises_log, "press")).join(", "));
console.log("Push exercises:", countBySplit(PPL_Exercises_log, "PushWorkout"));
console.log("Pull exercises:", countBySplit(PPL_Exercises_log, "PullWorkout"));
console.log("Legs exercises:", countBySplit(PPL_Exercises_log, "LegsWorkout"));

console.log("--- ADD ---");
let lista = addExercise(PPL_Exercises_log, "Dips", "3x10", "PushWorkout");
console.log("New list:", lista.length, "exercises");
console.log("The original remained:", PPL_Exercises_log.length, "exercises");

console.log("--- DELETE ---");
lista = deleteExercise(lista, 3);
console.log("After deleting id 3:", listExercises(lista).join(", "));

console.log("--- VALIDATION ---");
addExercise(lista, "");
addExercise(lista, "Dips", "3x10", "invalid split");