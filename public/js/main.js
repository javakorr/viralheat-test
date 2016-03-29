const Backbone = require('backbone'),
    AppView = require('./backbone/app/appView'),
    MessageListCollection = require('./backbone/messageList/messageListCollection'),
    _ = require('lodash');

const vent = _.extend({}, Backbone.Events),
    messageListCollection = new MessageListCollection();

messageListCollection.fetch();

const appView = new AppView({ messages: messageListCollection, vent: vent });

document.querySelector('.app').appendChild(appView.el);
