from .db import db, environment, SCHEMA, add_prefix_for_prod

class ChannelGroup(db.Model):
    __tablename__ = 'channelGroups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    name = db.Column(db.String, nullable=False)

    server = db.relationship('Server', back_populates='groups')
    channels = db.relationship('Channel', back_populates='group', cascade="delete-orphan, all" )
