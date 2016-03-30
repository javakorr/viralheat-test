const Backbone = require('backbone'),
    messageModel = require('./../message/messageModel'),
    _ = require('lodash'),
    moment = require('moment');

const messageCollection = Backbone.Collection.extend({
    model: messageModel,
    url: '/messages',
    initialize: function() {
        this.comparator = function(message) {
            return -message.get('date');
        };
        this.fetch();
    }
});

module.exports = messageCollection;
