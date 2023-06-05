from flask.cli import AppGroup

from .users import seed_users, undo_users
from .channel_groups import seed_channel_groups, undo_channel_groups
from .channel_message_reactions import seed_channel_message_reactions, undo_channel_message_reactions
from .channel_messages import seed_channel_messages, undo_channel_messages
from .channels import seed_channels, undo_channels
from .direct_message_conversation_users import seed_direct_message_conversation_users, undo_direct_message_conversation_users
from .direct_message_conversations import direct_message_conversation, undo_direct_message_conversation
from .direct_messages import seed_direct_messages, undo_direct_messages
from .private_channels import seed_private_channel_user, undo_private_channel_user
from .server_users import seed_server_users, undo_server_users
from .servers import seed_servers, undo_servers
from .direct_message_reactions import seed_direct_message_reactions, undo_direct_message_reactions

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_servers()
        undo_server_users()
        undo_channel_groups()
        undo_channels()
        undo_private_channel_user()
        undo_channel_messages()
        undo_channel_message_reactions()
        undo_direct_message_conversation()
        undo_direct_message_conversation_users()
        undo_direct_messages()
        undo_direct_message_reactions()
    seed_users()
    seed_servers()
    seed_server_users()
    seed_channel_groups()
    seed_channels()
    seed_private_channel_user()
    seed_channel_messages()
    seed_channel_message_reactions()
    direct_message_conversation()
    seed_direct_message_conversation_users()
    seed_direct_messages()
    seed_direct_message_reactions()


    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_server_users()
    undo_channel_groups()
    undo_channels()
    undo_private_channel_user()
    undo_channel_messages()
    undo_channel_message_reactions()
    undo_direct_message_conversation()
    undo_direct_message_conversation_users()
    undo_direct_messages()
    undo_direct_message_reactions()
    # Add other undo functions here
