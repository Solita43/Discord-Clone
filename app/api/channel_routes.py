from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Channel, ChannelGroup, User, PrivateChannel, ServerUser, Server, db
from app.forms import ServerUserForm, ServerForm, ChannelForm
from app.api.utils import get_user_role
from sqlalchemy import or_

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    data = request.get_json()
    serverId = data["serverId"]

    role = get_user_role(current_user.id, serverId)

    if role != "owner" and role != 'admin':
        return {'errors': ['Forbidden']}, 403
    
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.server_id.data = serverId
    form.group_id.data = data["groupId"]
    form.name.data = data["name"]
    form.isPrivate.data = data["isPrivate"]

    if form.validate():
        newChannel = Channel(server_id=serverId, group_id=data["groupId"], name=data["name"], isPrivate=form.data["isPrivate"])
        db.session.add(newChannel)
        db.session.commit()
        return newChannel.to_dict()
    else:
        errors = form.errors
        return errors

@channel_routes.route('/<int:channelId>', methods =['PUT'])
@login_required
def edit_channel(channelId):
    data = request.get_json()
    serverId = data["serverId"]

    role = get_user_role(current_user.id, serverId)

    if role != "owner" and role != 'admin':
        return {'errors': ['Forbidden']}, 403
    
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.server_id.data = serverId
    form.group_id.data = data["groupId"]
    form.name.data = data["name"]
    form.isPrivate.data = data["isPrivate"]

    if form.validate():
        channel = Channel.query.get(channelId)
        channel.name = data["name"]
        channel.isPrivate = data["isPrivate"]
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict(), 201
    else:
        errors = form.errors
        return errors
    
@channel_routes.route('/<int:channelId>', methods =['DELETE'])
@login_required
def delete_channel(channelId):
    channel = Channel.query.get(channelId)

    role = get_user_role(current_user.id, channel.server_id)

    if role != "owner" and role != 'admin':
        return {'errors': ['Forbidden']}, 403
    
    db.session.delete(channel)
    db.session.commit()
    return {
        "message": "Channel successfully deleted from server."
    }

