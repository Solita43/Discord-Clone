from app.models import db, VoiceChannel, environment, SCHEMA
from sqlalchemy.sql import text


def seed_voice_channels():
    for channel in [
        {
            "server_id": 1,
            "name": "Voice Channel"
        }, {
            "server_id": 2,
            "name": "Voice Channel"
        }, {
            "server_id": 3,
            "name": "Voice Channel"
        }, {
            "server_id": 4,
            "name": "Voice Channel"
        }
    ]:
        db.session.add(VoiceChannel(**channel))

    db.session.commit()


def undo_voice_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.voice_channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM voice_channels"))

    db.session.commit()
