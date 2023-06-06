from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Channel, ChannelGroup, User, PrivateChannel, db
from app.forms import ServerUserForm, ServerForm
from app.api.utils import get_user_role

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:server_id')
@login_required
def get_channels_by_servers(server_id): 
    channels = Channel.query.join(PrivateChannel).join(ChannelGroup).filter(Channel.server_id == server_id, PrivateChannel.user_id == current_user.id).group_by(ChannelGroup.name).all()

    print(channels)
    return "heyo lol"