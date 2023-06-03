from app.models import db, ServerUser, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_server_users():
    demo1 = ServerUser(
        user_id= User.query.filter(User.username == "Demo").first().id,
        server_id= 1,
        role= "owner"
        )

    demo2 = ServerUser(
        user_id = demo1.user_id,
        server_id = 2,
        role = "user"
    )

    demo3 = ServerUser(
        user_id = demo1.user_id,
        server_id = 3,
        role = "owner"
    )

    demo4 = ServerUser(
        user_id = demo1.user_id,
        server_id = 4,
        role = "owner"
    )

    marnie1 = ServerUser(
        user_id= User.query.filter(User.username == "marnie").first().id,
        server_id = 1,
        role = "admin"
    )

    marnie2 = ServerUser(
        user_id = marnie1.user_id,
        server_id = 2,
        role = "owner"
    )

    marnie3 = ServerUser(
        user_id = marnie1.user_id,
        server_id = 3,
        role = "user"
    )

    bobbie1 = ServerUser(
        user_id = User.query.filter(User.username == "bobbie").first().id,
        server_id = 1,
        role = "user"
    )

    bobbie2 = ServerUser(
        user_id = bobbie1.user_id,
        server_id = 2,
        role = "admin"
    )

    bobbie3 = ServerUser(
        user_id = bobbie1.user_id,
        server_id = 2,
        role = "user"
    )


    bev1 = ServerUser(
        user_id = User.query.filter(User.username == "bev").first().id,
        server_id = 1,
        role = "user"
    )

    bev2 = ServerUser(
        user_id = bev1.user_id,
        server_id = 2,
        role = "admin"
    )

    bev3 = ServerUser(
        user_id = bev1.user_id,
        server_id = 3,
        role = "user"
    )

    ben1 = ServerUser(
        user_id = User.query.filter(User.username == "ben").first(). id,
        server_id = 1,
        role = "user"
    )

    jay1 = ServerUser(
        user_id = User.query.filter(User.username == "jay").first().id,
        server_id = 1,
        role = "user"
    )

    mel1 = ServerUser(
        user_id = User.query.filter(User.username == "mel").first().id,
        server_id = 1,
        role = "user"
    )


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(marnie1)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(bobbie1)
    db.session.add(bobbie2)
    db.session.add(bobbie3)
    db.session.add(bev1)
    db.session.add(bev2)
    db.session.add(bev3)
    db.session.add(ben1)
    db.session.add(jay1)
    db.session.add(mel1)

    db.session.commit()


def undo_server_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.serverUsers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM serverUsers"))

    db.session.commit()
