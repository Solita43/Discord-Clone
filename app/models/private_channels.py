from .db import db, environment, SCHEMA, add_prefix_for_prod


class PrivateChannel(db.Model):
    __tablename__ = 'privateChannels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)

    channel = db.relationship("Channel", back_populates="privateChannels")
    user = db.relationship("User", back_populates="privateChannels")

    