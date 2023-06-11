# Discord Clone State Shape

## Session:

- Current User's information

  ```json
  {
    "userId": 1,
    "username": "biggieBoi1",
    "email": "biggieBoi1@gmail.com",
    "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
    "userStatus": "online"
  }
  ```

  ## Users

- Information about all users

```json
{
  "AllUsers": {
    "<userId>": {
      "email": "demo@aa.io",
      "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
      "userId": 1,
      "userStatus": "online",
      "username": "Demo"
    },
    "<userId>": {
      "email": "demo2@aa.io",
      "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
      "userId": 2,
      "userStatus": "online",
      "username": "Demo-lition"
    }
  }
}
```

## UserStatus

- Status for each user

```json
{
  "UserStatus": {
    "<userId>": "online",
    "<userId>": "offline"
  }
}
```

## UserConversations:

- User's list past direct message partners

  ```json
  {
    "<userId>": {
      "userId": 1,
      "userIcon": "something.com",
      "userStatus": "online",
      "conversation_id": 1,
      "userStatus": "online",
      "updatedAt": "mm/dd/yy"
    },
    "<userId>": {
      "userId": 1,
      "conversation_id": 2,
      "userIcon": "somethingelse.com",
      "userStatus": "online",
      "updatedAt": "mm/dd/yy"
    }
  }
  ```

## UserConversationMessages:

- Messages from each conversation partner

```json
{
  "<UserConversationId>": {
    "messages": [
      {
        "text": "heyyyyyy",
        "userId": 1,
        "UserInfo": {
          "email": "demo@aa.io",
          "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
          "userId": 1,
          "userStatus": "online",
          "username": "Demo"
        },
        "updatedAt": "mm/dd/yy",
        "reactions": {
          "<reactionId>": {
            "username": "Demo-graphics",
            "emoji": "🙃"
          }
        },
        "id": 1
      },
      {
        "text": "wyd?",
        "userId": 2,
        "UserInfo": {
          "email": "demo2@aa.io",
          "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
          "userId": 1,
          "userStatus": "online",
          "username": "Demo-lition"
        },
        "updatedAt": "mm/dd/yy",
        "reactions": {
          "<reactionId>": {
            "username": "Demo-lition",
            "emoji": "🙃"
          }
        },
        "id": 2
      }
    ]
  }
}
```

## AllServers:

- All of the servers received from "Get Servers by user ID" route
- Will need to include the icon image URL
  ```json
  {
    "<serverId>": {
      "serverId": 1,
      "default_channel_id": 1,
      "name": "Server 1",
      "imageURL": "http://image.com",
      "owner_id": 1,
      "userCount": 5
    },
    "<serverId>": {
      "serverId": 2,
      "default_channel_id": 7,
      "name": "Server 2",
      "imageURL": "http://image.com",
      "owner_id": 1,
      "userCount": 10
    }
  }
  ```

## ServerDetails:

- Server the current user is looking at. Probably data received from "Get server channels by server ID" route
- Will need all of the channels the server has, users, that kind of thing

  ```json
    "<serverId>"{
        "serverOwnerId": 1,
        "users": {
        "<username>": {
            "username": "server user 1",
            "iconURL": "some.image.com",
            "role": "User",
            "status": "Online"
        },
        "<username>": {
            "username": "server user 2",
            "iconURL": "another.image.com",
            "role": "Admin",
            "status": "Offline"
        }
        },
        "channelIds":{
          "<channelId>":"First channel!!",
          "<channelId>":"Second channel :(",
        },
        "channels": {
            "<channelCategory>": {
                "<channelName>": {
                    "id": 1,
                    "created_at":"MM/DD/YY",
                    "group_id":1,
                    "group_name":"BEST GROUP",
                    "name": "Channel 1",
                    "category": "category 1",
                    "isPrivate": "True"
                },
                "<channelName>": {
                    "id": 2,
                    "created_at":"MM/DD/YY",
                    "group_id":1,
                    "group_name":"BEST GROUP",
                    "name": "Channel 2",
                    "category": "category 1",
                    "isPrivate": "True"
                }
            },
                "<channelCategory>" {
                    "<channelName>": {
                    "id": 3,
                    "created_at":"MM/DD/YY",
                    "group_id":2,
                    "group_name":"BESTEST GROUP",
                    "name": "Channel 3",
                    "category": "category 2",
                    "isPrivate": "False"
                }
            }
        }
    }
  ```

## ServerList

- Get all servers and related information

```json
{
  "ServerList": {
    "<serverId>": {
      "default_channel_id": 1,
      "id": 1,
      "imageUrl": "https://discordia-aa.s3.us-west-1.amazonaws.com/shubham-dhage-t0Bv0OBQuTg-unsplash",
      "name": "First server!!",
      "owner_id": 1,
      "userCount": 10
    },
    "<serverId>": {
      "default_channel_id": 10,
      "id": 2,
      "imageUrl": "https://discordia-aa.s3.us-west-1.amazonaws.com/shubham-dhage-t0Bv0OBQuTg-unsplash",
      "name": "Second server :(",
      "owner_id": 1,
      "userCount": 8
    }
  }
}
```

## Channels

- Messages from a specific channel by channel ID

```json
{
  "<channelId>": [
    {
      "UserInfo": {
        "email": "demo@aa.io",
        "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
        "userId": 1,
        "userStatus": "online",
        "username": "Demo"
      },
      "channelId": 1,
      "messageId": 1,
      "username": "Demo-lition",
      "message": "Hey what's up?",
      "updatedAt": "MM/DD/YY",
      "reactions": {
        "<reactionId>": {
          "username": "Demo-lition",
          "emoji": "🙃"
        }
      }
    },
    {
      "UserInfo": {
        "email": "demo@aa.io",
        "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
        "userId": 1,
        "userStatus": "online",
        "username": "Demo"
      },
      "messageId": 2,
      "username": "Demo-graphics",
      "message": "Not much? You? ",
      "updatedAt": "MM/DD/YY",
      "reactions": {
        "<reactionId>": {
          "username": "Demo-graphics",
          "emoji": "🙃"
        }
      }
    }
  ],
  "<channelId>": [
    {
      "UserInfo": {
        "email": "demo@aa.io",
        "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
        "userId": 1,
        "userStatus": "online",
        "username": "Demo"
      },
      "messageId": 1,
      "username": "Demo-lition",
      "message": "Hey what's up?",
      "updatedAt": "MM/DD/YY",
      "reactions": {
        "<reactionId>": {
          "username": "Demo-lition",
          "emoji": "🙃"
        }
      }
    },
    {
      "UserInfo": {
        "email": "demo@aa.io",
        "userIcon": "https://discordia-aa.s3.us-west-1.amazonaws.com/profile-default.jpg",
        "userId": 1,
        "userStatus": "online",
        "username": "Demo"
      },
      "messageId": 2,
      "username": "demo-graphics",
      "message": "Not much? You? ",
      "updatedAt": "MM/DD/YY",
      "reactions": {
        "<reactionId>": {
          "username": "Demo-graphics",
          "emoji": "🙃"
        }
      }
    }
  ]
}
```
