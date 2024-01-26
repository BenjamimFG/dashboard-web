import os, psycopg, psycopg_pool


class Db:
    pool = None

    @classmethod
    def init_pool(cls):
        cls.pool = psycopg_pool.ConnectionPool(kwargs={
                'host': os.getenv('DB_HOST', ''),
                'port': int(os.getenv('DB_PORT', 5432)),
                'dbname': os.getenv('DB_NAME', 'postgres'),
                'user': os.getenv('DB_USER', 'postgres'),
                'password': os.getenv('DB_PASSWORD', 'postgres'),
                'row_factory': psycopg.rows.dict_row
            })
