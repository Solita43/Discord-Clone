from flask_socketio import SocketIO, emit
from .models import DirectMessage, db
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
    db. session.commit()
    temp = message.to_dict()
    print("TEMP!!!!",temp)
    # temp['created_at'] = temp['created_at'].strftime("%m/%d/%Y, %H:%M:%S")

    emit("direct_message", temp, broadcast=True)
