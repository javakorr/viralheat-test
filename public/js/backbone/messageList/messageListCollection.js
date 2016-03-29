const Backbone = require('backbone'),
    messageModel = require('./../message/messageModel');

const messageCollection = Backbone.Collection.extend({
    model: messageModel,
    url: '/messages'
});

module.exports = messageCollection;
