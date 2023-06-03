from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ServerUser(db.Model):
    __tablename__ = 'serverUsers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable = False)
    role = db.Column(db.String)
    created_at = db.Column(db.Date, default=datetime.utcnow)

    server = db.relationship("Server", back_populates="serverUsers")
    user = db.relationship("User", back_populates="serverUsers")
