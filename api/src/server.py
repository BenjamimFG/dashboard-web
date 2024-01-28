import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from controllers import index_controller, region_controller, state_controller
from db import Db


APP_ROOT = os.path.join(os.path.dirname(__file__), '..')   # refers to application_top
dotenv_path = os.path.join(APP_ROOT, '.env')
load_dotenv(dotenv_path)

Db.init_pool()

app = Flask(__name__)

# TODO: permitir cross-origin somente ao domínio do frontend
CORS(app, resources={"*": {'origins': "*"}})

@app.errorhandler(404)
def handle_404(err):
    return {'error': 'Not Found'}, 404


app.register_blueprint(index_controller, url_prefix='/indexes')
app.register_blueprint(region_controller, url_prefix='/regions')
app.register_blueprint(state_controller, url_prefix='/states')


if __name__ == '__main__':
    app.run()
