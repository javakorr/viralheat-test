const Backbone = require('backbone'),
    Hogan = require('hogan'),
    fs = require('fs'),
    appTemplate = fs.readFileSync(__dirname + '/appTemplate.html', 'utf8'),
    MessageListCollection = require('./../messageList/messageListCollection'),
    MessageListView = require('./../messageList/messageListView');

const app = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
        this.render();
    },
    render: function() {
        const template = Hogan.compile(appTemplate),
            output = template.render();

        const messageListCollection = new MessageListCollection({ title: 'aaa' }),
            messageListView = new MessageListView({ messages: messageListCollection });
        
        this.$el.html(output);
        this.el.appendChild(messageListView.el);
        
        return this;
    }
});

module.exports = app;
