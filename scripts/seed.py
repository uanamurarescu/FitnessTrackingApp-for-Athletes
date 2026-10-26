import random
from faker import Faker
from app.db import run_execute, run_select
from dotenv import load_dotenv
load_dotenv()
faker = Faker()

NUM_USERS = 300
NUM_LOGS = 500
NUM_ACCS = 300
NUM_ACCACT = 1000
NUM_FOODS = 400
NUM_MG = 45
NUM_MEASURE = 300
NUM_WG = 1500
NUM_MedRecov = 150

log = run_select("SELECT LogID FROM DailyLog")
user = run_select("SELECT UserID FROM Users")
exercise = run_select("SELECT ExerciseID FROM Exercises")
recov = run_select("SELECT RecovID FROM Recovery")
injury = run_select("SELECT InjuryID FROM Injuries")
food_ids = run_select("SELECT FoodID FROM Food")
exercise_ids = run_select("SELECT ExerciseID FROM Exercises")
mg_ids = run_select("SELECT MGID FROM MuscleGroups")

print("Tester users generating..")
for _ in range(NUM_USERS):
    run_execute("""
        INSERT INTO Users (FullName, Age, Sex, ActiveLevel, Target)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        faker.name(),
        random.randint(1, 100),
        random.choice(["M", "F", "N/A"]),
        random.choice(["sedentary", "active", "very active"]),
        random.choice(["lose weight", "gain weight", "gain muscle", "maintain", "become more active"])
    ))
print("Users Accounts generating..")
usernamer= run_select("SELECT UserID, FullName FROM Users")
for u in usernamer:
    UserID, FullName = u
    user_log = run_select("SELECT LogID FROM DailyLog WHERE UserID = %s", (UserID,))
    LogID = log[0][0] if log else None
    suffix = faker.unique.bothify(text='#####')
    username = f"{FullName.lower().strip()[:10]}{suffix}"
    password = faker.password( )
    run_execute("""
                INSERT INTO UsersAccounts (Username, Password, UserID, LogID)
                VALUES (%s, %s, %s, %s)
    """, (
            username,
            password,
            UserID,
            LogID
    ))

print("DailyLogs generating..")
for u in user:
    u_id = u[0]
    run_execute("""
        INSERT INTO DailyLog (UserID, Date, Steps, WaterIntake, CaloriesEaten, CaloriesLeft)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        u_id,
        faker.date_time_this_year(),
        faker.random_int(0, 30000),
        faker.random_int(0, 10),
        faker.random_int(1, 3000),
        faker.random_int(1, 2000)
    ))
log = run_select("SELECT LogID FROM DailyLog")

print("MuscleGroups generating..")
skeletal_muscles = [
    # Spate (Back)
    "Upper Trapezius",
    "Middle Trapezius",
    "Lower Trapezius",
    "Latissimus Dorsi",
    "Rhomboid",
    "Levator Scapulae",
    "Iliocostalis",
    "Longissimus",
    "Spinalis",

    # Piept (Chest)
    "Pectoralis Major (Clavicular)",
    "Pectoralis Major (Sternal)",
    "Pectoralis Major (Abdominal)",
    "Pectoralis Minor",
    "Serratus Anterior",

    # Abdomen și Core
    "Rectus Abdominis",
    "External Obliques",
    "Internal Obliques",
    "Transversus Abdominis",

    # Umăr (Shoulder)
    "Anterior Deltoid",
    "Lateral Deltoid",
    "Posterior Deltoid",

    # Braț (Arm)
    "Biceps Brachii (Long Head)",
    "Biceps Brachii (Short Head)",
    "Brachialis",
    "Triceps Brachii (Long Head)",
    "Triceps Brachii (Lateral Head)",
    "Triceps Brachii (Medial Head)",
    "Brachioradial",

    # Fesieri (Gluteals)
    "Gluteus Maximus",
    "Gluteus Medius",
    "Gluteus Minimus",

    # Coapsă - Fața Anterioară (Quadriceps)
    "Rectus Femoris",
    "Vastus Lateralis",
    "Vastus Medialis",
    "Vastus Intermedius",
    "Sartorius",

    # Coapsă - Fața Posterioară (Hamstrings)
    "Biceps Femoris (Long Head)",
    "Biceps Femoris (Short Head)",
    "Semitendinosus",
    "Semimembranosus",

    "Adductor",

    # Gambă (Calves)
    "Gastrocnemius (Medial Head)",
    "Gastrocnemius (Lateral Head)",
    "Soleus",
    "Tibialis Anterior"
]
for _ in range(NUM_MG):
    run_execute("""
        INSERT INTO MuscleGroups (TargetMuscle)
        VALUES (%s)
    """, (
             random.choice(skeletal_muscles),
     ))

