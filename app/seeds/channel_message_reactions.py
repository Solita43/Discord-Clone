from app.models import db, ChannelMessageReaction, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channel_message_reactions():
    for channelMessageReaction in [
        {
            "message_id": 1,
            "reaction": "😊",
            "user_id":3
        },
         {
            "message_id": 2,
            "reaction": "👍🏻",
            "user_id":3
        },
         {
            "message_id": 1,
            "reaction": "😉",
            "user_id":3
        },
          {
            "message_id": 4,
            "reaction": "❤️",
            "user_id":3
        },

    ]:
        db.session.add(ChannelMessageReaction(**channelMessageReaction))

    db.session.commit()

def undo_channel_message_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channelMessageReactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channelMessageReactions"))

    db.session.commit()
