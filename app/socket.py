from flask_socketio import SocketIO
from .models import DirectMessage, db
import os



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

    # handle data by creating a new direct message
    message = DirectMessage(
        message= data['message'],

    )
    # add to seesion and commit

    emit("direct_message", data, broadcast=True)