print("Measurements generating..")
for l in log:
    l_id = l[0]
    run_execute("""
        INSERT INTO Measurements (Date, LogID, Neck, Chest, Arm, Waist, Hips, Glutes, Thigh, Calf)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
            faker.date_time_this_year(),
            l_id,
            faker.random_int(15, 60),
            faker.random_int(70, 200),
            faker.random_int(20, 100),
            faker.random_int(40, 200),
            faker.random_int(60, 200),
            faker.random_int(60, 200),
            faker.random_int(30, 200),
            faker.random_int(20, 60),
    ))

print("WeightHistory generating..")
for l in log:
    l_id = l[0]
    kg_value = round(random.uniform(50.0, 120.0), 1)
    run_execute("""
        INSERT INTO WeightHistory ( LogID, KG, Date, MeanWeight_week)
        VALUES (%s, %s, %s, %s)
    """, (
                    l_id,
                    faker.random_int(10, 1000),
                    faker.date_time_this_year(),
                    kg_value
))
    #meanweight updatabil prin triggers
print("Recovery generating..")
for l in log:
    l_id = l[0]
    run_execute("""
                INSERT INTO Recovery (LogID, RecovType, Date)
                VALUES (%s, %s, %s)
                """,
                (l_id,
                 random.choice(['Sauna', 'Cold Bath', 'Stretching', 'Compression']),
                 faker.date_time_this_year(),
    ))

print("Sleep generating..")
for r in recov:
    r_id = r[0]
    run_execute("""
                INSERT INTO Sleep (RecovID, NumberOfHours,SleepScore, TimeOfGoingToSleep,TimeOfWakingUp)
                VALUES (%s, %s, %s, %s)
                """, (r_id,
                      random.randint(0, 12),
                      random.randint(0, 5),
                      faker.time(pattern="%H:%M"),
                      faker.time(pattern="%H:%M"),
    ))

# 3. SEED MOBILITY
print("Mobility generating...")
mobility_exercises = [
    "Neck Retractions & Rotations",
    "Scapular Wall Slides",
    "Arm Circles & Pass-Throughs",
    "Cat-Cow Stretch",
    "Thoracic Foam Rolling / Open Books",
    "World's Greatest Stretch",
    "90/90 Hip Stretch",
    "Cossack Squat",
    "Deep Squat Prying (Asian Squat)",
    "Standing Leg Swings",
    "Downward Dog to Cobra Flow",
    "Ankle Dorsiflexion Wall Stretch"
]

target_areas = [
    "Cervical Spine / Neck",
    "Shoulders & Upper Back (Scapulae)",
    "Shoulder Joints & Rotator Cuff",
    "Thoracic & Lumbar Spine",
    "Thoracic Spine (Mid-back)",
    "Hips, Thoracic Spine, Hamstrings, and Groin",
    "Hips (Internal & External Rotators) / Glutes",
    "Hips, Adductors (Inner Thighs), and Ankles",
    "Hips, Ankles, and Lower Back",
    "Hip Flexors, Hamstrings, and Abductors",
    "Calves, Hamstrings, Shoulders, and Lower Back",
    "Ankles / Calves (Soleus & Gastrocnemius)"
]
for r in recov:
    r_id = r[0]
    run_execute("""
                INSERT INTO Mobility (RecovID, Exercise, TargetArea)
                VALUES (%s, %s, %s)
                """, (r_id,
                      random.choice(mobility_exercises),
                      random.choice(target_areas),
    ))

print("Massage generating...")
for r in recov:
    r_id = r[0]
    run_execute("""
                INSERT INTO Massage (RecovID, Type, MuscleGroup)
                VALUES (%s, %s, %s)
                """, (r_id,
                      random.choice(['Relaxing', 'Sports', 'Therapeutic', 'Hot Stone', 'Deep Tissue', 'Thai', 'Aromatherapy', 'Swedish']),
                      random.choice(['Full Body', 'Neck', 'Back', 'Legs', 'Upper Body', 'Feet']),
    ))

print("Injuries generating...")
injuries_diagnosis = [
    "Muscle strain",
    "Muscle tear",
    "Muscle contracture",
    "Tendinitis",
    "Achilles tendon rupture",
    "Achilles tendinitis",
    "Iliotibial band syndrome",
    "Hamstring strain",
    "Ankle sprain",
    "Knee sprain",
    "Anterior cruciate ligament tear",
    "Posterior cruciate ligament tear",
    "Medial collateral ligament tear",
    "Shoulder dislocation",
    "Patellar dislocation",
    "Shoulder instability",
    "Meniscus tear",
    "Chondromalacia patella",
    "Articular cartilage injury",
    "Stress fracture",
    "Clavicle fracture",
    "Radius fracture",
    "Metatarsal fracture",
    "Scaphoid fracture",
    "Herniated disc",
    "Lower back pain",
    "Spondylolisthesis",
    "Cervical sprain",
    "Plantar fasciitis",
    "Shin splints",
    "Lateral epicondylitis",
    "Medial epicondylitis",
    "Bursitis",
    "Shoulder impingement syndrome",
    "Rotator cuff tear",
    "Contusion",
    "Concussion",
    "Muscle cramps",
]
for userid in user:
    u_id = userid[0]
    run_execute("""
                INSERT INTO Injuries (UserID, Diagnosis, MuscleGroup, Status)
                VALUES (%s, %s, %s, %s)
                """, (u_id,
                      random.choice(injuries_diagnosis),
                      random.choice(skeletal_muscles),
                      random.choice(["taking a break", "light activities", "bed recovery", "hospital recovery", "kinetotherapy recovery", "almost recovered", "fully recovered"]),

    ))

print("Medical Recovery generating...")
recovery_types = [
    "Rest and activity modification",
    "RICE protocol (rest, ice, compression, elevation)",
    "Physical therapy",
    "Strength training rehabilitation",
    "Stretching and mobility exercises",
    "Range of motion exercises",
    "Balance and proprioception training",
    "Gait retraining",
    "Manual therapy",
    "Massage therapy",
    "Dry needling",
    "Ultrasound therapy",
    "Electrical stimulation (TENS/NMES)",
    "Shockwave therapy",
    "Cryotherapy",
    "Heat therapy",
    "Hydrotherapy",
    "Kinesiology taping",
    "Bracing and immobilization",
    "Cast immobilization",
    "Crutches and protected weight bearing",
    "Corticosteroid injection",
    "Platelet-rich plasma (PRP) therapy",
    "Anti-inflammatory medication",
    "Pain management",
    "Surgical repair",
    "Arthroscopic surgery",
    "Ligament reconstruction surgery",
    "Post-surgical rehabilitation",
    "Cognitive rest and gradual return to activity",
    "Sport-specific training",
    "Return-to-play progression",
    "Orthotics and footwear modification",
    "Posture correction and ergonomic training",
    "Core stabilization training",
    "Occupational therapy",
]
for r in recov:
    r_id = r[0]
    run_execute("""
                    INSERT INTO MedicalRecovery (RecovID, InjuryID, Type)
                    VALUES (%s, %s, %s)
                    """, (r_id,
                          injury,
                          random.choice(recovery_types),
    ))

print("Food Tracker & Nutritional Values generating...")
for l in log:
    l_id = l[0]
    f_id = food_ids[0]
    food_id = random.choice(f_id) if f_id else None
    run_execute("""
                INSERT INTO FoodTracker (LogID, FoodID, Grams, Meal)
                VALUES (%s, %s, %s, %s)
                """, (
                    l_id,
                    food_id,
                    random.randint(0, 5000),
                    random.choice(['Breakfast', 'Lunch', 'Dinner', 'Snack 1', 'Snack 2']),
                ))

    if food_id:
        run_execute("""
                    INSERT INTO NutritionalValues (FoodID, Protein, Carbs, Sugar, Fibers, Fats, SaturatedFats, Salt)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        food_id,
                        f"{random.randint(0, 200)}g",
                        f"{random.randint(00, 300)}g",
                        f"{random.randint(0, 200)}g",
                        f"{random.randint(0, 15)}g",
                        f"{random.randint(0, 200)}g",
                        f"{random.randint(0, 100)}g",
                        f"{random.uniform(0.1, 2.0):.1f}g",
                    ))

