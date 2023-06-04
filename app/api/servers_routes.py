from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, ServerUser
from app.forms import ServerUserForm, ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def get_all_servers():
    """
    Returns a list of all servers in the DB
    """

    servers = Server.query.all()

    res = {
        "servers": [server.to_dict() for server in servers]
    }

    return res


@server_routes.route('/<int:id>')
@login_required
def get_servers_by_user(id):
    """
        Returns a list of all servers a user is apart of.
    """
    servers = Server.query.join(ServerUser).filter(ServerUser.user_id == id)

    res = {
        "Servers": {server.id: server.to_dict() for server in servers}
    }

    return res



@server_routes.route('/<int:id>/users')
@login_required
def add_user_to_server(id):
    return "lol"
    form = ServerUserForm()
    data = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id = data["user_id"]
    form.server_id = id
    form.role = data["role"]
    if form.validate():


@server_routes.route('/', methods=["POST"])
@login_required
def create_a_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    pass
