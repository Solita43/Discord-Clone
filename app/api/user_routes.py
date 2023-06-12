from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from ..forms import ProfileImage
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """

    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/', methods=["PUT"])
@login_required
def user_image():

    print("HERE I AM", current_user.to_dict())



    print("USER FROM QUERY" , current_user)
    print("icon ====================> ", current_user.imageUrl)

    form = ProfileImage()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        if "image" in form.data and form.data["image"] != None:
            remove_file_from_s3(current_user.imageUrl)

            image = form.data["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return upload
            else:
                current_user.imageUrl = upload["url"]
        elif form.data["username"] != current_user.username:
            current_user.username = form.data["username"]
        db.session.commit()
        return current_user.to_dict() , 201
    else:
        errors = form.errors
        return errors, 400