print("Supplements generating...")
supplements = [
    "Whey protein",
    "Casein protein",
    "Plant-based protein",
    "Creatine monohydrate",
    "BCAAs (branched-chain amino acids)",
    "EAAs (essential amino acids)",
    "L-glutamine",
    "Collagen peptides",
    "Gelatin",
    "Vitamin C",
    "Vitamin D3",
    "Vitamin K2",
    "Vitamin B12",
    "Vitamin B complex",
    "Vitamin E",
    "Calcium",
    "Magnesium",
    "Zinc",
    "Iron",
    "Potassium",
    "Omega-3 fish oil",
    "Glucosamine",
    "Chondroitin",
    "MSM (methylsulfonylmethane)",
    "Hyaluronic acid",
    "Curcumin (turmeric extract)",
    "Boswellia serrata",
    "Bromelain",
    "Tart cherry extract",
    "Beta-alanine",
    "Citrulline malate",
    "Caffeine",
    "Electrolyte mix",
    "Melatonin",
    "ZMA (zinc, magnesium, vitamin B6)",
    "HMB (beta-hydroxy beta-methylbutyrate)",
    "Probiotics",
    "Multivitamin",
]
for user_id in user:
    u_id = user_id[0]
    run_execute("""
                INSERT INTO Supplements (UserID, Name, DailyIntake, Purpose)
                VALUES (%s, %s, %s, %s)
                """, (
                    u_id,
                    random.choice(supplements),
                    random.randint(0, 50000),
                    random.choice(['Recovery', 'Performance', 'General Health', 'Macro Hitting', 'Proven Deficiency']),
                ))

