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

@region_controller.route('/<int:region_id>', methods=['GET'])
def show(region_id: int):
    all_regions_ranking = get_all_regions_ranking()

    # transforma a lista de listas em uma lista de nível único (flatten)
    all_regions_ranking = [d for l in all_regions_ranking for d in l]
    
    region_indexes_ranking = list(filter(lambda d: d['region_id'] == region_id, all_regions_ranking))
    for d in region_indexes_ranking:
        del d['region_id']

    return region_indexes_ranking, 200


def get_all_regions_ranking() -> list[list[dict]]:
    data = []

    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT RDI.index_data_id, ID.name, RDI.region_id, RDI.value 
                FROM region_index_data as RDI 
                INNER JOIN index_data ID
                ON RDI.index_data_id = ID.id
                ORDER BY RDI.index_data_id ASC, RDI.value DESC;
            ''')
            data = cur.fetchall()

    max_index_data_id = data[-1]['index_data_id']
    
    all_regions_rank_per_index = []

    for i in range(max_index_data_id):
        all_regions_rank_per_index.append(list(filter(lambda d: d['index_data_id'] == i+1, data)))
        for j, d in enumerate(all_regions_rank_per_index[i]):
            d['rank'] = j+1

    return all_regions_rank_per_index