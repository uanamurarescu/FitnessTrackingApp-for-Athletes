CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FullName TEXT,
    Age INT,
    Sex VARCHAR(3) DEFAULT 'N/A',
    ActiveLevel ENUM('sedentary', 'active', 'very active'),
    Target ENUM('lose weight', 'gain weight', 'gain muscle', 'maintain', 'become more active')
);
CREATE TABLE DailyLog (
    LogID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Steps BIGINT DEFAULT 0,
    WaterIntake TEXT DEFAULT '0L',
    CaloriesEaten INT DEFAULT 0,
    CaloriesLeft INT,
    SelfNotes TEXT DEFAULT '-'
);

CREATE TABLE Food (
    FoodID INT PRIMARY KEY AUTO_INCREMENT,
    Barcode BIGINT,
    Name VARCHAR(50),
    Category ENUM('fruit', 'vegetable', 'meat', 'fish/seafood', 'eggs', 'dairy', 'grains/cereals', 'pasta/rice', 'nuts', 'oils/fats', 'sweets/snacks', 'beverages', 'sauce/condiments', 'supplements', 'fast-food', 'bread/bakery', 'legumes/pulses')
);
CREATE TABLE Exercises (
    ExerciseID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50),
    PR VARCHAR(50) DEFAULT 'x KG/y REPS',
    ExecutionForm TEXT
);
CREATE TABLE MuscleGroups (
    MGID INT PRIMARY KEY AUTO_INCREMENT,
    TargetMuscle VARCHAR(60)
);
CREATE TABLE Measurements (
    MeasureID INT PRIMARY KEY AUTO_INCREMENT,
    Date TIMESTAMP,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE,
    Neck INT,
    Chest INT,
    Arm INT,
    Waist INT,
    Hips INT,
    Glutes INT,
    Thigh INT,
    Calf INT
);
CREATE TABLE WeightHistory (
    HistID INT PRIMARY KEY AUTO_INCREMENT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE ,
    KG FLOAT,
    Date TIMESTAMP,
    MeanWeight_week FLOAT
);
CREATE TABLE Recovery (
    RecovID INT PRIMARY KEY AUTO_INCREMENT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE ,
    Date TIMESTAMP,
    RecovType VARCHAR(50)
);
CREATE TABLE Sleep (
    SleepID INT PRIMARY KEY AUTO_INCREMENT,
    RecovID INT,
    FOREIGN KEY (RecovID) REFERENCES Recovery(RecovID) ON DELETE CASCADE,
    NumberOfHours INT,
    SleepScore INT CHECK(SleepScore <= 5),
    TimeOfGoingToSleep TIME,
    TimeOfWakingUp TIME
);
CREATE TABLE Mobility (
    MobilID INT PRIMARY KEY AUTO_INCREMENT,
    RecovID INT,
    FOREIGN KEY (RecovID) REFERENCES Recovery(RecovID) ON DELETE CASCADE,
    Exercise VARCHAR(60),
    TargetArea VARCHAR(60)
);
CREATE TABLE Massage (
    MassageID INT PRIMARY KEY AUTO_INCREMENT,
    RecovID INT,
    FOREIGN KEY (RecovID) REFERENCES Recovery(RecovID) ON DELETE CASCADE,
    Type VARCHAR(60),
    MuscleGroup VARCHAR(50)
);
CREATE TABLE Injuries (
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    InjuryID INT PRIMARY KEY AUTO_INCREMENT,
    Diagnosis TEXT,
    MuscleGroup VARCHAR(60),
    Status TEXT
);
CREATE TABLE MedicalRecovery (
    MedicalID INT PRIMARY KEY AUTO_INCREMENT,
    RecovID INT,
    FOREIGN KEY (RecovID) REFERENCES Recovery(RecovID) ON DELETE CASCADE,
    InjuryID INT,
    FOREIGN KEY (InjuryID) REFERENCES Injuries(InjuryID) ON DELETE CASCADE,
    Type VARCHAR(60)
);


CREATE TABLE FoodTracker (
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE,
    FoodID INT,
    FOREIGN KEY (FoodID) REFERENCES Food(FoodID) ON DELETE CASCADE,
    Grams INT,
    Meal VARCHAR(60)
);
CREATE TABLE NutritionalValues (
    CalsID INT PRIMARY KEY AUTO_INCREMENT,
    FoodID INT,
    FOREIGN KEY (FoodID) REFERENCES Food(FoodID) ON DELETE CASCADE,
    Protein VARCHAR(50),
    Carbs VARCHAR(50),
    Sugar VARCHAR(50),
    Fibers VARCHAR(50),
    Fats VARCHAR(50),
    SaturatedFats VARCHAR(50),
    Salt VARCHAR(50)
);
CREATE TABLE Supplements (
    SuplID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    Name VARCHAR(60),
    DailyIntake INT,
    Purpose TEXT
);
CREATE TABLE Calories (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    Maintance INT,
    Deficit INT,
    Surplus INT
);
CREATE TABLE Workouts (
    WorkoutID INT PRIMARY KEY AUTO_INCREMENT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE,
    Date TIMESTAMP,
    Type VARCHAR(50),
    SelfNotes TEXT
);
CREATE TABLE WorkoutExercises (
    WorkoutEXID INT PRIMARY KEY AUTO_INCREMENT,
    WorkoutID INT,
    FOREIGN KEY (WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE,
    ExerciseID INT,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID) ON DELETE CASCADE,
    SetType VARCHAR(20),
    Sets INT,
    Reps INT,
    Weight INT,
    RIR INT,
    Duration VARCHAR(20)
);
CREATE TABLE ExercisesMuscleGroups(
    EMGID INT PRIMARY KEY AUTO_INCREMENT,
    MGID INT,
    FOREIGN KEY (MGID) REFERENCES MuscleGroups(MGID) ON DELETE CASCADE ,
    ExerciseID INT,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID) ON DELETE CASCADE,
    Role ENUM('primary', 'secondary', 'stabilizer')
);
CREATE TABLE Cardio (
    CardioID INT PRIMARY KEY AUTO_INCREMENT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE,
    Type TEXT,
    CalsBurned_hour INT
);
CREATE TABLE UsersAccounts (
    UAid INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE ,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    Username VARCHAR(20),
    Password VARCHAR(20)
);
CREATE TABLE AccountLOG(
    ActionID INT PRIMARY KEY AUTO_INCREMENT,
    LogID INT,
    FOREIGN KEY (LogID) REFERENCES DailyLog(LogID) ON DELETE CASCADE ,
    UAid INT,
    FOREIGN KEY (UAid) REFERENCES UsersAccounts(UAid) ON DELETE CASCADE,
    Date TIMESTAMP,
    Action VARCHAR(50)
);



















