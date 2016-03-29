const Backbone = require('backbone'),
    Hogan = require('hogan'),
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
    initialize: function(options = {}) {
        this.options = options;
        this.options['messages'].on('add', this.showMessageList, this);
        this.render();
    },
    render: function() {
        const template = Hogan.compile(appTemplate),
            output = template.render();

        const messageListView = new MessageListView({ messages: this.options.messages });
        
        this.el.innerHTML = output;

        this.updateDynamicContent(messageListView.$el);
        
        return this;
    },
    showPostMessage: function() {
        const postMessageForm = new PostMessageFormView({ messages: this.options.messages });
        
        this.updateDynamicContent(postMessageForm.$el);
    },
    showMessageList: function() {
        const messageListView = new MessageListView({ messages: this.options.messages });

        this.updateDynamicContent(messageListView.$el);
    },
    showEditMessage: function() {
        const editMessageView = new EditMessageView({ model: messageModel });

        this.updateDynamicContent(editMessageView.$el);
    },
    updateDynamicContent: function(newContent) {
        this.$el.find('.dynamic-content').empty().html(newContent);
    }
});

module.exports = app;
