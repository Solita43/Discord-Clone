from .db import db, environment, SCHEMA, add_prefix_for_prod

class Server(db.Model):
    __tablename__ = 'servers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique=True)
    imageUrl = db.Column(db.String, default="https://discordia-aa.s3.us-west-1.amazonaws.com/shubham-dhage-t0Bv0OBQuTg-unsplash.jpg")
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    owner = db.relationship("User", back_populates="server")
    groups = db.relationship('ChannelGroup', back_populates='server')
    channels = db.relationship("Channel", back_populates='server')
    serverUsers = db.relationship('ServerUser', back_populates='server', cascade="delete-orphan, all")
    