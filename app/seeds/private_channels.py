from app.models import db, PrivateChannel, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_private_channel_user():
    for privateChannelUser in [
        {
            "channel_id": 8,
            "user_id":1
        },
        {
            "channel_id": 8,
            "user_id":2
        },
        {
            "channel_id": 9,
            "user_id":1
        },
        {
            "channel_id": 9,
            "user_id":2
        },

    ]:
        db.session.add(PrivateChannel(**privateChannelUser))

    db.session.commit()


def undo_server_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.privateChannels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM privateChannels"))

    db.session.commit()
