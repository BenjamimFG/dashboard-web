from flask import Blueprint

from db import Db

state_controller = Blueprint('state', __name__)

@state_controller.route('/', methods=['GET'])
def index():
    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * from state;')
            records = cur.fetchall()

            return {'data': records}, 200

@state_controller.route('/<string:state_id>', methods=['GET'])
def show(state_id: str):
    all_states_ranking = get_all_states_ranking()

    # transforma a lista de listas em uma lista de nível único (flatten)
    all_states_ranking = [d for l in all_states_ranking for d in l]
    
    state_indexes_ranking = list(filter(lambda d: d['state_id'] == state_id, all_states_ranking))
    for d in state_indexes_ranking:
        del d['state_id']

    return state_indexes_ranking, 200


def get_all_states_ranking() -> list[list[dict]]:
    data = []

    with Db.pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT SDI.index_data_id, ID.name, SDI.state_id, SDI.value 
                FROM state_index_data as SDI 
                INNER JOIN index_data ID 
                ON SDI.index_data_id = ID.id 
                ORDER BY SDI.index_data_id ASC, SDI.value DESC;
            ''')
            data = cur.fetchall()

    max_index_data_id = data[-1]['index_data_id']
    
    all_states_rank_per_index = []

    for i in range(max_index_data_id):
        all_states_rank_per_index.append(list(filter(lambda d: d['index_data_id'] == i+1, data)))
        for j, d in enumerate(all_states_rank_per_index[i]):
            d['rank'] = j+1

    return all_states_rank_per_index