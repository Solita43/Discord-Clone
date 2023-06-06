from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessageConversation(db.Model):
    __tablename__ = 'direct_message_conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.Date, default=datetime.utcnow)
    updated_at = db.Column(db.Date, default=datetime.utcnow)


    directMessages = db.relationship("DirectMessage",back_populates="conversation", cascade="delete-orphan, all")
    directMessageConversationUsers = db.relationship("DirectMessageConversationUser", back_populates="conversation", cascade="delete-orphan, all")

    def to_dict(self):
        return {
            "conversationId": self.id,
            "createdAt": self.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
            "updatedAt": self.updated_at.strftime("%m/%d/%Y, %H:%M:%S")
        }
