from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import DirectMessageConversation, User

def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")
def conversation_id_exists(form,field):
    conversation_id = field.data
    conversation = DirectMessageConversation.query.get(conversation_id)
    if not conversation:
        raise ValidationError("Conversation does not exist")

class DirectMessageForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired()])
    conversation_id = IntegerField("Conversation ID", validators=[DataRequired(),conversation_id_exists])
    user_id = IntegerField("User ID", validators=[DataRequired(),user_id_exists])
