const Backbone = require('backbone');

const messageModel = Backbone.Model.extend({
    defaults: {
        id: null,
        title: null,
        name: null,
        message: null,
        date: null
    }
});

module.exports = messageModel;
