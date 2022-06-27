import bcrypt
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
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
    # return 'Python Graph Tutorial\n'
    graph = init()
    assignments = get_assignments(graph)
    print(assignments)
    return assignments

if __name__ == '__main__':
    app.run(debug = True)

# @app.route("/register", methods=["POST"])
# def register_user():
#     email = request.json["email"]
#     password = request.json["password"]

#     user_exists = User.query.filter_by(email=email).first() is not None

#     if user_exists:
#         return jsonify({"error": "User already exists"}), 409

#     hashed_password = bcrypt.generate_password_hash(password)
#     new_user = User(email=email, password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()
    
#     session["user_id"] = new_user.id

#     return jsonify({
#         "id": new_user.id,
#         "email": new_user.email
#     })