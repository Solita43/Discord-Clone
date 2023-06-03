from app.models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_direct_messages():
    for message in [
        {
            "conversation_id": 1,
            "user_id": 1,
            "message": "Testing testing"
        },
            {
            "conversation_id": 1,
            "user_id": 2,
            "message": "yes yes I hear you"
        },
            {
            "conversation_id": 1,
            "user_id": 1,
            "message": "are you sure though"
        },
            {
            "conversation_id": 1,
            "user_id": 2,
            "message": "uh yes very sure"
        },
            {
            "conversation_id": 2,
            "user_id": 1,
            "message": "sup stranger"
        },
            {
            "conversation_id": 2,
            "user_id": 1,
            "message": "are you leaving me on read?"
        },
            {
            "conversation_id": 2,
            "user_id": 1,
            "message": ":("
        },
            {
            "conversation_id": 3,
            "user_id": 4,
            "message": "hi best friend"
        },
        {
            "conversation_id": 3,
            "user_id": 1,
            "message": "best friend??"
        },
        {
            "conversation_id": 3,
            "user_id": 4,
            "message": "too forward?"
        },
        {
            "conversation_id": 3,
            "user_id": 1,
            "message": "oof"
        },
    ]:
        db.session.add(DirectMessage(**message))
    db.session.commit()

def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.directMessages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM directMessages"))

    db.session.commit()
