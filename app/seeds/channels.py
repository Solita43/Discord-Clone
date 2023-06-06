from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    for channel in [
        {
            "server_id":1,
            "group_id":1,
            "name":"FIRST CHANNEL!!!!"
        },
          {
            "server_id":1,
            "group_id":1,
            "name":"SECOND CHANNEL!!"
        },
          {
            "server_id":1,
            "group_id":1,
            "name":"Third channel :("
        },
          {
            "server_id":1,
            "group_id":2,
            "name":"General chat"
        },
        {
            "server_id":1,
            "group_id":3,
            "name":"Resources"
        },
         {
            "server_id":1,
            "group_id":3,
            "name":"Homework discussion"
        },
         {
            "server_id":2,
            "group_id":4,
            "name":"Boring Discussion"
        },
        {
            "server_id":2,
            "group_id":5,
            "name":"Only awesome stuff allowed here",
            "isPrivate": True
        },
        {
            "server_id":2,
            "group_id":6,
            "name":"Cool folks",
            "isPrivate": True
        },
          {
            "server_id":3,
            "group_id":7,
            "name":"Homework Discussion"
        },
        {
            "server_id":3,
            "group_id":7,
            "name":"Learning Resources"
        },
        {
            "server_id":3,
            "group_id":8,
            "name":"General Chat"
        },
        {
            "server_id":4,
            "group_id":10,
            "name":"General Chat"
        }

    ]:
        db.session.add(Channel(**channel))

    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
