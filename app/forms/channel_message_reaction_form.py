from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import ChannelMessage, User

def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")

def channel_message_exists(form,field):
    message_id = field.data
    message = ChannelMessage.query.get(message_id)
    if not message:
        raise ValidationError("Message does not exist")

    class ChannelMessageReactionForm(FlaskForm):
        message_id = IntegerField("Message ID", validators=[DataRequired(),channel_message_exists])
        reaction = StringField("Reaction",validators=[DataRequired()])
        user_id = IntegerField("User ID", validators=[DataRequired(),user_id_exists])
