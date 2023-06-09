from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, ServerUser, User, db, Channel, ChannelGroup
from app.forms import ServerUserForm, ServerForm
from app.api.utils import get_user_role

online_status_routes = Blueprint('onlineStatus', __name__)

@online_status_routes.route('/')
@login_required
def get_users_online_status(): 
    user_status = User.query.all()

    return { user.id: user.status for user in user_status}