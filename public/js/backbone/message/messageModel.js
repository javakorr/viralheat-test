const Backbone = require('backbone');

const messageModel = Backbone.Model.extend({
    url: '/messages',
    defaults: {
        id: null,
        title: null,
        name: null,
        message: null,
        date: null
    }
});

module.exports = messageModel;
