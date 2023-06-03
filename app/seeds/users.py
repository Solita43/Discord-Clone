from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', status='offline'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Oscar',
        status='offline'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', first_name='Bobbie', last_name='Brown', password='password',
        status='offline'
        )
    bev = User(
        username='bev', email='bev@aa.io', first_name='Bev', last_name='Duran', password='password'
    )
    ben = User(
        username='ben', email='ben@aa.io', first_name='Ben', last_name='Wil', password='password', status='offline'
    )
    jay = User(
        username='jay', email='jay@aa.io', first_name='Jay',
        last_name='Lev', password='password', status='offline'
    )
    mel = User(
        username='mel', email='mel@aa.io', first_name='Mel', last_name='Cor', password='password', status='offline'
    )
    user1 = User(
        username='user1', email='user1@aa.io', first_name='John', last_name='Doe', password='password', status='offline'
    )
    user2 = User(
        username='user2', email='user2@aa.io', first_name='Jane', last_name='Smith', password='password', status='offline'
    )
    user3 = User(
        username='user3', email='user3@aa.io', first_name='Michael', last_name='Johnson', password='password', status='offline'
    )
    user4 = User(
        username='user4', email='user4@aa.io', first_name='Emily', last_name='Brown', password='password', status='offline'
    )
    user5 = User(
        username='user5', email='user5@aa.io', first_name='Daniel', last_name='Miller', password='password', status='offline'
    )
    user6 = User(
        username='user6', email='user6@aa.io', first_name='Olivia', last_name='Taylor', password='password', status='offline'
    )
    user7 = User(
        username='user7', email='user7@aa.io', first_name='William', last_name='Anderson', password='password', status='offline'
    )
    user8 = User(
        username='user8', email='user8@aa.io', first_name='Sophia', last_name='Clark', password='password', status='offline'
    )
    user9 = User(
        username='user9', email='user9@aa.io', first_name='Joseph', last_name='Wright', password='password', status='offline'
    )
    user10 = User(
        username='user10', email='user10@aa.io', first_name='Ava', last_name='Martin', password='password', status='offline'
    )

    all_users = [
        demo, marnie, bobbie, bev, ben, jay, mel,
        user1, user2, user3, user4, user5, user6, user7, user8, user9, user10
    ]

    for user in all_users:
        db.session.add(user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
