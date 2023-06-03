from ..models import Server, ServerUser

def get_user_role(user_id, server_id): 
    """
        returns the role of a user based on the user ID and server ID
    """
    role = ServerUser.query.filter(ServerUser.server_id == server_id, ServerUser.user_id == user_id).first()
    return role.to_dict()["role"]