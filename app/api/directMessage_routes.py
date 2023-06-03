from flask import Blueprint, request 
from flask_login import current_user, login_required 
from app.models import DirectMessageConversation, db, DirectMessageReaction, DirectMessage


directMessage_routes = Blueprint("", __name__)