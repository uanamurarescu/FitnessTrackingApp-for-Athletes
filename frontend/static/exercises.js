const names = ['Squats', 'Lunges', 'Deadlifts', 'LegPress', 'CalfRaises', 'LegExtensions', 'LegCurls', 'GluteBridges', 'StepUps'];
const PR = ['100 kg', '80 kg', '120 kg', '150 kg', '60 kg', '70 kg', '50 kg', '90 kg', '40 kg'];
const executionForm =['deep squats', 'forward lunges', 'Romanian deadlifts', 'machine leg press', 'standing calf raises', 'seated leg extensions', 'lying leg curls',' lateral step-ups'];



const exercises = [
    {id: 1, name: names[0], PR: PR[0], executionForm: executionForm[0]},
    {id: 2, name: names[1], PR: PR[1], executionForm: executionForm[1]},
    {id: 3, name: names[2], PR: PR[2], executionForm: executionForm[2]},
    {id: 4, name: names[3], PR: PR[3], executionForm: executionForm[3]}
]

function listNames(lista) {
    return lista.map((e) => e.name);
}

function countActive(lista) {
    return lista.filter((e) => !e.active).length;
}

function searchByName(lista, text) {
    return lista.filter((e) => e.name.toLowerCase().includes(text.toLowerCase()));
}

function nextId(lista) {
    return lista.reduce((max, e) => Math.max(max, e.id), 0) + 1;
}

function addExercise(lista, name, pr, form) {
const ClearName = name.trim();
    if (ClearName === "") {
        console.log("A name needs to be written.");
        return lista;
    }
    if (executionForm.includes(form)) {
        console.log("Invalid execution form.");
        return lista;
    }
    const nou = { id: nextId(lista), name: ClearName, PR: pr, executionForm: form };
    return [...lista, nou];
}

function deleteExercise(lista, id) {
    return lista.filter((e) => e.id !== id);
}

console.log("--- READ ---");
console.log("Name:", listNames(exercises).join(", "));
console.log("Search 'press':", listNames(searchByName(exercises, "press")).join(", "));

console.log("--- ADD ---");
let lista = addExercise(exercises, "Calf Raises", "60 kg", "standing calf raises");
console.log("New list:", lista.length, "exercises");
console.log("The original remained:", exercises.length, "exercises");

console.log("--- DELETE ---");
lista = deleteExercise(lista, 3);
console.log("After deleting id 3:", listNames(lista).join(", "));

console.log("--- VALIDATION ---");
addExercise(lista, "");
addExercise(lista, "Pullups", "50 kg", "invalid form");