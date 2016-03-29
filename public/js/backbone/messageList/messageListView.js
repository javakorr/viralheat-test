const Backbone = require('backbone'),
    MessageView = require('./../message/messageView');

const messageListView = Backbone.View.extend({
    tagName: 'div',
    className: 'message-list',
    events: {},
    initialize: function(options = {}) {
        this.options = options;
        this.render();
    },
    render: function() {
        this.options['messages'].each(function(messageModel) {
            let newMessageView = new MessageView({ model: messageModel });

            this.el.appendChild(newMessageView.el);
        }, this);

        return this;
    }
});

module.exports = messageListView;
