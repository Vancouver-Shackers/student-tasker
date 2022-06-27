from flask import Flask
from main import init, get_assignments

app = Flask(__name__)

@app.route("/getAssignments")
def getAssignments():
    # return 'Python Graph Tutorial\n'
    graph = init()
    return get_assignments(graph)


if __name__ == "__main__":
    app.run(debug = True)