print("Calories generating...")
for user_id in user:
    u_id = user_id[0]
    run_execute("""
                INSERT INTO Calories (UserID, Maintance, Deficit, Surplus)
                VALUES (%s, %s, %s, %s)
                """, (
                    u_id,
                    random.randint(1000, 5000),
                    random.randint(1000, 3000),
                    random.randint(2000, 8000),
                ))

print("Workouts & WorkoutExercises generating...")
for l in log:
    e_id = exercise_ids[0]
    l_id = l[0]
    run_execute("""
                INSERT INTO Workouts (LogID, Date, Type, SelfNotes)
                VALUES (%s, %s, %s, %s)
                """, (
                    l_id,
                    faker.date_time_this_year(),
                    random.choice(['Upper Body', 'Lower Body', 'Full Body', 'Push', 'Pull', 'Legs']),
                    random.choice(['Great session!', 'Felt tired today', 'New PR achieved!', 'Up the load.', 'Add another set.', 'Lower the volume.', 'Felt energized today!']),
                ))
    Exercises_res = run_select("SELECT WorkoutID FROM Workouts WHERE LogID = %s ORDER BY WorkoutID DESC LIMIT 1",
                             (l,))
    Exercises_id = Exercises_res[0][0] if Exercises_res else None


    if Exercises_id and e_id:
        selected_exercises = random.sample(exercise_ids, min(3, len(exercise_ids)))
        for ex_id in selected_exercises:
            run_execute("""
                        INSERT INTO WorkoutExercises (WorkoutID, ExerciseID, SetType, Sets, Reps, Weight, RIR, Duration)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        """, (
                            Exercises_id,
                            ex_id,
                            random.choice(['Working', 'Warmup', 'DropSet', 'Feeder']),
                            random.randint(1, 30),
                            random.randint(1, 30),
                            random.randint(0, 2000),
                            random.randint(0, 4),
                            faker.random_int(10, 260)+"min",
                        ))


