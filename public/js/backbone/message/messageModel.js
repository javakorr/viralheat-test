const Backbone = require('backbone');

const messageModel = Backbone.Model.extend({
    urlRoot: '/messages',
    defaults: {
        id: null,
        title: null,
        name: null,
        message: null,
        date: null
    }
});

module.exports = messageModel;
