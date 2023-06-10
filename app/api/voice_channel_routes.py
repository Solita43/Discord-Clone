from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Channel, ChannelGroup, User, PrivateChannel, ServerUser, Server, db
from app.forms import ServerUserForm, ServerForm, ChannelForm
from app.api.utils import get_user_role
from sqlalchemy import or_

voice_channel_routes = Blueprint("voiceChannels", __name__)

@voice_channel_routes.route("/<int:server_id>")
@login_required
def get_voice_channels_by_serverId(server_id): 
    server = Server.query.get(server_id)

    return {voice_channel.id: voice_channel.to_dict() for voice_channel in server.voice_channels}



