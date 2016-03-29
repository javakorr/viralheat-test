const Backbone = require('backbone'),
    Hogan = require('hogan'),
    moment = require('moment'),
    appView = require('./../app/appView'),
    fs = require('fs'),
    messageTemplate = fs.readFileSync(__dirname + '/messageTemplate.html', 'utf8');

const messageView = Backbone.View.extend({
    tagName: 'div',
    className: 'message gray-layout row',
    events: {
        'click .delete-message': 'deleteMessage',
        'click .edit-message': 'editMessage',
        'click .message-details': 'showFullMessageDetails'
    },
    initialize: function(options = {}) {
        this.options = options;
        this.model.on('destroy', this.removeMessageView, this);
        this.render();
    },
    render: function() {
        const template = Hogan.compile(messageTemplate);

        const formatedMessageDate = moment.unix(this.model.get('date')).format('MMMM, D YYYY @ h:mm a');
        this.model.set('date', formatedMessageDate);

        this.el.innerHTML = template.render(this.model.toJSON());
        
        return this;
    },
    editMessage: function() {
        this.options.vent.trigger('app:editMessage', this.model);
    },
    deleteMessage: function() {
        this.model.destroy();
    },
    removeMessageView: function() {
        this.el.parentNode.removeChild(this.el);
    },
    showFullMessageDetails: function() {
        this.$el.find('.delete-message-wrap').addClass('hidden');
        this.$el.siblings().addClass('hidden');
        this.$el.find('.message-full-details').removeClass('hidden');
    }
});

module.exports = messageView;
