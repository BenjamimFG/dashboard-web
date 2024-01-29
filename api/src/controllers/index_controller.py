from flask import Blueprint, request
from psycopg.sql import SQL

from db import Db


index_controller = Blueprint('index', __name__)

@index_controller.route('/', methods=['GET'])
def index():
    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * from index_data;')
            records = cur.fetchall()

            return {'data': records}, 200

@index_controller.route('/<int:index_id>', methods=['GET'])
def show(index_id: int):
    region_ids = request.args.getlist('region', type=int)

    data = get_index_data(index_id, region_ids)

    if data is None:
        return {'error': f'Index id {index_id} no found'}, 404
    
    index_name = data[0]['name']

    for d in data:
        del d['name']

    return {'index_name': index_name, 'data': data}, 200

@index_controller.route('/statistics', methods=['GET'])
def statistics():
    sql = '''
        SELECT index_data_id, name,  ROUND(AVG(value), 3) as avg, MAX(value)
        FROM state_index_data
        INNER JOIN index_data
        ON index_data_id = id
        GROUP BY name, index_data_id;
    '''
    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql)

            data = cur.fetchall()

            return {'data': data}, 200



def get_index_data(index_id: int, region_ids: list[int]) -> list[dict]:
    if not index_exists(index_id):
        return None

    sql = '''
        SELECT SDI.state_id, SDI.value, ID.name, RANK() OVER(ORDER BY value DESC) rank
        FROM state_index_data AS SDI 
        INNER JOIN index_data as ID 
        on SDI.index_data_id = ID.id 
        WHERE index_data_id = {0}
        ORDER BY rank ASC;
    '''

    region_sql = '''
        SELECT SDI.state_id, SDI.value, ID.name, R.rank
        FROM state_index_data as SDI
        INNER JOIN index_data as ID
        ON SDI.index_data_id = ID.id
        INNER JOIN state as S
        ON SDI.state_id = S.id
        INNER JOIN (
            SELECT state_id, RANK() OVER(ORDER BY value DESC) rank 
            FROM state_index_data
            WHERE index_data_id = %(index_id)s
        ) as R
        ON R.state_id = SDI.state_id
        WHERE SDI.index_data_id = %(index_id)s AND S.region_id = ANY(%(region_ids)s)
        ORDER BY R.rank ASC;
    '''
    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            if len(region_ids) == 0:
                cur.execute(SQL(sql).format(index_id))
            else:
                cur.execute(SQL(region_sql), {'region_ids': region_ids, 'index_id': index_id})

            return cur.fetchall()

def index_exists(index_id: int) -> bool:
    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(SQL('SELECT * from index_data WHERE id = {0};').format(index_id))

            return cur.fetchone() is not None