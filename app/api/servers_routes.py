from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, ServerUser, db
from app.forms import ServerUserForm, ServerForm
from app.api.utils import get_user_role

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


@server_routes.route('/<int:userId>')
@login_required
def get_servers_by_user(userId):
    """
        Returns a list of all servers a user is apart of.
    """
    servers = Server.query.join(ServerUser).filter(ServerUser.user_id == userId)

    res = {
        "Servers": {server.id: server.to_dict() for server in servers}
    }
    
    return res
    




    
@server_routes.route('/', methods=["POST"])
@login_required
def create_a_server():
    """"
        Creates a new server and adds the current logged in user as the owner of the server.
        
        Expected keys:
        {
            "name": "example",
            "imageUrl": *optional
        }
    """
    data = request.get_json()
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.name.data = data['name']
    if "imageUrl" in data:
        form.imageURL.data = data["imageUrl"]
    form.owner_id.data = current_user.id
    if form.validate():
        newServer = Server(**data, owner_id=current_user.id)
        db.session.add(newServer)
        res = Server.query.filter(Server.name == newServer.name).one()
        serverOwner = ServerUser(user_id=current_user.id, server_id=res.id, role="owner")
        db.session.add(serverOwner)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return errors

@server_routes.route('/<int:serverId>', methods=["PUT"])
@login_required
def edit_server(serverId):
    """
        Edit a server only if current user is owner of the server.

        Expected Keys:

        {
            "name": "example"
            "imageUrl": *optional
        }
    """
    role = get_user_role(current_user.id, serverId)
    if role != "owner": 
        return {
            "message": "User is not authorized to edit this server."
        }
    
    data = request.get_json()
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.name.data = data['name']
    if "imageUrl" in data:
        form.imageURL.data = data["imageUrl"]
    form.owner_id.data = current_user.id
    if form.validate():
        server = Server.query.get(serverId)
        server.name = data["name"]
        if "imageUrl" in data:
            server.imageUrl = data["imageUrl"]
        db.session.commit()
        return server.to_dict()    
    else:
        errors = form.errors
        return errors
    
    


@server_routes.route("/<int:server_id>", methods=["DELETE"])
@login_required
def delete_server_by_id(server_id):
    """
    Route: /:server_id
    Method: DELETE
    Body: None

    Deletes a server by server_id if the current user is the owner of the server, 
    and the server exists. 
    
    Otherwise returns an error message. 
    """

    
    server = Server.query.get(server_id)
    if not server: 
        return {
            "message": "Server not found..."
        }
    role = get_user_role(current_user.id, server_id)
    if role != "owner": 
        return {
            "message": "Insufficient permission to delete this server."
        }
    db.session.delete(server)
    db.session.commit()
    return {
        "message": "Server successfully deleted"
    }
    

@server_routes.route('/<int:server_id>/users', methods=["POST"])
@login_required
def add_user_to_server(server_id): 

    """
    Route: /api/servers/:server_id/users
    Method: POST
    
    Body: {
        "userId": <integer>, 
        
        "role": <"user", "admin"> 
    }
    
    Adds a user to a server's member list if the currently logged in 
    user has a server role of "admin" or "owner". 

    Otherwise returns message object with an error message. 

    """

    # Validating that the currently logged in user has the authority to add
    # a user to the server. 
    logged_in_user = current_user.to_dict()
    role = get_user_role(logged_in_user["userId"], server_id)
    if role != "owner" and role != "admin": 
        return {
            "message": "User is not authorized to add users to this server."
        }

    # Getting the user and role data from the request. 
    data = request.get_json()
    new_user_id = data['userId']
    new_user_role = data['role']

    # Adding the user data to the form for validation. 
    form = ServerUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = new_user_id 
    form.server_id.data = server_id
    form.role.data = new_user_role
    
    # If valid data, the user is added to the server. 
    if form.validate(): 
        new_member = ServerUser(user_id = new_user_id , server_id = server_id, role = new_user_role)
        db.session.add(new_member)
        db.session.commit()
        return ServerUser.query.filter(ServerUser.user_id == new_user_id , ServerUser.server_id == server_id).first().to_dict()
    elif form.errors: 
        return {
            "message": form.errors
        }
    
@server_routes.route('/<int:server_id>/users/<int:user_id>', methods=["PUT"])
@login_required
def edit_server_user_role(server_id, user_id):
     
    server = Server.query.get(server_id)
    membership = ServerUser.query.filter(ServerUser.server_id == server_id, ServerUser.user_id == user_id).first()

    # Verifying the server exists
    if not server: 
        return {
            "message": "Server not found..."
        }
    
    # Verifying the user has a membership to the server
    if not membership: 
        return {
            "message": "User isn't a member of this server..."
        }
    
    # Verifying the logged in user has permission to alter roles
    role = get_user_role(current_user.id, server_id)
    if role != "owner": 
        return {
            "message": "Insufficient permission to edit roles on this server."
        }
    
    # Validating the requested membership role. 
    data = request.get_json()
    if data["role"] != "user" or data["role"] != "admin": 
        return {
            "message": "Can only give the roles 'admin' or 'user'."
        }
    
    # Updating the user's membership to the requested type. 
    membership.role = data["role"]
    db.session.commit()

    return membership.to_dict()

    
@server_routes.route('/<int:serverId>/users', methods=["GET"])
@login_required
def get_members(serverId):
    members = ServerUser.query.filter(ServerUser.server_id == serverId).all()
    
    res = {
        "Members": {user.to_dict() for user in members}
    }
    
    return "in progress"