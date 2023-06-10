from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Channel, User, Server, ChannelGroup, VoiceChannel

def server_id_exists(form, field):
    server_id = field.data
    server = Server.query.get(server_id)
    if not server:
        raise ValidationError("Server does not exist")
    
def name_exists_on_server(form, field):
    name = field.data
    voice_channel_name = list(voice_channel.name for voice_channel in VoiceChannel.query.filter(VoiceChannel.server_id == form.server_id.data).all() if voice_channel.name == name)
    if voice_channel_name:
        raise ValidationError("This channel name already exists")



class VoiceChannelForm(FlaskForm):
    server_id = IntegerField("Server ID", validators=[DataRequired(), server_id_exists])
    name = StringField("Voice Channel Name", validators=[DataRequired(), name_exists_on_server, Length(min=5, max=25, message="Name field must be between 5 and 25 characters long")])
