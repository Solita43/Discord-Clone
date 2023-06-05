from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import DirectMessageConversationUser, db, DirectMessageReaction, DirectMessage, User, DirectMessageConversation
from app.forms import DirectMessageForm

conversation_routes = Blueprint("conversations", __name__)


# get all conversations by user id
@conversation_routes.route('')
@login_required
def get_all_conversations():
    conversations = DirectMessageConversationUser.query.with_entities(DirectMessageConversationUser.conversation_id).filter(current_user.id == DirectMessageConversationUser.user_id).all()
    conversation_ids = [row.conversation_id for row in conversations]
    userInfo = {}
    for conversation in conversation_ids:
        otherUsers = DirectMessageConversationUser.query.with_entities(DirectMessageConversationUser.user_id).filter(DirectMessageConversationUser.conversation_id == conversation).all()
        otherUser_id = [row.user_id for row in otherUsers if row.user_id != current_user.id]

        user = User.query.get(otherUser_id)
        user = user.to_dict()
        userInfo[user['userId']] = {"userId": user['userId'], "userIcon": user['userIcon'], "userStatus": user['userStatus'], "username": user['username'],"conversation_id": conversation}

    # for user in users:
        # print("USER Info: ", user.to_dict())
        # this doesnt work


    return(userInfo)



# get all messages in a specific user conversation
@conversation_routes.route('/<int:id>')
@login_required
def get_all_conversation_messages(id):
    print("ID:", id)
    """Get all the conversation messages by the id of the conversation"""
    # get all messages inside the conversation by conversation id
    messages = DirectMessage.query.filter(DirectMessage.conversation_id == id ).all()

    # figure out what messages this user has access to
    # convo_ids = get_all_conversations()

    # if id not in convo_ids:
    #     return("Unauthorized Messages")

    dms = {id:{"messages": []}}
    for message in messages:
        message_dict = message.to_dict()

        final_reaction = {}
        reactions = message_dict['reactions']

        for id2, reaction in reactions.items():
            final_reaction[id2] = {
                "username": reaction['username'],
                "emoji": reaction['reaction']}

        dms[id]["messages"].append({
            "message": message_dict['message'],
            "userId": message_dict['userId'],
            "id": message_dict['id'],
            "createdAt": message_dict['createdAt'],
            "UserInfo": message_dict['UserInfo'],
            "reactions": final_reaction
            })

    return(dms)

#post a user conversation message via conversation id
@conversation_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_direct_message(id):
    """
    Create a new user conversation
  - URL: /api/directMessages/:conversationId
  - Body:
    ```json
    {
      "text": "heyyyyyy",
      "userId": 1
    }
    ```
- Successful Response
    ```json
    {
      "id": 3,
      "text": "heyyyyyy",
      "userId": 1,
      "createdAt": "mm/dd/yy",
      "reactions": {}
    }
    ```
    """

    data = request.get_json()
    new_message = data['text']

    # add user data to form for validation

    form = DirectMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.message.data = new_message
    form.user_id.data = current_user.id
    form.conversation_id.data = id

    if form.validate():
        new_message_entire = DirectMessage(
            message= new_message,
            conversation_id = id,
            user_id = current_user.id
        )
        db.session.add(new_message_entire)
        db.session.commit()
        message = DirectMessage.query.filter_by(conversation_id = id).order_by(DirectMessage.id.desc()).first()
        # res = {message.to_dict() for message in messages}
        return (message.to_dict())

    elif form.errors:
        return {
            "message": form.errors
        }



#post/create a new user conversation
@conversation_routes.route('/', methods=['POST'])
@login_required
def create_direct_conversation():
    """ create a new conversation with someone
    ```json
    {
      "username": "demo@aa.io"
    }
    Response:
     - Body:

    ```json
    {
      "conversationId": 1,
      "createdAt": "mm/dd/yy",
      "updatedAt": "mm/dd/yy",
      "user_friend": {
        "userId": 2,
        "userIcon": "default.jpg",
        "userStatus": "online"
      }
    }
    ```
    """
    # get the info from the user
    data = request.get_json()
    new_user_for_convo = data['username']

    # check that this person exists if they do continue
    friend_person = User.query.filter(User.username == new_user_for_convo).first()

    if friend_person == None:
        return("Person doesn't exist")

    # you can't message yourself so check that

    friend_person_dict = friend_person.to_dict()

    if friend_person_dict['userId'] == current_user.id:
        return( "You can't message yourself")

    # check if there is already a conversation with that user
    # first get all the conversations the current user is a part of

    conversations_of_current_user = DirectMessageConversationUser.query.filter( DirectMessageConversationUser.user_id == current_user.id).all()
    convo_ids_for_current_user = []
    for convo in conversations_of_current_user:
        print("OH HAI DUR: ", convo.to_dict())
        convo = convo.to_dict()
        convo_ids_for_current_user.append(convo['conversationId'])

    # find conversations of the intended new person
    convos_new_person = DirectMessageConversationUser.query.filter(DirectMessageConversationUser.user_id == friend_person_dict['userId']).all()
    convo_ids_friend = []
    for convo in convos_new_person:
        convo = convo.to_dict()
        convo_ids_friend.append(convo['conversationId'])

    # check if the conversation ids match at all indicating they already have an active chat
    for id in convo_ids_for_current_user:
        if id in convo_ids_friend:
            return("You already have a conversation with this user")

    # format the user
    user_friend = {
        "userId": friend_person_dict['userId'],
        "userIcon": friend_person_dict['userIcon'],
        "userStatus": friend_person_dict['userStatus']
    }

    # create new conversation
    brand_new_convo = DirectMessageConversation(
    )
    db.session.add(brand_new_convo)

    # get the new conversation_id
    new_id = DirectMessageConversation.query.order_by(DirectMessageConversation.id.desc()).first()
    new_id = new_id.to_dict()
    # create new conversation users

    convo_user_1 = DirectMessageConversationUser(
        user_id = current_user.id,
        conversation_id = new_id['conversationId']
    )
    db.session.add(convo_user_1)

    convo_user_2 = DirectMessageConversationUser(
        user_id = friend_person_dict['userId'],
        conversation_id = new_id['conversationId']
    )
    db.session.add(convo_user_2)
    db.session.commit()

    # include user info into the conversation info to return correct data
    new_id[friend_person_dict['username']] = user_friend
    print("NEW ID WOOOOT: ", new_id)

    # send back the new conversation info plus info on the user you are talking with
    return new_id

# delete a user conversation message


# delete a user conversation
@conversation_routes.route('/<int:id>', methods=['DELETE'])
def delete_direct_conversation(id):
    """ Delete conversation  by its id"""
    # find the conversation by id
    conversation = DirectMessageConversation.query.get(id)
    db.session.delete(conversation)
    db.session.commit()
    return {
        "message": "Conversation successfully deleted"
    }


# react to a user conversation
