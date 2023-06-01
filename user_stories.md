# User Stories

## Users

### Sign Up

* As an unregistered user, I want to be able to sign up for the website via a sign-up form.
    * When the sign up form opens:
        * I would like to be able to enter my email, username, and preferred password.
        * I would like the website to log me in upon successful completion of the sign-up form to instantly access site functionality.
        * I would like the website to inform me of any validations I failed to pass, and repopulate the form with my valid entries (except my password) so that I can try again without needing to refill forms I entered valid data into

### Log in

* As a registered user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * Upon logging in I would like to be directed to my list of private messages.
    * I would like the website to log me in upon successful completion of the form.
  * When I enter invalid data on the log-up form I would like the website to inform me of the validations I failed to pass.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials


### Log Out

* As a logged in user, I want to log out via an easy to find log out button in the user dropdown or at the bottom of the navigation bar on the left of the page.
  * While on any page of the site:
    * I can  log out of my account and be redirected to the login form.

## Servers

### Create Servers

* As a logged in user, I want to be able to create new servers via an easy to find button on the side navigation bar.
  * When I'm on the form to create a server:
    * I can name my server and upload a picture for the icon.
    * Upon successfully creating a new server I would like to be directed to the server's main channel.


### Viewing Servers

* As a logged in user, I want to be able to view a list of the servers I am a part of on the side navigation bar as well as a button to explore other servers I am not currently apart.
* As a logged in user, I want to be able to view a list of the servers I am a part of on the side navigation bar as well as a button to explore other servers.
  * When I'm on a single server page:
    * I can view a list all of the channels associated with the server.
    * As a logged in user who doesn't own the server I want to be able to see a dropdown next to the server name at the top of the page that opens a menu with an option to invite someone to the server or leave a server

### Updating Servers

* As a logged in user who owns the server, I want to be able to invite users to the server, create channels, create categories.
  * I should be able to access this functionality through a dropdown next to the server name at the top of the page.
* I want to be able to access server settings through the dropdown to assign roles to users on the server.

### Deleting servers

* As a logged in user who is also the owner of the server, I want to be able to delete my server by navigating to the server settings through the server dropdown menu.
    * When I click on the delete server button I want a modal to popup to confirm I want to delete the current server.
    * When I confirm delete I want to be redirected to the direct messages server.

## Channels

### View Channels
* As a logged in user, I want to be able to view a list of the channels I have access to next to the server list off to the left of the application.
* As a logged in user I want to be able to see each category for all the channels
* As a logged in user if I am the owner/admin I also want to see an easy way to add/edit and delete a channel.
    * This should be an add button to create a new channel
    * There should be a settings icon to edit or delete a channel
* When I am on a single channel I should see
    * The name of the channel at the top and a list of all the prior messages in that channel
    * An empty input field to insert messages into

### Create Channels
* As a logged in user who is also owner/admin I should see an add button next to each category of channels.
    * Clicking on this button should open a modal that allows me to choose a channel name, a submit button and whether it is private or
* As a logged in user who is also owner/admin clicking on the server name at the top of the server via the server drop down will show an option to add a channel
    * Clicking on this button should open a modal that allows me to choose a channel name, a submit button and whether it is private or


### Edit Channels
* As a logged in user who is also owner/admin I should be able to see a settings icon next to each channel and clicking on it
    * will open a modal that lets me change the name of the channel or delete it

### Delete Channels
* As a logged in user who is also owner/admin I should be able to see a settings icon next to each channel and clicking on it
    * will open a modal that lets me delete it
    * if I click delete a modal will open and I will have to confirm I want to delete
    * After confirming delete I should be redirected back to the welcome channel


## Live Chat

### View Messages
* As a logged in user who is a part of a server, when I click on a channel in the server I want to see all the messages associated with that channel open to the side of the channel list.
    * I want to be able to see new messages pop up at the bottom of the list real time.
    * I want the messages to include the username of who wrote the message as well as the date a time the message was written.
    * I want to see an icon with the amount of reactions each message has at the bottom left of the message.

### Create a Message
* As a logged in user who is a part of a server, when I am looking at channel messages, I want to have an empty input field at the bottom of the messages that allows me to write a message to the channel.
    * When I add a new message to the channel I want the message to instantly pop up at the bottom of the list for myself as well as other users currently viewing the channel.
    * When I mouseover a message written by another user, I want to see a menu popup at the top right of the message with a reply button that allows me to reply to that specific message as well as a button that allows me to react to the message.

### Edit a Message
* As a logged in user who is part of a server and currently viewing a channel, when I mouseover any message I wrote, I want a menu to pop up at the top right of the message that has an edit button to edit my message.
    * When I click to edit the message, I want a the textarea to turn into an input textarea prepopulated with the current message for me to edit.
        * When I hit enter I want the edited message to be saved and the message to be instantly updated in the message list with a small text indicating the message was edited at end of the message.

### Delete a Message
* When I delete a message I want a pop up to display to confirm if I want to delete the message.
    * The pop up should display the message, the username of the message creator, the time/date stamp of the message, and any reactions the message has recieved.
    * There should be a button to confirm or cancel the delete.
    * Only the creator of the message or a server owner/admin should be able to delete a message.

## Direct Message

### View all Direct Messages
* When I click to view all of my direct messages, I should see a list of all the users I have messaged in the past sorted with the conversation that had a message sent most recently on top.
    * I should see the messages in the conversation at the top of the list when I click on the direct message tab.
    * I should be able to click through a list of users and have the conversations displayed.
### Create a Direct Message
* When viewing a conversation with a user, I should be able to send a message through a text input at the bottom of the window. It should be live chat with the user I'm chatting with seeing my messages after a short delay without refreshing.
### Delete a Direct Message
* I should be able to delete any direct message with another user that I am the creator of.
