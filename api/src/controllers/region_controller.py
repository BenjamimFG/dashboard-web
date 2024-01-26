from flask import Blueprint

from db import Db


region_controller = Blueprint('region', __name__)

@region_controller.route('/', methods=['GET'])
def index():
    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * from region;')
            records = cur.fetchall()

            return {'data': records}, 200