import psycopg2
import os

DB_HOST = os.getenv("DB_HOST", "34.126.210.143")
DB_NAME = os.getenv("DB_NAME", "viratkohli")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "2000")
DB_PORT = os.getenv("DB_PORT", 5432)

def test_database_connection():
    conn = psycopg2.connect(
        dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT
    )
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    result = cur.fetchone()
    assert result == (1,)
    conn.close()
