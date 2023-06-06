
from app.models import DirectMessageConversation, db, environment, SCHEMA
from sqlalchemy.sql import text

def direct_message_conversation():
    for conversation in [
        {},
        {},
        {},
        {},
        {}
    ]:
        db.session.add(DirectMessageConversation(**conversation))
    db.session.commit()

def undo_direct_message_conversation():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_message_conversations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_message_conversations"))

    db.session.commit()
