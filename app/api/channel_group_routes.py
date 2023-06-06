from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import ChannelGroup, db, Server
from ..forms import ChannelGroupForm
from .utils import get_user_role

channel_group_routes = Blueprint('channel_groups', __name__)

@channel_group_routes.route('/<int:serverId>', methods=['POST'])
@login_required
def index(serverId):

    role = get_user_role(current_user.id, serverId)
    if role != "owner" and role != 'admin':
        return {'errors': ['Forbidden']}, 403
    
    data = request.get_json()
    groups = {group.name for group in Server.query.get(serverId).groups}
    if data["name"] in groups:
        return {
                "errors": {
                    "name": "Group with that name already exists on this server"
                }
        }
    
    form = ChannelGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.name.data = data['name']
    form.server_id.data = serverId

    if form.validate():
        newGroup = ChannelGroup(server_id=serverId, name=data["name"])
        db.session.add(newGroup)
        db.session.commit()
        return newGroup.to_dict()
    else:
        errors = form.errors
        return errors