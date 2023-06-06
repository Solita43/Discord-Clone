from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    status = db.Column(db.String)
    hashed_password = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), default="https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'userId': self.id,
            'username': self.username,
            'email': self.email,
            "userIcon": self.imageUrl,
            "userStatus": self.status
        }

    privateChannels = db.relationship("PrivateChannel",back_populates="user")
    channelMessageReactions = db.relationship("ChannelMessageReaction", back_populates="user")
    channelMessages = db.relationship("ChannelMessage", back_populates="user")
    directMessages = db.relationship("DirectMessage", back_populates="user")
    directMessageConversationUsers = db.relationship("DirectMessageConversationUser", back_populates="user")
    directMessageReactions = db.relationship("DirectMessageReaction", back_populates="user")
    servers = db.relationship("Server", back_populates="owner")
    serverUsers = db.relationship("ServerUser", back_populates="user")