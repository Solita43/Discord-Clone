from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError, Length
from app.models import User
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed
from app.models import Server


def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")
    
def server_name_exist(form, field): 
    name = field.data
    serverId = form.id.data
    server = Server.query.filter(Server.name == name).first()
    if server and serverId != server.id: 
        raise ValidationError("Server name already exists")


class ServerForm(FlaskForm):
    name = StringField("Server name", validators=[DataRequired(), Length(min=5, max=25, message="Server Name must be between 5 and 25 characters"), server_name_exist])
    # imageURL = URLField("imageURL", validators=[DataRequired()])
    imageURL = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    owner_id = IntegerField("Owner", validators=[DataRequired(), user_id_exists])
    id = IntegerField("serverId")