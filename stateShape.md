
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

## AllServers: 
* All of the servers received from "Get Servers by user ID" route
* Will need to include the icon image URL
    ```json
    {[
        {
            "serverId": 1,
            "name": "Server 1", 
            "iconURL": "http://image.com", 
            "serverOwnerId": 1
        }, 
        {
            "serverId": 2,
            "name": "Server 2", 
            "iconURL": "http://image.com", 
            "serverOwnerId": 1
        }
    ]}
    ```

## SpecificServer: 
* Server the current user is looking at. Probably data received from "Get server channels by server ID" route
* Will need all of the channels the server has, users, that kind of thing
    ### Channels
    * All channels of the server including historical chat data

    ```json
    {[
        {
            "channelId": 1, 
            "name": "Channel 1", 
            "messages": [
                {
                    "messageId": 1,
                    "messageText": "Hey what's up?", 
                    "dateTimeStamp": "1-1-2023 z 01:12:00"
                }, 
                {
                    "messageId": 2,
                    "messageText": "Not much? You? ", 
                    "dateTimeStamp": "1-2-2023 z 01:12:00"
                }
            ], 
            "categoryList": [
                "category 1", "category 2"
            ]
        }, 
        {
            "channelId": 2, 
            "name": "Channel 2", 
            "messages": [
                {
                    "messageId": 1,
                    "messageText": "Hey what's up?", 
                    "dateTimeStamp": "1-1-2023 z 01:12:00"
                }, 
                {
                    "messageId": 2,
                    "messageText": "Not much? You? ", 
                    "dateTimeStamp": "1-2-2023 z 01:12:00"
                }
            ]
        }
        
    ]}
    ```