print("Exercises Muscle Groups generating...")
flat_mg_ids = [m[0] for m in mg_ids] if mg_ids else []
flat_exercise_ids = [e[0] for e in exercise_ids] if exercise_ids else []
if flat_mg_ids and flat_exercise_ids:
    for ex_id in flat_exercise_ids:
        run_execute("""
                    INSERT INTO ExercisesMuscleGroups (MGID, ExerciseID, Role)
                    VALUES (%s, %s, %s)
                    """, (
                        random.choice(flat_mg_ids),
                        ex_id,
                        random.choice(['primary', 'secondary', 'stabilizer'])
                    ))

print("Cardio generating...")
cardio_types = [
    "Running",
    "Jogging",
    "Sprint intervals",
    "Treadmill running",
    "Trail running",
    "Walking",
    "Brisk walking",
    "Incline walking",
    "Hiking",
    "Cycling",
    "Stationary bike",
    "Spinning",
    "Mountain biking",
    "Swimming",
    "Water aerobics",
    "Aqua jogging",
    "Rowing",
    "Elliptical trainer",
    "Stair climbing",
    "Stair climber machine",
    "Jump rope",
    "Jumping jacks",
    "Burpees",
    "Mountain climbers",
    "High knees",
    "HIIT (high-intensity interval training)",
    "Tabata",
    "Circuit training",
    "Aerobics",
    "Zumba",
    "Dance cardio",
    "Kickboxing",
    "Boxing",
    "Shadow boxing",
    "Battle ropes",
    "Assault bike",
    "Ski erg",
    "Cross-country skiing",
    "Ice skating",
    "Inline skating",
    "Basketball",
    "Soccer",
    "Tennis",
    "Badminton",
]
for l in log:
    l_id = l[0]
    run_execute("""
                INSERT INTO Cardio (LogID, Type, CalsBurned_hour)
                VALUES (%s, %s, %s)
                """, (
                    l_id,
                    random.choice(cardio_types),
                    random.randint(10, 2000),
    ))

print("AccountLOG generating (actions)...")
flat_log_ids = [l[0] for l in log] if log else []
log_states = {}
if not flat_log_ids:
    print("THE LOG LIST IS EMPTY!")
else:
    log_states = {
        l_id:{
            "logged_in": False,
            "has_daily_log": False,
            "has_weight": False,
            "has_measurements": False,
            "has_food": False,
            "has_workout": False,
            "has_cardio": False,
            "has_recovery": False,
            "has_injury": False,
            "has_supplement": False
        }
        for l_id in flat_log_ids
    }

