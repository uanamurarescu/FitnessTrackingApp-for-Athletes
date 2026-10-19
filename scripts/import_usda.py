import csv
from pathlib import Path
from app.db import get_connection

ALLOWED_TABLES = {
    "Food", "NutritionalValues"
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


def import_table_from_csv_F(table: str, csv_path: Path):
    table = table.strip()
    if table not in ALLOWED_TABLES:
        raise ValueError(f"ERROR. Choose from: {sorted(ALLOWED_TABLES)}")
    if not csv_path.exists():
        raise FileNotFoundError(f"Not existing CSV at: {csv_path}")
    conn = get_connection()
    cur = conn.cursor()
    inserted = 0
    skipped = 0

    try:
        table_cols, dynamic_skip_cols = get_table_info(cur, table)
        ignore_F = {'fdc_id', 'data_type', 'food_category_id', 'publication_date', 'data_type'}
        with csv_path.open("r", encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            if not reader.fieldnames:
                raise ValueError("CSV withotu header - error.")
            column_mapping = {
                'description': 'Name'
            }
            cols = []
            csv_to_db_map = {}
            for c in reader.fieldnames:
                c_clean = c.strip()

                if c_clean in ignore_F:
                    continue
                db_col = column_mapping.get(c_clean, c_clean)
                if c_clean in dynamic_skip_cols:
                    continue
                if db_col in table_cols:
                    cols.append(db_col)
                    csv_to_db_map[db_col] = c_clean
            if not cols:
                raise ValueError("Didnt Found Cols compatible to the DB")
            placeholders = ",".join(["%s"] * len(cols))
            col_list = ",".join(cols)
            sql = f"INSERT IGNORE INTO {table} ({col_list}) VALUES ({placeholders});"
            conn.begin()
            for i, row in enumerate(reader, start=2):
                data_type_val = row.get('data_type', '').strip().lower()
                if data_type_val != 'foundation_food':
                    skipped += 1
                    continue
                values = []
                empty_row = True
                for db_col in cols:
                    csv_col = [k for k, v in column_mapping.items() if v == db_col]
                    csv_col = csv_col[0] if csv_col else db_col
                    val = row.get(csv_col)
                    val = val.strip() if val is not None else ""
                    if val != "":
                        empty_row = False

                    values.append(val if val != "" else None)
                if empty_row:
                    skipped += 1
                    continue
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
    FOOD_CSV = r'D:\PROIECTE OANA\FitnessTracking\scripts\data\food.csv'
    NUT_FOOD_CSV = r'D:\PROIECTE OANA\FitnessTracking\scripts\data\food_nutrient.csv'
    t_name = input(f"Table ({', '.join(sorted(ALLOWED_TABLES))}): ").strip()
    if "FOOD_CSV" in input("CHOOSE FROM FOOD_CSV OR NUT_FOOD_CSV"):
        p_str = FOOD_CSV.strip()
        import_table_from_csv_F(t_name, Path(p_str))
    '''elif "NUT_FOOD_CSV" in input("CHOOSE FROM NUT_FOOD_CSV OR FOOD_CSV"):
        p_str = NUT_FOOD_CSV.strip()
        import_table_from_csv(t_name, Path(p_str))
    else:
        raise ValueError("ERROR. CHOOSE FROM FOOD_CSV OR NUT_FOOD_CSV")'''