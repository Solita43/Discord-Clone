from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import DirectMessageConversationUser, db, DirectMessageReaction, DirectMessage, User
from app.forms import DirectMessageForm

conversation_routes = Blueprint("conversations", __name__)


# get all conversations by user id
@conversation_routes.route('/')
@login_required
def get_all_conversations():
    print("CURRENT USER", current_user.id)
    conversations = DirectMessageConversationUser.query.with_entities(DirectMessageConversationUser.conversation_id).filter(current_user.id == DirectMessageConversationUser.user_id).all()
    conversation_ids = [row.conversation_id for row in conversations]
    otherUsers = DirectMessageConversationUser.query.with_entities(DirectMessage.user_id).filter(DirectMessageConversationUser.conversation_id.in_(conversation_ids)).all()
    otherUser_ids = [row.user_id for row in otherUsers if row.user_id != current_user.id]

    users = set(User.query.filter(User.id.in_(otherUser_ids)).all())

    userInfo = {}
    for user in users:
        print("GOT HERE", user.id)
        user = user.to_dict()
        print("USER!",user)
        # print("USER Info: ", user.to_dict())
        # this doesnt work
        userInfo[user['userId']] = {"userId": user['userId'], "userIcon": user['userIcon'], "userStatus": user['userStatus']}


    print("USER INFOS=======", userInfo)
    return(userInfo)



# get all messages in a specific user conversation
@conversation_routes.route('/<int:id>/')
@login_required
def get_all_conversation_messages(id):
    print("ID:", id)
    """Get all the conversation messages by the id of the conversation"""
    # get all messages inside the conversation by conversation id
    messages = DirectMessage.query.filter(DirectMessage.conversation_id == id ).all()

    # figure out what messages this user has access to
    convo_ids = get_all_conversations()

    if id not in convo_ids:
        return("Unauthorized Messages")

    dms = {id:{"messages": []}}
    for message in messages:
        message_dict = message.to_dict()

        final_reaction = {}
        reactions = message_dict['reactions']
        for reaction in reactions:
            final_reaction[reaction['id']] = {
                "username": reaction['username'],
                "emoji": reaction['reaction']}
        dms[id]["messages"].append({
            "text": message_dict['message'],
            "userId": message_dict['userId'],
            "reactions": final_reaction
            })

    return(dms)

#post a user conversation message via conversation id
@conversation_routes.route('/<int:id>')
@login_required
def create_direct_message():
    form = DirectMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        new_message = DirectMessage(

        )


#post/create a new user conversation

# delete a user conversation message

# delete a user conversation

# react to a user conversation
