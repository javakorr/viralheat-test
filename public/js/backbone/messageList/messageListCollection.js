const Backbone = require('backbone'),
    messageModel = require('./../message/messageModel');

const messageCollection = Backbone.Collection.extend({
    model: messageModel
});

module.exports = messageCollection;
