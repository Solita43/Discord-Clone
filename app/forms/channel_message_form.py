from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Channel, User

def channel_id_exists(form, field):
    channel_id = field.data
    channel = Channel.query.get(channel_id)
    if not channel:
        raise ValidationError("Channel does not exist")

def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")

class ChannelMessageForm(FlaskForm):
    channel_id = IntegerField("Channel ID", validators=[DataRequired(), channel_id_exists])
    user_id = IntegerField("User ID", validators=[DataRequired(), user_id_exists])
    message = StringField("Message", validators=[DataRequired(), Length(max=255)])
