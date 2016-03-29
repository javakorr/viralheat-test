const Backbone = require('backbone'),
    Hogan = require('hogan'),
    fs = require('fs'),
    appTemplate = fs.readFileSync(__dirname + '/appTemplate.html', 'utf8'),
    MessageListCollection = require('./../messageList/messageListCollection'),
    MessageListView = require('./../messageList/messageListView'),
    PostMessageFormView = require('./../postMessageForm/postMessageFormView');

const app = Backbone.View.extend({
    tagName: 'div',
    className: 'container',
    events: {
        'click .show-post-message': 'showPostMessage'
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        const template = Hogan.compile(appTemplate),
            output = template.render();

        const messageListCollection = new MessageListCollection({ title: 'aaa' }),
            messageListView = new MessageListView({ messages: messageListCollection });
        
        this.el.innerHTML = output;

        this.updateDynamicContent(messageListView.$el);
        
        return this;
    },
    showPostMessage: function() {
        const postMessageForm = new PostMessageFormView();
        
        this.updateDynamicContent(postMessageForm.$el);
    },
    updateDynamicContent: function(newContent) {
        this.$el.find('.dynamic-content').empty().html(newContent);
    }
});

module.exports = app;
