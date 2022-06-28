import bcrypt
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from sqlalchemy import null
from main import init, get_assignments
from models import db, User
from config import ApplicationConfig

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)

db.init_app(app)
with app.app_context():
    db.create_all()

@app.route('/getAssignments')
def getAssignments():
    graph = init()
    assignments = get_assignments(graph)
    print(assignments)
    return assignments

if __name__ == '__main__':
    app.run(debug = True)