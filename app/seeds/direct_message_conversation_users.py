from app.models import db, DirectMessageConversationUser, environment, SCHEMA
from sqlalchemy.sql import text


def seed_direct_message_conversation_users():
    for conversationUsers in [
        {
            "conversation_id":1,
            "user_id":1
        },
         {
            "conversation_id":1,
            "user_id":2
        },
         {
            "conversation_id":2,
            "user_id":1
        },
         {
            "conversation_id":2,
            "user_id":3
        },
         {
            "conversation_id":3,
            "user_id":1
        },
         {
            "conversation_id":3,
            "user_id":4
        },
         {
            "conversation_id":4,
            "user_id":2
        },
         {
            "conversation_id":4,
            "user_id":3
        },
         {
            "conversation_id":5,
            "user_id":2
        },
         {
            "conversation_id":5,
            "user_id":4
        },

    ]:
        db.session.add(DirectMessageConversationUser(**conversationUsers))
    db.session.commit()

def undo_direct_message_conversation_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.directMessageConversationUsers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM directMessageConversationUsers"))

    db.session.commit()
