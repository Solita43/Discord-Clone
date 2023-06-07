from flask_socketio import SocketIO, emit
from .models import DirectMessage, DirectMessageConversation, DirectMessageReaction, db
import os
from datetime import datetime



# configure allowed cors origin
if os.environ.get("FLASK_ENV") == "production":
    origins = "*"
else:
    origins = "*"

# create your socketIO instance
socketio = SocketIO(cors_allowed_origin=origins)


# handle direct messages - parameter is bananable but must use the same in the front end
@socketio.on("direct_message")
def handle_direct_message(data):
    print("Messages: ", data)
    # handle data by creating a new direct message
    message = DirectMessage(
        message= data['message'],
        conversation_id = data['conversation_id'],
        user_id = data['user_id'],
        created_at = datetime.utcnow()
    )
    # add to seesion and commit
    db.session.add(message)
    conversation = DirectMessageConversation.query.get(data['conversation_id'])
    conversation.updated_at = datetime.utcnow()
    db. session.commit()
    temp = message.to_dict()
    # temp['created_at'] = temp['created_at'].strftime("%m/%d/%Y, %H:%M:%S")
    emit("direct_message", temp, broadcast=True)

@socketio.on("delete_direct_message")
def delete_message(data):
    message = DirectMessage.query.get(data['messageId'])
    temp = message.to_dict()
    db.session.delete(message)

    db.session.commit()
    emit("delete_direct_message",temp,broadcast=True)


@socketio.on("add_reaction_direct")
def add_reaction_direct(data):
    new_reaction = DirectMessageReaction (
        message_id = data['message_id'],
        reaction = data['reaction'],
        user_id = data['user_id']
    )
    db.session.add(new_reaction)
    db.session.commit()
    temp = new_reaction.to_dict()
    emit("add_reaction_direct", temp, broadcast=True)
