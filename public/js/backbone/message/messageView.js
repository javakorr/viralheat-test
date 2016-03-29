const Backbone = require('backbone'),
    Hogan = require('hogan'),
    appView = require('./../app/appView'),
    fs = require('fs'),
    messageTemplate = fs.readFileSync(__dirname + '/messageTemplate.html', 'utf8');

const messageView = Backbone.View.extend({
    tagName: 'div',
    className: 'message gray-layout row',
    events: {
        'click .delete-message': 'deleteMessage',
        'click .edit-message': 'editMessage'
    },
    initialize: function() {
        this.model.on('destroy', this.removeMessageView, this);
        this.render();
    },
    render: function() {
        const template = Hogan.compile(messageTemplate);

        this.el.innerHTML = template.render(this.model.toJSON());
        
        return this;
    },
    editMessage: function() {
        console.log(this);
    },
    deleteMessage: function() {
        this.model.destroy();
    },
    removeMessageView: function() {
        this.el.parentNode.removeChild(this.el);
    }
});

module.exports = messageView;
