from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, ServerUser

def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")

def user_already_exists(form,field):
    user_id = field.data
    user = ServerUser.query.filter(ServerUser.server_id == form.server_id.data, ServerUser.user_id == user_id).first()
    if user:
        raise ValidationError("This user already exists on this server")


class ServerUserForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired(), user_id_exists, user_already_exists])
    server_id = IntegerField("Server ID", validators=[DataRequired()])
    role = StringField("Role", validators=[DataRequired()])
