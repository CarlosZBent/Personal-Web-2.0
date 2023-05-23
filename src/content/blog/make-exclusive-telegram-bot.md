---
title: "How to make an exclusive Telegram Bot"
description: "We'll make a Telegram bot that can only be used by the members of our exclusive group."
pubDate: "May 21 2022"
badge: "python | bot"
---
This is a solution I found because I needed to create this functionality for a project, but Telegram bots, unlike Telegram groups, don't have an option to make them private. You can't restrict the bot's use with a link neither, be it referal or auto generated. No, in Telegram, bots are simply there and anyone can start them, therefore, our solution must come __after__ the bot is initiated.

For example, if a user sends the `start` command to the bot, it will automatically check if that user is a member of the specified group. If it is, it will continue with the conversation flow normally, but if it isn't, it will display a rejection message to that user, something like 'You are not authorized to use this bot'.

## Code requirements and common terms

### Requirements

I created this using the [python-telegram-bot](https://github.com/python-telegram-bot/) library (v. 13.11) and Python 3.9.6.

### Terms

__Update:__ An update is received by the bot everytime it is interacted with, it can be through a message, a command, almost anything.

__Request:__ A data request to Telegram servers through it's bot API.

## Implementation

First thing is to add the bot to the group we want to 'watch', so to speak. Adding the bot works like adding any other user.

Once added, we need to get that group's `id` to use it in our code. For that, we send it an _update_ from that group, it can be a random message on the group chat or mentioning the bot through it's username, it depends on the bot's inline settings.

Once we've sent something that the bot can detect, we can check the request to the Telegram API directly in the browser.

We'll use the following URL: `https://api.telegram.org/botTOKEN/getUpdates`, where you must substitute 'TOKEN' with your bot's token, provided by BotFather. Simply paste the URL in the browser and you'll get something like this, but with more data.

```
"message": {
    "chat": {
        "id": -1234567890,
        "title": ...,
        "type": "group",
        ...
    }
    ...
}
```

From that info that we get in JSON format, we must take only the `id` of the `chat` object, which is inside the `message` object. You can see the group's name in the `title`, so you can identify the stuff easier. The `id` will be a large number preceded by a hyphen (`-`).

Now we have the group's `id`. If, when browsing the data from the API request, all that data is missing, and instead we get only a `true` response, best option is to get the bot out of the group and then add it again, then check again the request data after sending an update to the bot.

Let's get to the fun part now.

That `id` we copied from the request data, we will save it on a variable.

```
exclusive_group_id = ”-1234567890”
```

Now, since we want to check if the user is a member from the very beggining of the bot's interaction with the user, we'll add this snippet to the welcoming function. 

But before, let's understand how python-telegram-bot handles users inside a conversation, and inside a group.

With each request the bot receives, we can access the user that sent it, getting the `User` object. We can do this with `update.effective_message.from_user`. Once we have the `User` object, we can see it's data, like the username, or wether it's a bot or a human, but what we currently need is the user's unique id. To get it, it's enough to add `id` at the end of the code we already had. also, obviously, we will store it on a variable. The final code to get the user's id is this:

```
user_id = update.effective_message.from_user.id
```

This `id` will also be a large number, but without a preceding hyphen. Now we can get to the function that checks wether the user is a member of our exclusive group or not.

We'll use the method `getChatMember`. It will take as arguments the `exclusive_group_id` and the `user_id`, and it will return a `ChatMember` object that will contain a status.

The list of status it can return is: `creator`, `administrator`, `member`, `left`, `kicked` o `restricted`. This are equivalent, respectively, to the owner, an administrator, a member, a user that left the group, a user that was kicked out of the group and a blocked user.

So, let's get the status of the user that interacted with our bot:

```
member_user = context.bot.getChatmember(exclusive_group_id, user_id)
print(member_user.status)
```

With that last line, we will see the returned `status` of the user. Now, let's check that the status is one that we want to give permission to. If the user is a group member it's `status` will be 'creator', 'administrator' or 'member'. Therefore, we can use a simple `if` statement to check the equality of the `status` value with any of those. There might be cleaner ways to do this, even inside an `if` statement, but to be faster, let's do it in a way that works just as well, and makes it easier to appreciate the thought process behind it, though it is undoubtedly uglier.

```
exlusive_group_id = ”-1234567890”
user_id = update.effective_message.from_user.id
member_user = context.bot.getChatmember(eclusive_group_id, user_id)
def start(update, context):
	if member_user.status == 'creator' or member_user.status == 'administrator' or member_user.status == 'member':
		update.message.reply_text('Hello!!, welcome.')
	else:
		update.message.reply_text('You're not authorized to use this bot.')
```

And thats all! We now have an exclusive bot for our exclusive group.

A detail to keep in mind: best option is to make the bot a group admin, otherwise it can have problems detecting the status of the groups administrators, in this cases it denies them access to the bot even if they are in the group. 

While debugging it can be useful to see the user status directly in the API request data in the browser. That can be done with the following URL:

```
https://api.telegram.org/botTOKEN/getChatMember?chat_id=CHATID&user_id=USERID/
```

## Conclusions

We will need to work with id's constantly while creating Telegram bots, so it's a good idea to learn how to  handle them. Besides, working with groups is also very useful and it opens a lot of possibilities.

I hope this guide was useful and instructive as well as fun. You can contact me on [Telegram](https://t.me/carloszbent_channel) or [Twitter](https://twitter.com/CarlosZBent), I hope to hear from you!