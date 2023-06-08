from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Channel, User, Server, ChannelGroup

def server_id_exists(form, field):
    server_id = field.data
    server = Server.query.get(server_id)
    if not server:
        raise ValidationError("Server does not exist")

def group_id_exists(form, field):
    channel_group_id = field.data
    channel_group = ChannelGroup.query.get(channel_group_id)
    if not channel_group:
        raise ValidationError("Group does not exist")
    

def name_exists_on_server(form, field):
    name = field.data
    channel_name = list(channel.name for channel in Channel.query.filter(Channel.server_id == form.server_id.data).all() if channel.name == name)
    if channel_name:
        raise ValidationError("This channel name already exists")
    



class ChannelForm(FlaskForm):
    server_id = IntegerField("Server ID", validators=[DataRequired(), server_id_exists])
    group_id = IntegerField("Group ID", validators=[DataRequired(), group_id_exists])
    name = StringField("Channel Name", validators=[DataRequired(), Length(min=5, max=25, message="Name field must be between 5 and 25 characters long"), name_exists_on_server])
    isPrivate = BooleanField("Channel Privacy")
