const Backbone = require('backbone'),
    MessageView = require('./../message/messageView');

const messageListView = Backbone.View.extend({
    tagName: 'div',
    className: 'message-list col-sm-12',
    initialize: function() {
        this.options = options || {};
        this.render();
    },
    render: function() {
        this.options.messages.each(function(messageModel) {
            let newMessageView = new MessageView({ model: messageModel, vent: this.options.vent });

            this.el.appendChild(newMessageView.el);
        }, this);

        return this;
    }
});

module.exports = messageListView;
