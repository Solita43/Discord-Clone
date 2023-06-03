from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Channel(db.Model):
    __tablename__ = 'channels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable = False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channelGroups.id")), nullable = False)
    name = db.Column(db.String, nullable= False)
    created_at = db.Column(db.Date, default=datetime.utcnow)
    isPrivate = db.Column(db.Boolean, default=False)

    server = db.relationship("Server", back_populates="channels")
    group = db.relationship("ChannelGroup", back_populates="channels")
    privateChannels = db.relationship("PrivateChannel", back_populates="channel", cascade="delete-orphan, all")
    channelMessages = db.relationship("ChannelMessage", back_populates="channel", cascade="delete-orphan, all")
