from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelMessageReaction(db.Model):
    __tablename__ = 'channel_message_reactions'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channel_messages.id")), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    reaction = db.Column(db.String, nullable= False)


    message = db.relationship("ChannelMessage", back_populates="channelMessageReactions")
    user = db.relationship("User", back_populates="channelMessageReactions")
