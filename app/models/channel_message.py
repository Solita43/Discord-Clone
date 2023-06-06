from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    message = db.Column(db.String(255), nullable= False)
    created_at = db.Column(db.Date, default=datetime.utcnow)

    channel = db.relationship("Channel", back_populates="channelMessages")
    user = db.relationship("User", back_populates="channelMessages")
    channelMessageReactions = db.relationship("ChannelMessageReaction",back_populates="message", cascade="delete-orphan, all")
