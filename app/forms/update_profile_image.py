from flask_wtf import FlaskForm
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired

class ProfileImage(FlaskForm):
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])