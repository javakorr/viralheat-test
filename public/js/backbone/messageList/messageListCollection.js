const Backbone = require('backbone'),
    messageModel = require('./../message/messageModel');

const messageCollection = Backbone.Collection.extend({
    model: messageModel,
    url: '/messages',
    initialize: function() {
        this.fetch();
    }
});

module.exports = messageCollection;
