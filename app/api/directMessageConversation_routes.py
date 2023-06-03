from flask import Blueprint, request 
from flask_login import current_user, login_required 
from app.models import DirectMessageConversationUser, db, DirectMessageReaction, DirectMessage, User


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
        userInfo[user['userId']] = {"userId": user['userId']}
    

    print("USER INFOS=======", userInfo)



# get all user conversation messages 
@conversation_routes.route('/:conversationId/')
@login_required
def get_all_conversation_messages(id):
    # get all messages inside the conversation by conversation id 
    messages = DirectMessage.query.get(id)
    # return UserConversationId: {"messages": []}
    print("MESSAGES:", messages)
    
    