from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, URLField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from app.routes.aws_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired


def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")


class ServerForm(FlaskForm):
    name = StringField("Server name", validators=[DataRequired()])
    # imageURL = URLField("imageURL", validators=[DataRequired()])
    imageURL = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    owner_id = IntegerField("Owner", validators=[DataRequired(), user_id_exists])
