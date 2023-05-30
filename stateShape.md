
# Discord Clone State Shape

## Session:
* Current User's information

    ```json
        {
            "userId": 1,
            "userName": "biggieBoi1",
            "emailAddress": "biggieBoi1@gmail.com"
        }
    ```

## UserConversationPartners:
* User's list past direct message partners
    ```json
    {
            "user1":{
                "userId":1,
                "userIcon": "something.com",
                "userStatus": "online",
                "createdAt": "mm/dd/yy",
                "updatedAt": "mm/dd/yy"

            },
            "user2":{
                "userId":1,
                "userIcon": "somethingelse.com",
                "userStatus":"online",
                "createdAt": "mm/dd/yy",
                "updatedAt": "mm/dd/yy"
            }

    }
    ```

## UserConversations:
* Messages from each conversation partner
```json
{
    "<UserConversationId>": {
        "messages":[
            {
                "text": "heyyyyyy",
                "userId": 1,
                "createdAt": "mm/dd/yy",
                "reactions":{
                    "<reactionId>":{
                        "username":"Demo-graphics",
                        "emoji":"🙃"
                    }
                }
            },
            {
                "text": "wyd?",
                "userId": 2,
                "createdAt": "mm/dd/yy",
                "reactions":{
                    "<reactionId>":{
                        "username":"Demo-lition",
                        "emoji":"🙃"
                    }
                }
            }
        ]
    }
}
```

## AllServers:
* All of the servers received from "Get Servers by user ID" route
* Will need to include the icon image URL
    ```json
    {[
        {
            "serverId": 1,
            "name": "Server 1",
            "iconURL": "http://image.com"
        },
        {
            "serverId": 2,
            "name": "Server 2",
            "iconURL": "http://image.com"
        }
    ]}
    ```

## SpecificServer:
* Server the current user is looking at. Probably data received from "Get server channels by server ID" route
* Will need all of the channels the server has, users, that kind of thing

    ```json
    {
        "serverOwnerId": 1,
        "users":{
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
        "categoryList": [
            "category 1", "category 2"
        ],
        "channels": [
            {
                "channelId": 1,
                "name": "Channel 1",
                "category": "category 1",
                "private": "True"
            },
            {
                "channelId": 2,
                "name": "Channel 2",
                "category": "category 2",
                "private":"False"
            }

        ]
    }
    ```
## Channels
* Messages from a specific channel by channel ID

```json
    {
        "<channelId>": {
            "messages": [
            {
                "messageId": 1,
                "username": "Demo-lition",
                "messageText": "Hey what's up?",
                "dateTimeStamp": "1-1-2023 z 01:12:00",
                "reactions":{
                    "<reactionId>":{
                        "username":"Demo-lition",
                        "emoji":"🙃"
                    }
                }
            },
            {
                "messageId": 2,
                "username":"Demo-graphics",
                "messageText": "Not much? You? ",
                "dateTimeStamp": "1-2-2023 z 01:12:00",
                "reactions":{
                    "<reactionId>":{
                        "username":"Demo-graphics",
                        "emoji":"🙃"
                    }
                }
            }
        ]
        },
        "<channelId>": {
            "messages": [
            {
                "messageId": 1,
                "username": "Demo-lition",
                "messageText": "Hey what's up?",
                "dateTimeStamp": "1-1-2023 z 01:12:00",
                "reactions":{
                    "<reactionId>":{
                        "username":"Demo-lition",
                        "emoji":"🙃"
                    }
                }
            },
            {
                "messageId": 2,
                "username": "demo-graphics",
                "messageText": "Not much? You? ",
                "dateTimeStamp": "1-2-2023 z 01:12:00",
                "reactions":{
                    "<reactionId>":{
                        "username":"Demo-graphics",
                        "emoji":"🙃"
                    }
                }
            }
        ]
    }
}
```