for _ in range(NUM_LOGS):
    l_id = random.choice(flat_log_ids)
    state = log_states[l_id]
    possible_actions = []

    if not state["logged_in"]:
        possible_actions.append("User logged in")
    else:
        possible_actions.append("User logged out")
        possible_actions.extend([
            "Password changed", "Profile updated", "Age updated",
            "Active level changed", "Target changed", "Data exported",
            "Data imported", "Notification settings changed", "Units changed",
            "Language changed", "Goal reminder dismissed"
        ])

        if not state["has_daily_log"]:
            possible_actions.append("Daily log created")
        else:
            possible_actions.extend([
                "Daily log updated", "Steps updated", "Water intake updated",
                "Self notes added", "Daily log deleted"
            ])

            if not state["has_weight"]:
                possible_actions.append("Weight logged")
            else:
                possible_actions.extend(["Weight entry edited", "Weight entry deleted"])

            if not state["has_measurements"]:
                possible_actions.append("Measurements added")
            else:
                possible_actions.extend(["Measurements edited", "Measurements deleted"])

            possible_actions.extend([
                "Food added to tracker", "Meal logged", "Barcode scanned",
                "Custom food created", "Calorie goals calculated"
            ])
            if state["has_food"]:
                possible_actions.extend([
                    "Food entry edited", "Food entry removed", "Custom food edited",
                    "Custom food deleted", "Nutritional values updated", "Meal moved"
                ])

            possible_actions.extend([
                "Workout started", "Custom exercise created", "Cardio session logged",
                "Recovery session logged", "Sleep logged", "Mobility session logged",
                "Massage session logged", "Supplement added"
            ])

            if state["has_workout"]:
                possible_actions.extend([
                    "Workout completed", "Workout edited", "Workout deleted",
                    "Exercise added to workout", "Exercise removed from workout",
                    "Set logged", "Set edited", "New PR achieved", "Exercise form notes updated"
                ])

            if state["has_cardio"]:
                possible_actions.extend(["Cardio session edited", "Cardio session deleted"])

            if state["has_recovery"]:
                possible_actions.extend(["Sleep entry edited", "Recovery entry deleted"])

            if not state["has_injury"]:
                possible_actions.append("Injury reported")
            else:
                possible_actions.extend([
                    "Injury status updated", "Injury marked as healed",
                    "Injury deleted", "Medical recovery logged"
                ])

            if state["has_supplement"]:
                possible_actions.extend(["Supplement dose updated", "Supplement removed"])

    action = random.choice(possible_actions)

    if action == "User logged in":
        state["logged_in"] = True
    elif action == "User logged out":
        state["logged_in"] = False
    elif action == "Daily log created":
        state["has_daily_log"] = True
    elif action == "Daily log deleted":
        state["has_daily_log"] = False
        state["has_weight"] = False
        state["has_measurements"] = False
    elif action == "Weight logged":
        state["has_weight"] = True
    elif action == "Weight entry deleted":
        state["has_weight"] = False
    elif action == "Measurements added":
        state["has_measurements"] = True
    elif action == "Measurements deleted":
        state["has_measurements"] = False
    elif action in ["Food added to tracker", "Meal logged"]:
        state["has_food"] = True
    elif action == "Food entry removed":
        state["has_food"] = False
    elif action == "Workout started":
        state["has_workout"] = True
    elif action in ["Workout completed", "Workout deleted"]:
        state["has_workout"] = False
    elif action == "Cardio session logged":
        state["has_cardio"] = True
    elif action == "Cardio session deleted":
        state["has_cardio"] = False
    elif action in ["Recovery session logged", "Sleep logged"]:
        state["has_recovery"] = True
    elif action == "Recovery entry deleted":
        state["has_recovery"] = False
    elif action == "Injury reported":
        state["has_injury"] = True
    elif action in ["Injury marked as healed", "Injury deleted"]:
        state["has_injury"] = False
    elif action == "Supplement added":
        state["has_supplement"] = True
    elif action == "Supplement removed":
        state["has_supplement"] = False

    run_execute("""
        INSERT INTO AccountLOG (LogID, Date, Action)
        VALUES (%s, %s, %s)
    """, (l_id,
                  faker.date_time_this_year(),
                  action
    )
    )
