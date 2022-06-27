import json
import configparser
from graph import Graph

def init():
    # Load settings
    config = configparser.ConfigParser()
    config.read('backend/config.cfg')
    azure_settings = config['azure']

    graph = Graph(azure_settings)
    return graph

def get_assignments(graph: Graph):
    return graph.get_assignments()
    
# def greet_user(graph: Graph):
#     user = graph.get_user()
#     print(user['id'])
#     print('Hello,', user['displayName'])
#     # For Work/school accounts, email is in mail property
#     # Personal accounts, email is in userPrincipalName
#     print('Email:', user['mail'] or user['userPrincipalName'], '\n')