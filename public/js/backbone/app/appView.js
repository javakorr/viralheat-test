const Backbone = require('backbone'),
    Hogan = require('hogan.js'),
    fs = require('fs'),
    appTemplate = fs.readFileSync(__dirname + '/appTemplate.html', 'utf8'),
    MessageListView = require('./../messageList/messageListView'),
    PostMessageFormView = require('./../postMessageForm/postMessageFormView'),
    EditMessageView = require('./../editMessageForm/editMessageFormView');

const app = Backbone.View.extend({
    tagName: 'div',
    className: 'container',
    events: {
        'click .show-post-message': 'showPostMessage',
        'click .show-message-list': 'showMessageList'
    },
    initialize: function() {
        this.options = options || {};
        this.options.messages.on('add', this.showMessageList, this);
        this.options.vent.bind('app:editMessage', this.showEditMessage, this);
        this.options.vent.bind('app:deleteEditedMessage', this.showMessageList, this);
        this.options.vent.bind('app:submitEditedMessage', this.showMessageList, this);
        this.render();
    },
    render: function() {
        const template = Hogan.compile(appTemplate);

        this.el.innerHTML = template.render();

        const messageListView = new MessageListView({ messages: this.options.messages, vent: this.options.vent });

        this.updateDynamicContent(messageListView.$el);
        
        return this;
    },
    showPostMessage: function() {
        const postMessageForm = new PostMessageFormView({ messages: this.options.messages });
        
        this.updateDynamicContent(postMessageForm.$el);
    },
    showMessageList: function() {
        const messageListView = new MessageListView({ messages: this.options.messages, vent: this.options.vent });

        this.updateDynamicContent(messageListView.$el);
    },
    showEditMessage: function(messageModel) {
        const editMessageView = new EditMessageView({ message: messageModel, vent: this.options.vent });

        this.updateDynamicContent(editMessageView.$el);
    },
    updateDynamicContent: function(newContent) {
        this.$el.find('.dynamic-content').empty().html(newContent);
    }
});

module.exports = app;
