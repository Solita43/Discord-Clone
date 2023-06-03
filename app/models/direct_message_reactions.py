from .db import db, environment, SCHEMA, add_prefix_for_prod

class DirectMessageReactions(db.Model):
    __tablename__ = 'directMessageReactions'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("directMessages.id")), nullable=False)
    reaction = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    direct_message = db.relationship("DirectMessage", back_populates="direct_reactions")
    user = db.relationship("User", back_populates="directMessageReactions")
