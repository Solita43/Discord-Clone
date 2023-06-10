from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class VoiceChannel(db.Model):
    __tablename__ = 'voice_channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False)
    name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    server = db.relationship("Server", back_populates="voice_channels")


    def to_dict(self): 
        return {
            "id": self.id, 
            "name": self.name, 
            "serverId": self.server_id, 
            "createdAt": self.created_at
        }