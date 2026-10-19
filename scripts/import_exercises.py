import json
from pathlib import Path
from app.db import get_connection

ALLOWED_TABLES = {
    "Exercises"
}


def get_table_info(cur, table: str):
    cur.execute(f"DESCRIBE {table};")
    valid_cols = set()
    dynamic_skip_cols = {"created_at", "data_time"}

    for row in cur.fetchall():
        col_name = row[0]
        extra = row[5] if len(row) > 5 else ""

        valid_cols.add(col_name)

        if extra and 'auto_increment' in extra.lower():
            dynamic_skip_cols.add(col_name)

    return valid_cols, dynamic_skip_cols


def import_exercises_from_json(table: str, json_path: Path):
    table = table.strip()
    if table not in ALLOWED_TABLES:
        raise ValueError(f"ERROR. Choose from: {sorted(ALLOWED_TABLES)}")
    if not json_path.exists():
        raise FileNotFoundError(f"JSON file not found here: {json_path}")

    conn = get_connection()
    cur = conn.cursor()
    inserted = 0
    skipped = 0

    try:
        table_cols, dynamic_skip_cols = get_table_info(cur, table)

        with json_path.open("r", encoding="utf-8") as f:
            exercises_data = json.load(f)

        if not isinstance(exercises_data, list):
            raise ValueError("JSON file must contain a list of exercises")

        cols = ['Name', 'ExecutionForm']
        for c in cols:
            if c not in table_cols:
                raise ValueError(f"The col '{c}' doesn't exist in the table {table}.")

        placeholders = ",".join(["%s"] * len(cols))
        col_list = ",".join(cols)
        sql = f"INSERT IGNORE INTO {table} ({col_list}) VALUES ({placeholders});"

        conn.begin()
        for item in exercises_data:
            name = item.get('name', '').strip()
            form_id = item.get('id', '').strip()

            instructions_obj = item.get('instructions', {})
            instructions_en = ''
            if isinstance(instructions_obj, dict):
                instructions_en = instructions_obj.get('en', '').strip()
            elif isinstance(instructions_obj, str):
                instructions_en = instructions_obj.strip()
            execution_form_val = f"videos/{form_id}.gif" if form_id else instructions_en

            if not name:
                skipped += 1
                continue

            values = [name, execution_form_val if execution_form_val else None]

            cur.execute(sql, tuple(values))
            inserted += cur.rowcount

        conn.commit()
        print(f"IMPORT OK -> table={table}, nr_of_inserted_rows={inserted}, skipped_rows={skipped}")

    except Exception as e:
        conn.rollback()
        print(f"IMPORT FAIL -> rollback. ERROR: {e}")
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    EXERCISES_JSON = r'D:\PROIECTE OANA\FitnessTracking\scripts\data\exercises.json'
    t_name = "Exercises"
    import_exercises_from_json(t_name, Path(EXERCISES_JSON))