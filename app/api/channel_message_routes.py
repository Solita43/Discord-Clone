
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import ChannelMessage, db

channel_message_routes = Blueprint("channel_messages",__name__)

# Get all messages by channel ID
@channel_message_routes.route('/<int:id>')
@login_required
def get_all_channel_messages(id):
    """
     Body:
  ```json
       "messages": [
      {
        "messageId": 1,
        "username": "Demo-lition",
        "messageText": "Hey what's up?",
        "dateTimeStamp": "1-1-2023 z 01:12:00",
        "reactions": {
          "<reactionId>": {
            "username": "Demo-lition",
            "emoji": "🙃"
          }
        }
      }
    ]
  ```
    """
    messages = ChannelMessage.query.filter(ChannelMessage.channel_id == id).all()
    res = []
    for message in messages:
        message = message.to_dict()
        res.append(message)
        # print("message details",message)
    # print("MESSAGES",messages)
    return res



# Post/Edit/Delete message will be in socket
