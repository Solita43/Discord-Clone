from app.models import db, DirectMessageReaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_direct_message_reactions():
    for messageReaction in [
        {
            "message_id": 1,
            "user_id": 2,
            "reaction": "😊"
        },
         {
            "message_id": 2,
            "user_id": 1,
            "reaction": "😊"
        },
         {
            "message_id": 3,
            "user_id": 2,
            "reaction": "👍🏻"
        }
    ]:
        db.session.add(DirectMessageReaction(**messageReaction))
    db.session.commit()


def undo_direct_message_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.directMessageReactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM directMessageReactions"))

    db.session.commit()
