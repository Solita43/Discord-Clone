from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessage(db.Model):
    __tablename__ = 'directMessages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('directMessageConversations.id')), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date, default=datetime.utcnow)

    conversation = db.relationship("DirectMessageConversation", back_populates="directMessages")
    user = db.relationship("User", back_populates="directMessages")
    direct_reactions = db.relationship('directMessageRecations', back_populates="direct_message", cascade="delete-orphan, all")
