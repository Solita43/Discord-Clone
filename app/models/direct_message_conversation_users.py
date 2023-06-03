from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class DirectMessageConversationUser(db.Model):
    __tablename__ = 'directMessageConversationUsers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date, default=datetime.utcnow)
    conversation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('directMessageConversations.id')), nullable=False)

    conversation = db.relationship("DirectMessageConversation", back_populates="directMessageConversationUsers")
    user = db.relationship("User", back_populates="directMessageConversationUsers")
