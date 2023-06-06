from app.models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channel_messages():
    for channelMessage in [
        {
            "channel_id": 1,
            "user_id": 1,
            "message": "Testing! 1 2 3"
        },
        {
            "channel_id": 1,
            "user_id": 2,
            "message": "Can you hear me!?"
        },
        {
            "channel_id": 1,
            "user_id": 1,
            "message": "No can you hear me"
        },
        {
            "channel_id": 1,
            "user_id": 2,
            "message": "nope"
        },
        {
            "channel_id": 2,
            "user_id": 1,
            "message": "HI EVERYONE"
        },
        {
            "channel_id": 1,
            "user_id": 2,
            "message": "why you yellin"
        },
        {
            "channel_id": 1,
            "user_id": 1,
            "message": "WHY NOT"
        },
        {
            "channel_id": 1,
            "user_id": 2,
            "message": "fair point."
        },
    ]:
        db.session.add(ChannelMessage(**channelMessage))

    db.session.commit()

def undo_channel_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
